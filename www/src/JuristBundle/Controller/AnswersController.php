<?php

namespace JuristBundle\Controller;

use JuristBundle\Entity\Rubrics;
use JuristBundle\Entity\SectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use JuristBundle\Controller\ApiController;
use Mustache_Engine;
use AppBundle\Services\Configer;
use JuristBundle\Entity\Questions;
use JuristBundle\Entity\Tags;

class AnswersController extends ApiController
{
    public function formedDataAction($id)
    {

        $this->HeaderAction(self::TABS_MAIN);

        $nameRedisNow = "PravoQuestionAnswers({$id})";
        $redis = $this->redis->get($nameRedisNow);
        $redis = unserialize($redis);

        if ($redis) {
            $this->result['questions_item'] =  $redis['questions_item'];
            $this->result['jurist'] =  $redis['jurist'];
            $this->result['answer'] =  $redis['answer'];
            $this->result['current_rubric'] =  $redis['current_rubric'];
            $this->result['similar_questions'] = $redis['similar_questions'];
            $this->result['similar_questions__length'] = count($redis['similar_questions']);

            $cpu_name = $this->result['current_rubric']['current_rubric_cpu_name'] ?? null;

            $this->result['bibliotechka'] = $this->bibliotechkaRand($cpu_name);

            $this->SidebarAction('json');

            $this->getDate();

            return $this->result;
        }

        /** @var ObjectManager $om */
        $om = $this->connect_to_Jurists_bd;

        /** @var Questions $Question */
        $Question = $om
            ->getRepository('JuristBundle:Questions')
            ->createQueryBuilder('q')
            ->where('q.step = :step')
            ->andWhere('q.id = :id')
            ->setParameters(['step' => self::FINISHED_STEP, 'id' => $id])
            ->setMaxResults(1) //limit на всякий случай, с учетом getOneOrNullResult ;)
            ->getQuery()
            ->getOneOrNullResult();

        $this->pageNotFound(!$Question);

        /**
         * start answers_steps, если у ответа тип card
         */
        $answer_steps = json_decode($Question->getAnswersId()->getAnswersSteps());
        /**
         * end answers_steps, если у ответа тип card
         */

        /**
         * result block
         */
        $this->result['questions_item']['questions__head'][] = [
            'questions__head__author' =>
                [
                    [
                        'questions__head__author__name' => $Question->getAuthorId()->getName(),
                        'questions__head__author__location' => $Question->getAuthorId()->getCity(),
                    ],
                ],
            'questions__head__author__active' => $this->hideTargetCityAndFIO($Question->getRubrics()->toArray()),
            'questions__head__date' => $Question->getDate()->format('d.m.Y'),
        ];
        $this->result['questions_item']['rubrics'] = $this->formedTagsAndRubrics($Question->getRubrics()->toArray()); //$rubric_result;
        $this->result['questions_item']['title'] = $Question->getTitle();
        $this->result['questions_item']['title_seo'] = (!empty($Question->getTitleSeo()) ? $Question->getTitleSeo() : $Question->getTitle());
        $this->result['questions_item']['text'] = $Question->getDescription();
        $this->result['questions_item']['description_seo'] = (!empty($Question->getDescriptionSeo()) ? $Question->getDescriptionSeo() : $Question->getDescription()); //text_seo
        $this->result['questions_item']['keywords'] = (!empty(trim($Question->getKeywordsSeo())) ? $Question->getKeywordsSeo() : false);
        $this->result['questions_item']['tags'] = $this->formedTagsAndRubrics($Question->getTags()->toArray()); //$tag_result;
        $this->result['questions_item']['questions__item_complete'] = 1;
        $this->result['jurist'] = [
            'jurist__active' => ($Question->getAnswersId()->getAuthUsersId()->getDisabled() == self::DISABLED_VALUE_ON) ? !self::DISABLED_VALUE_ON : self::DISABLED_VALUE_ON,
            'jurist__img' => [$this->fetchAvatar($Question->getAnswersId()->getAuthUsersId(), $Question)],
            'jurist__link' => self::JURIST . $Question->getAnswersId()->getAuthUsersId()->getId() . self::REDIRECT,
            'jurist__name' => $Question->getAnswersId()->getAuthUsersId()->getName() . ' ' . $Question->getAnswersId()->getAuthUsersId()->getSecondName(),
            'jurist__consultations' => $this->getCountConsultation($Question->getAnswersId()->getAuthUsersId()),
            'jurist__paid__feedback' => [ //Кнопка обратной связи у юристов
                'feedback__active' => ($Question->getAnswersId()->getAuthUsersId()->getDateEndPayFeedbackButton() > new \DateTime('now')) ? true : false,
                'type__feedback__email' => ($Question->getAnswersId()->getAuthUsersId()->getJuristFeedbackSiteOrEmail() === false) ? false : true, //site == false,
                'feedback__data' => $Question->getAnswersId()->getAuthUsersId()->getJuristDataFeedback(),
            ]
        ];
        $this->result['jurist']['jurist__img__length'] = count($this->result['jurist']['jurist__img']);
        $this->result['answer'] = [
            [
                /** start  для мусташа ставим true для нужного type **/
                'answer__type_card' => ($Question->getAnswersId()->getTypeCards() == 'card') ? 1 : 0,
                'answer__type_reg' => ($Question->getAnswersId()->getTypeCards() == '' || $Question->getAnswersId()->getTypeCards() == 0) ? 1 : 0, //Не ставить строго равенство
                /** end для мусташа ставим true для нужного type **/
                'answer__text' => $Question->getAnswersId()->getAnswers(),
                'answer__steps' => (isset($answer_steps)) ? $answer_steps : '',
                'answer__thanx' => $Question->getAnswersId()->getRating(),
                'answer__id' => $Question->getAnswersId()->getId(), //id для проверки в ajax
            ]
        ];

        $this->generateFirstLast($this->result['questions_item']['tags']);
        $this->generateFirstLast($this->result['questions_item']['rubrics']);

        $this->result['questions_item']['jurist__length'] = (count($this->result['jurist']) > 0) ? 1 : 0; //Если есть, то 1-true
        $this->result['questions_item']['tags__length'] = (count($this->result['questions_item']['tags']) > 0) ? count($this->result['questions_item']['tags']) : 0; //Если есть, то 1-true

        /**
         * проверка является ли ответ карточкой
         */
        foreach($this->result['answer'] as &$answer_val){
            if($answer_val['answer__type_card'] != true){
                unset($answer_val['answer__steps']);
            }
        }

        /** @var Rubrics $rubricCurrentId */
        foreach ($Question->getRubrics()->toArray() as $rubricCurrentId) {
            $this->result['current_rubric'] = [
                'current_rubric_name' => $rubricCurrentId->getName(),
                'current_rubric_id' => $rubricCurrentId->getId(),
                'current_rubric_cpu_name' => $rubricCurrentId->getCPUName(),
            ];
        }

        $this->result['similar_questions'] = $this->fetchSimilarQuestions($Question, $om);
        $this->result['similar_questions__length'] = count($this->result['similar_questions']);

        $this->redis->setEx(
            $nameRedisNow,
            (60 * 60), //Expires на 60 минут
            serialize(
                [
                    'questions_item' => $this->result['questions_item'],
                    'jurist' => $this->result['jurist'],
                    'answer' => $this->result['answer'],
                    'current_rubric' => $this->result['current_rubric'],
                    'similar_questions' => $this->result['similar_questions'],
                ]
            ));

        $cpu_name = $this->result['current_rubric']['current_rubric_cpu_name'] ?? null;
        $this->result['bibliotechka'] = $this->bibliotechkaRand($cpu_name);


        $this->SidebarAction('json');

        $this->getDate();

        return $this->result;
    }

