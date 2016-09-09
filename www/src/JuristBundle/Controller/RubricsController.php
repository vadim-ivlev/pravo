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

class RubricsController extends ApiController
{

    public function formedDataAction ($id)
    {
        $this->result['material_title'] = 'Рубрики и актуальные теги';

        $Rubrics = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Rubrics')
            ->findBy([], ['name' => 'ASC']);

        if($id) {
            /**
             * Хардкор для ВСЕХ рубрик
             */

            $this->formedTagsForRubrics($Rubrics, $id);

        } else {//если рубрика не выбрана - т.е в разделе ВСЕ рубрики

            $this->formedTagsForRubrics($Rubrics);

        }

        $this->HeaderAction(self::TABS_TAGS);

        $this->SidebarAction('json');

        $this->getDate();

        return $this->result;
    }

    public function RubricAction (/*$format = self::FORMAT,*/ $id = null)
    {
        if ($this->fetchFormat() === 'json') {//app_dev.php/jurists/rubrics/json/0/

            $this->formedDataAction ($id);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/rubrics.html'), json_decode(json_encode($this->formedDataAction($id)))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}