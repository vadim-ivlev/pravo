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

class Questions1Controller extends ApiController
{
    public function formedDataAction($id = 1, $limitPagination, $aliasEntity = 'q', $fieldOrderBy= '.id'){

        $keyRedis = "PravoQuestions(id:${id})";
        $redisNow = $this->redis->get($keyRedis);
        $redisNow = unserialize($redisNow);

        if ($redisNow) {
            $this->result = $redisNow;
        } else {

            $conditions = [];
            $conditions['step'] = self::FINISHED_STEP;
            $limit = self::COUNT_RECORDS_ON_PAGE_JURISTS;

            $select = "
                a.id AS a_id, a.typeCards AS a_type_cards,
                q.step AS q_step, q.id AS q_id, q.title AS q_title, q.description AS q_description, 
                au.id AS au_id, au.dateEndPay AS au_date_end_pay, au.disabled AS au_disabled, au.name AS au_name, au.second_name AS au_second_name,
                au.total_rating AS au_rating, 
                author.name AS author_name, author.city AS author_city
            ";

//            $Questions = $this->connect_to_Jurists_bd
//                ->getRepository('JuristBundle:Questions')
//                ->getQuestionsLimitOffset($conditions, $limit, $limitPagination, $select);
//
//            $this->formedQuestionsDBAL($Questions);


            /*$Questions = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Questions')
                ->createQueryBuilder($aliasEntity)
                ->innerJoin("q.answersId", 'a', 'WITH', "q.id = a.question")
                ->where($aliasEntity . '.step = :step')
                ->setParameters(array('step' => self::FINISHED_STEP))
                ->setFirstResult($limitPagination) //offset
                ->setMaxResults(self::COUNT_RECORDS_ON_PAGE_JURISTS) //limit
                ->orderBy('a.date', 'DESC')
                ->getQuery()
                ->execute();

            $this->formedQuestions($Questions);*/


            $select = 'a.id';
            $AllQuestions = $this->connect_to_Jurists_bd->getRepository('JuristBundle:Questions')->getAllQuestions($conditions, $select);

            $AllQuestionsAfterCheck = [];
            foreach ($AllQuestions as $AllQuestion) {
                if (!empty($AllQuestion->id)) {
                    $AllQuestionsAfterCheck[] = $AllQuestion;
                }
            }

            $pagination = $this->get('app.pagination');

            $this->result['pagination'] = $pagination->PaginationAction($AllQuestionsAfterCheck, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS, $id, '/main/');
            if (!$this->result['pagination'])
                $this->pageNotFound(true);

            //dump($this->result);die;

            /*$this->redis->setEx($keyRedis, (60 * 30), serialize( //30 мин
                [
                    'questions_list' => $this->result['questions_list'],
                    'pagination' => $this->result['pagination']
                ]
            ));*/
       }

        $this->HeaderAction(self::TABS_MAIN); //Если переставить вверх, то закешированный результат перебьет

        $this->SidebarAction('json');

        $this->getDate();

        $this->pageNotFound(!$this->result['questions_list']);

        $this->result['canonical'] = 'https://pravo.rg.ru';

        return $this->result;
    }

    public function MainAction ($pageId = 1)
    {
        $limitPagination = $this->generateOffsetPagination($pageId);

        if (
            Request::createFromGlobals()->getPathInfo() === '/main/1/'
            || Request::createFromGlobals()->getPathInfo() === '/main/1'
            || Request::createFromGlobals()->getPathInfo() === '/main/'
        ) return $this->redirectToRoute('rg_main_page_1', [], 302);

        if($this->fetchFormat() === 'json'){

            $response = new JsonResponse();
            $response
                ->setData($this->formedDataAction($pageId, $limitPagination), JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();
            return new Response(
                $m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/main.html'),
                    json_decode(json_encode($this->formedDataAction($pageId, $limitPagination))
                    )
                )
            );

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}