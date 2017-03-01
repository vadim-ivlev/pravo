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

class RubricController extends ApiController
{

    public function formedDataAction ($numberPage = 1, $offset = 0, $CPUName)
    {

        $keyRedis = "PravoRubric(id:{$CPUName}/numberPage:{$numberPage})";
        $redis = $this->redis->get($keyRedis);
        $redis = unserialize($redis);

        $Questions = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Questions')
            ->createQueryBuilder('q')
            ->innerJoin('q.rubrics', 'r')
            ->innerJoin('q.answersId', 'a')
            ->where('r.CPUName = :CPUName')
            ->andWhere('q.step = :step')
            ->setParameters(['CPUName' => $CPUName, 'step' => self::FINISHED_STEP])
            ->orderBy('a.date', 'DESC')
            ->getQuery()
            ->execute();

        $Rubric = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Rubrics')
            ->findOneBy(['CPUName' => $CPUName]);

        if ($redis) {
            $this->result = $redis;
        } else {
            if($_SERVER['REMOTE_ADDR'] === '212.69.111.131') {
            }
            $this->pageNotFound(!$Questions);

            $this->formedQuestions($Questions);

            $this->PaginationAction(
                $this->result['questions_list'],
                self::PAGINATION_FOR_JURISTS,
                self::COUNT_RECORDS_ON_PAGE_JURISTS,
                $numberPage,
                '/rubric/',
                1,
                "/" . trim($CPUName) //trim потому что лезут пробелы
            ); //Место расположения должно быть ибо тут важно место

            $crutchForPagination = []; //Потому что архитектура первоначально была не верно заложенна

            foreach ($this->result['questions_list'] as $keyCrutchForPagination => $valCrutchForPagination) {
                if ($keyCrutchForPagination >= $offset && $keyCrutchForPagination < $offset + self::COUNT_RECORDS_ON_PAGE_JURISTS) { //Диапозон записей на странице, по умолчанию 7
                    $crutchForPagination[] = $valCrutchForPagination;
                }
            }

            $this->result['questions_list'] = $crutchForPagination; //Костыль
            $this->result['current_rubric'] = [
                'current_rubric_name' => $Rubric->getName(),
                'current_rubric_id' => $Rubric->getId()
            ];

            $this->result['description_rubric'] = [
                'description_title' => ((!empty($Rubric->getTitle())) ? $Rubric->getTitle() : $Rubric->getName()),
                'description_description' => ((!empty($Rubric->getDescription())) ? $Rubric->getDescription() : false),
                'description_length' => ((!empty($Rubric->getDescription())) ? true : false),
            ];

            $this->redis->setEx($keyRedis, (60 * 180), serialize( //На 3 часа
                    [
                        'questions_list' => $this->result['questions_list'],
                        'current_rubric' => $this->result['current_rubric'],
                        'description_rubric' => $this->result['description_rubric'],
                        'pagination' => $this->result['pagination']
                    ]
                ));
        }

        $this->HeaderAction(self::TABS_MAIN);

        $this->SidebarAction('json', $Rubric->getId());

        $this->getDate();

        $this->result['canonical'] = "https://pravo.rg.ru/rubric/{$CPUName}/";

        $this->pageNotFound(empty($this->result['questions_list']));

        return $this->result;

    }

    public function RubricAction ($numberPage = 1, $CPUName = null)
    {
        $offset = $this->generateOffsetPagination($numberPage);

        if(is_numeric(intval($CPUName)) && intval($CPUName) !== 0) { //Редирект со старых id на новые

            //За
            $Rubric = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Rubrics')
                ->findOneById($CPUName);

            $this->pageNotFound(!$Rubric);

            $CPUName = $Rubric->getCPUName();

            return $this->redirectToRoute('rg_rubric_page_1', ['CPUName' => $CPUName], 301);
        }

        if($this->fetchFormat() === 'json') {
            $this->formedDataAction($numberPage, $offset, $CPUName);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($this->fetchFormat() === 'html') {
            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/rubric_questions.html'),
                    json_decode(json_encode($this->formedDataAction($numberPage, $offset, $CPUName)))
                )
            );
        } else {
            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");
        }

    }
}