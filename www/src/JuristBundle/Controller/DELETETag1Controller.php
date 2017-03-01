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

class Tag1Controller extends ApiController
{

    /**
     * @param $id - записи в таблице Tags
     * @param $numberPage - номер страницы в пагинации
     * @param $offset - offset
     * @return mixed
     */
    public function formedDataAction ($id, $numberPage, $offset)
    {

        $keyRedis = "PravoTag(id:{$id}/numberPage:{$numberPage})";
        $redis = $this->redis->get($keyRedis);
        $redis = unserialize($redis);

        if (false) {
            $this->result = $redis;
        } else {
            $TagQuestions = $this->connect_to_Jurists_bd->getRepository('JuristBundle:Questions')->fetchQuestionsForTag($id);

            $this->pageNotFound(!$TagQuestions);

            $this->formedQuestionsDBAL($TagQuestions);

            $Tag = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Tags')
                ->findOneById($id);

            $this->PaginationAction(
                $this->result['questions_list'], self::PAGINATION_FOR_JURISTS,
                self::COUNT_RECORDS_ON_PAGE_JURISTS, $numberPage,
                '/tag/', 1,
                "/" . trim($id) //trim потому что лезут пробелы
            );

            $crutchForPagination = []; //Потому что архитектура первоначально была не верно заложенна
            foreach ($this->result['questions_list'] as $keyCrutchForPagination => $valCrutchForPagination) {
                if ($keyCrutchForPagination >= $offset && $keyCrutchForPagination < $offset + self::COUNT_RECORDS_ON_PAGE_JURISTS) { //Диапозон записей на странице, по умолчанию 7 ApiController::COUNT_RECORDS_ON_PAGE_JURISTS
                    $crutchForPagination[] = $valCrutchForPagination;
                }
            }

            $this->result['questions_list'] = $crutchForPagination; //Костыль

            $this->result['current_tag'] = $Tag->getName();

            $this->result['description_tag'] = [
                'description_title' => ((!empty($Tag->getTitle())) ? $Tag->getTitle() : $Tag->getName()),
                'description_description' => ((!empty($Tag->getDescription())) ? $Tag->getDescription() : false),
                'description_length' => ((!empty($Tag->getDescription())) ? true : false),
            ];

//            $this->redis->setEx($keyRedis, (60 * 60), serialize( //На 1 час
//                [
//                    'questions_list' => $this->result['questions_list'],
//                    'description_tag' => $this->result['description_tag'],
//                    'current_tag' => $this->result['current_tag'],
//                    'pagination' => $this->result['pagination']
//                ]
//            ));
        }

        /**
         * Проблема с формированием в formedQuestionsDBAL
         */
        dump($this->result);die;

        $this->HeaderAction(self::TABS_TAGS);
        $this->SidebarAction('json');

        $this->getDate();

        $this->result['canonical'] = "https://pravo.rg.ru/tag/1/{$id}/";

        $this->pageNotFound(empty($this->result['questions_list']));

        return $this->result;

    }

    /**
     * @param int $idPage - Номер страницы пагинации
     * @param null $id - Id записи в JuristBundle:Tags
     * @return JsonResponse|Response
     */

    public function TagAction($idPage = 1, $id = null)
    {

        $offset = $this->generateOffsetPagination($idPage); //Генерируем offset

        if ($this->fetchFormat() === 'json') {
            $this->formedDataAction($id, $idPage, $offset);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($this->fetchFormat() === 'html') {
            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/tag_questions.html'),
                    json_decode(json_encode($this->formedDataAction($id, $idPage, $offset)))
                )
            );
        } else {
            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");
        }

    }

}