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

    public function formedDataAction ($numberPage = 1, $offset = 0, $id)
    {

        $Rubric = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Rubrics')
            ->findOneById($id);

        $this->pageNotFound(!$Rubric);

        $this->formedQuestions($Rubric->getQuestions()->toArray());

        $this->PaginationAction(
            $this->result['questions_list'], 
            self::PAGINATION_FOR_JURISTS, 
            self::COUNT_RECORDS_ON_PAGE_JURISTS, 
            $numberPage,
            '/rubric/',
            1,
            "/" . trim($id) //trim потому что лезут пробелы
        ); //Место расположения должно быть ибо тут важно место

        $crutchForPagination = []; //Потому что архитектура первоначально была не верно заложенна
        
        foreach ($this->result['questions_list'] as $keyCrutchForPagination => $valCrutchForPagination) {
            if ($keyCrutchForPagination >= $offset && $keyCrutchForPagination < $offset + self::COUNT_RECORDS_ON_PAGE_JURISTS) { //Диапозон записей на странице, по умолчанию 7
                $crutchForPagination[] = $valCrutchForPagination;
            }
        }
        $this->result['questions_list'] = $crutchForPagination; //Костыль

        $this->HeaderAction(self::TABS_MAIN);

        $this->SidebarAction('json', $id);

        $this->result['current_rubric'] = $Rubric->getName();

        $this->getDate();

        $this->pageNotFound(empty($this->result['questions_list']));

        return $this->result;

    }

    public function RubricAction ($numberPage = 1, $id = null)
    {

        $offset = $this->generateOffsetPagination($numberPage);

        if($this->fetchFormat() === 'json'){
            $this->formedDataAction($numberPage, $offset, $id);

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
                    json_decode(json_encode($this->formedDataAction($numberPage, $offset, $id)))
                )
            );
        } else {
            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");
        }

    }
}