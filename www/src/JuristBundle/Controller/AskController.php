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

class AskController extends ApiController
{

    public function formedDataAction(){
        $Rubrics = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Rubrics')
            ->findBy([], ['name' => 'ASC']);

        $array_rubric = array();
        foreach($Rubrics as $rubric){
            $array_rubric['rubrics'][] = [
                'value' => $rubric->getId(),
                'content' => $rubric->getName(),
            ];
        }
        $this->result = $array_rubric;

        $this->HeaderAction();

        $this->SidebarAction('json');

        $this->getDate();

        return $this->result;
    }

    public function AskAction($format = self::FORMAT)
    {//app_dev.php/jurists/ask/json/
        if($format === 'json'){

            $this->formedDataAction();

            $response = new JsonResponse();
            $response
                   ->setData($this->result, JSON_UNESCAPED_SLASHES)
                   ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($format === 'html') {

            $m = new Mustache_Engine();
            /*$config = $this->get("app.configer");
            $template_url = $config->getBy($this, 'jurists_templates', 'root_web');
            $data_url = $config->getBy($this, 'jurists_templates', 'root_data');

            $template_filename = $config->getBy($this, 'jurists_templates', 'create_question:tmpl');
            $data_filename = $config->getBy($this, 'jurists_templates', 'create_question:data');
            $text = @file_get_contents($template_url.$template_filename);
            $data = @file_get_contents($data_url.$data_filename);*/

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/ask.html'), json_decode(json_encode($this->formedDataAction()))));
            //$rendered = $m->render($text, json_decode($data));

            //return new Response($rendered);

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}