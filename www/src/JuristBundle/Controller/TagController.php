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

class TagController extends ApiController
{

    public function formedDataAction ($id, $number_page, $offset)
    {

        $Tag = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Tags')
            ->findOneById($id);

        $this->formedQuestions($Tag->getQuestions()->toArray());

        $this->PaginationAction(
            $this->result['questions_list'], self::PAGINATION_FOR_JURISTS,
            self::COUNT_RECORDS_ON_PAGE_JURISTS, $number_page,
            '/tag/', 1,
            "/" . trim($id)//trim потому что лезут пробелы
        );

        $crutch_for_pagination = []; //потому что архитектура первоначально была не верно заложенна
        foreach ($this->result['questions_list'] as $key_crutch_for_pagination => $val_crutch_for_pagination) {
            if ($key_crutch_for_pagination >= $offset && $key_crutch_for_pagination < $offset + self::COUNT_RECORDS_ON_PAGE_JURISTS) {//диапозон записей на странице, по умолчанию 7
                $crutch_for_pagination[] = $val_crutch_for_pagination;
            }
        }
        $this->result['questions_list'] = $crutch_for_pagination;//костыль

        $this->HeaderAction(self::TABS_TAGS);

        $this->SidebarAction('json');

        $this->result['current_tag'] = $Tag->getName();

        $this->getDate();

        /*$this->PaginationAction(
            $AllTag, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS,
            $id, '/tag/', 1, '', $this->ProcessingRequestForPaginationAction()
        );*/

        return $this->result;
    }


    public function TagAction(/*$format = self::FORMAT, */$id_page = 1, $id = null){

        $offset = $this->generateOffsetPagination($id_page);//образуем offset

        if ($this->fetchFormat() === 'json') {//app_dev.php/jurists/rubrics/json/0/

            $this->formedDataAction($id, $id_page, $offset);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/tag_questions.html'), json_decode(json_encode($this->formedDataAction($id, $id_page, $offset)))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}