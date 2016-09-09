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
    //public function formedDataAction ($id, $limit_pagination = 0, $offset = 0)
    public function formedDataAction ($number_page = 1, $offset = 0, $id)
    {
        $Rubric = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Rubrics')
            ->findOneById($id);

        $this->formedQuestions($Rubric->getQuestions()->toArray());

        $this->PaginationAction(
            $this->result['questions_list'], 
            self::PAGINATION_FOR_JURISTS, 
            self::COUNT_RECORDS_ON_PAGE_JURISTS, 
            $number_page, 
            '/rubric/',
            1,
            "/" . trim($id)//trim потому что лезут пробелы
        );//место расположения должно быть ибо тут важно место

        $crutch_for_pagination = []; //потому что архитектура первоначально была не верно заложенна
        foreach ($this->result['questions_list'] as $key_crutch_for_pagination => $val_crutch_for_pagination) {
            if ($key_crutch_for_pagination >= $offset && $key_crutch_for_pagination < $offset + self::COUNT_RECORDS_ON_PAGE_JURISTS) {//диапозон записей на странице, по умолчанию 7
                $crutch_for_pagination[] = $val_crutch_for_pagination;
            }
        }
        $this->result['questions_list'] = $crutch_for_pagination;//костыль

        $this->HeaderAction(self::TABS_MAIN);

        $this->SidebarAction('json', $id);

        $this->result['current_rubric'] = $Rubric->getName();

        $this->getDate();

        return $this->result;
    }

    public function RubricAction ( /*$format = self::FORMAT,*/ $number_page = 1, /*$offset = null,*/ $id = null )
    {

        $offset = $this->generateOffsetPagination($number_page);

        if($this->fetchFormat() === 'json'){//app_dev.php/jurists/rubric/json/0/

            //dump($format, $number_page, $offset,  $id );die;
            $this->formedDataAction($number_page, $offset, $id);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/rubric_questions.html'), json_decode(json_encode($this->formedDataAction($number_page, $offset, $id)))));
        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}