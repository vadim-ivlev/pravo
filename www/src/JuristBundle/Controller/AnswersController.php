<?php

namespace JuristBundle\Controller;

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

class AnswersController extends ApiController
{
    public function formedDataAction($id)
    {
        $Question = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Questions')
            ->findOneById($id);

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
            'questions__head__author' => [
                [
                    'questions__head__author__name' => $Question->getAuthorId()->getName(),
                    'questions__head__author__location' => $Question->getAuthorId()->getCity()
                ]
            ],
            'questions__head__date' => $Question->getDate()->format('d.m.Y'),
        ];
        $this->result['questions_item']['rubrics'] = $this->formedTagsAndRubrics($Question->getRubrics()->toArray());//$rubric_result;
        $this->result['questions_item']['title'] = $Question->getTitle();
        $this->result['questions_item']['text'] = $Question->getDescription();
        $this->result['questions_item']['tags'] = $this->formedTagsAndRubrics($Question->getTags()->toArray());//$tag_result;
        $this->result['questions_item']['questions__item_complete'] = 1;
        $this->result['jurist'] = [
            'jurist__active' => ($Question->getAnswersId()->getAuthUsersId()->getDisabled() == self::DISABLED_VALUE_ON) ? !self::DISABLED_VALUE_ON : self::DISABLED_VALUE_ON,
            'jurist__img' => [$this->fetchAvatar($Question->getAnswersId()->getAuthUsersId(), $Question)],
            'jurist__link' => self::JURIST . $Question->getAnswersId()->getAuthUsersId()->getId() . self::REDIRECT,
            'jurist__name' => $Question->getAnswersId()->getAuthUsersId()->getName() . ' ' . $Question->getAnswersId()->getAuthUsersId()->getSecondName(),
            'jurist__consultations' => $this->getCountConsultation($Question->getAnswersId()->getAuthUsersId()),
            'jurist__paid__feedback' => [//кнопка обратной связи у юристов
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
                    'answer__type_reg' => ($Question->getAnswersId()->getTypeCards() == '' || $Question->getAnswersId()->getTypeCards() == 0) ? 1 : 0,//не ставить строго равенство
                /** end для мусташа ставим true для нужного type **/
                'answer__text' => $Question->getAnswersId()->getAnswers(),
                'answer__steps' => (isset($answer_steps)) ? $answer_steps : '',
                'answer__thanx' => $Question->getAnswersId()->getRating(),
                'answer__id' => $Question->getAnswersId()->getId(),//id для проверки в ajax
            ]
        ];

        $this->generateFirstLast($this->result['questions_item']['tags']);
        $this->generateFirstLast($this->result['questions_item']['rubrics']);

        $this->result['questions_item']['jurist__length'] = (count($this->result['jurist']) > 0) ? 1 : 0;//если есть, то 1-true
        $this->result['questions_item']['tags__length'] = (count($this->result['questions_item']['tags']) > 0) ? count($this->result['questions_item']['tags']) : 0;//если есть, то 1-true

        /**
         * проверка является ли ответ карточкой
         */
        foreach($this->result['answer'] as &$answer_val){
            if($answer_val['answer__type_card'] != true){
                unset($answer_val['answer__steps']);
            }
        }

        /**
         * FISH START
         */

        $this->result['bibliotechka'] = $this->bibliotechkaRand();
        /**
         * FISH END
         */

        $this->HeaderAction(self::TABS_MAIN);

        foreach ($Question->getRubrics()->toArray() as $rubric_current_id) {
            $rubric_current_id = $rubric_current_id->getId();
        }
        
        $this->SidebarAction('json', $rubric_current_id);

        $this->getDate();

        return $this->result;
    }

    public function AnswerAction($id = null/*, $format = self::FORMAT*/)
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

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/answer.html'), json_decode(json_encode($this->formedDataAction($id)))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}