    /**
     * @param null $id - вопроса для поиска в JuristBundle:Questions
     * @return JsonResponse|Response
     */
    public function AnswerAction($id = null)
    {
        if ($this->fetchFormat() === 'json') {
            $this->formedDataAction($id);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($this->fetchFormat() === 'html') {
            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/answer.html'),
                    json_decode(json_encode($this->formedDataAction($id)))
                )
            );
        } else {
            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");
        }
    }

    public function testSimilarAction($id)
    {

        $this->HeaderAction(self::TABS_MAIN);

/*        $nameRedisNow = "PravoQuestionAnswers({$id})";
        $redis = $this->redis->get($nameRedisNow);
        $redis = unserialize($redis);

        if ($redis) {
            $this->result['questions_item'] =  $redis['questions_item'];
            $this->result['jurist'] =  $redis['jurist'];
            $this->result['answer'] =  $redis['answer'];
            $this->result['current_rubric'] =  $redis['current_rubric'];

            $cpu_name = $this->result['current_rubric']['current_rubric_cpu_name'] ?? null;

            $this->result['bibliotechka'] = $this->bibliotechkaRand($cpu_name);

            $this->SidebarAction('json');

            $this->getDate();

            return $this->result;
        }*/

        /** @var ObjectManager $om */
        $om = $this->connect_to_Jurists_bd;

        /** @var Questions $Question */
        $Question = $om
            ->getRepository('JuristBundle:Questions')
            ->createQueryBuilder('q')
            ->where('q.step = :step')
            ->andWhere('q.id = :id')
            ->setParameters(['step' => self::FINISHED_STEP, 'id' => $id])
            ->setMaxResults(1) //limit на всякий случай, с учетом getOneOrNullResult ;)
            ->getQuery()
            ->getOneOrNullResult();

        $this->pageNotFound(!$Question);

        /**
         * start answers_steps, если у ответа тип card
         */
        $answer_steps = json_decode($Question->getAnswersId()->getAnswersSteps());
        /**
         * end answers_steps, если у ответа тип card
         */

        /**
         * result block
         */
        $this->result['questions_item']['questions__head'][] = [
            'questions__head__author' =>
                [
                    [
                        'questions__head__author__name' => $Question->getAuthorId()->getName(),
                        'questions__head__author__location' => $Question->getAuthorId()->getCity(),
                    ],
                ],
            'questions__head__author__active' => $this->hideTargetCityAndFIO($Question->getRubrics()->toArray()),
            'questions__head__date' => $Question->getDate()->format('d.m.Y'),
        ];
        $this->result['questions_item']['rubrics'] = $this->formedTagsAndRubrics($Question->getRubrics()->toArray()); //$rubric_result;
        $this->result['questions_item']['title'] = $Question->getTitle();
        $this->result['questions_item']['title_seo'] = (!empty($Question->getTitleSeo()) ? $Question->getTitleSeo() : $Question->getTitle());
        $this->result['questions_item']['text'] = $Question->getDescription();
        $this->result['questions_item']['description_seo'] = (!empty($Question->getDescriptionSeo()) ? $Question->getDescriptionSeo() : $Question->getDescription()); //text_seo
        $this->result['questions_item']['keywords'] = (!empty(trim($Question->getKeywordsSeo())) ? $Question->getKeywordsSeo() : false);
        $this->result['questions_item']['tags'] = $this->formedTagsAndRubrics($Question->getTags()->toArray()); //$tag_result;
        $this->result['questions_item']['questions__item_complete'] = 1;
        $this->result['jurist'] = [
            'jurist__active' => ($Question->getAnswersId()->getAuthUsersId()->getDisabled() == self::DISABLED_VALUE_ON) ? !self::DISABLED_VALUE_ON : self::DISABLED_VALUE_ON,
            'jurist__img' => [$this->fetchAvatar($Question->getAnswersId()->getAuthUsersId(), $Question)],
            'jurist__link' => self::JURIST . $Question->getAnswersId()->getAuthUsersId()->getId() . self::REDIRECT,
            'jurist__name' => $Question->getAnswersId()->getAuthUsersId()->getName() . ' ' . $Question->getAnswersId()->getAuthUsersId()->getSecondName(),
            'jurist__consultations' => $this->getCountConsultation($Question->getAnswersId()->getAuthUsersId()),
            'jurist__paid__feedback' => [ //Кнопка обратной связи у юристов
                'feedback__active' => ($Question->getAnswersId()->getAuthUsersId()->getDateEndPayFeedbackButton() > new \DateTime('now')) ? true : false,
                'type__feedback__email' => ($Question->getAnswersId()->getAuthUsersId()->getJuristFeedbackSiteOrEmail() === false) ? false : true, //site == false,
                'feedback__data' => $Question->getAnswersId()->getAuthUsersId()->getJuristDataFeedback(),
            ]
        ];
        $this->result['jurist']['jurist__img__length'] = count($this->result['jurist']['jurist__img']);
        $this->result['answer'] = [
            [
                /** start  для мусташа ставим true для нужного type **/
                'answer__type_card' => ($Question->getAnswersId()->getTypeCards() == 'card') ? 1 : 0,
                'answer__type_reg' => ($Question->getAnswersId()->getTypeCards() == '' || $Question->getAnswersId()->getTypeCards() == 0) ? 1 : 0, //Не ставить строго равенство
                /** end для мусташа ставим true для нужного type **/
                'answer__text' => $Question->getAnswersId()->getAnswers(),
                'answer__steps' => (isset($answer_steps)) ? $answer_steps : '',
                'answer__thanx' => $Question->getAnswersId()->getRating(),
                'answer__id' => $Question->getAnswersId()->getId(), //id для проверки в ajax
            ]
        ];

        $this->generateFirstLast($this->result['questions_item']['tags']);
        $this->generateFirstLast($this->result['questions_item']['rubrics']);

        $this->result['questions_item']['jurist__length'] = (count($this->result['jurist']) > 0) ? 1 : 0; //Если есть, то 1-true
        $this->result['questions_item']['tags__length'] = (count($this->result['questions_item']['tags']) > 0) ? count($this->result['questions_item']['tags']) : 0; //Если есть, то 1-true

        /**
         * проверка является ли ответ карточкой
         */
        foreach($this->result['answer'] as &$answer_val){
            if($answer_val['answer__type_card'] != true){
                unset($answer_val['answer__steps']);
            }
        }

        /** @var Rubrics $rubricCurrentId */
        foreach ($Question->getRubrics()->toArray() as $rubricCurrentId) {
            $this->result['current_rubric'] = [
                'current_rubric_name' => $rubricCurrentId->getName(),
                'current_rubric_id' => $rubricCurrentId->getId(),
                'current_rubric_cpu_name' => $rubricCurrentId->getCPUName(),
            ];
        }

        $this->result['similar_questions'] = $this->fetchSimilarQuestions($Question, $om);
        ########
        $response = new JsonResponse();
        $response
            ->setData(
                $this->result,
                JSON_UNESCAPED_SLASHES
            )
            ->headers->set('Content-Type', 'application/json');
        return $response;
        ########

/*
        $this->redis->setEx(
            $nameRedisNow,
            (60 * 60), //Expires на 60 минут
            serialize(
                [
                    'questions_item' => $this->result['questions_item'],
                    'jurist' => $this->result['jurist'],
                    'answer' => $this->result['answer'],
                    'current_rubric' => $this->result['current_rubric'],
                ]
            ));
*/

        $cpu_name = $this->result['current_rubric']['current_rubric_cpu_name'] ?? null;
        $this->result['bibliotechka'] = $this->bibliotechkaRand($cpu_name);

        $this->SidebarAction('json');

        $this->getDate();

        return $this->result;
    }

    private function fetchSimilarQuestions($Question, $om)
    {
        ## добавим похожие вопросы
//        $rubric_id = $this->result['current_rubric']['current_rubric_id'];
        $rubric_counter = 0;
        $rubric_parameters = [];
        /** @var Rubrics $rubr */
        foreach ($Question->getRubrics()->toArray() as $rubr) {
            $rubric_parameters[':rubric' . $rubric_counter] = $rubr->getId();
        }


        $tag_counter = 0;
        $tag_parameters = [];
        /** @var Tags $tag */
        foreach ($Question->getTags()->toArray() as $tag) {
            $tag_parameters[':tag' . $tag_counter] = $tag->getId();
            $tag_counter++;
        }
        /** @var Questions $Question */
        $qb = $om
            ->getRepository('JuristBundle:Questions')
            ->createQueryBuilder('q');

        $parameters = array_merge(
            [
                'step' => self::FINISHED_STEP,
                'q_id' => $Question->getId(),
            ],
            $tag_parameters,
            $rubric_parameters
        );

        try {
            $same_questions = $qb
                ->select('q.id')
                ->addSelect('q.title')
                ->leftJoin('q.tags', 't')
                ->leftJoin('q.rubrics', 'r')
                ->andWhere('q.step = :step')
                ->andWhere(
                    $qb->expr()->andX(
                        $qb->expr()->neq('q.id', ':q_id'),
                        $qb->expr()->in('r.id', join(',', array_keys($rubric_parameters))),
                        $qb->expr()->in('t.id', join(',', array_keys($tag_parameters)))
                    )
                )
                ->setParameters($parameters)
                ->setMaxResults(4)
                ->getQuery()
                ->getResult();
        } catch (\Exception $e) {
            return null;
        }

        if (is_null($same_questions)) return null;

        $similarQuestions = array_map(
            function (array $q) {
                $q['link'] = $this->generateUrl(
                    'rg_answer_page',
                    ['id' => $q['id']]
                );
                return $q;
            },
            $same_questions
        );

        return $similarQuestions;
    }
}
