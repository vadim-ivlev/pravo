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

    public function formedDataAction ($id)
    {
        $Tag = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Tags')
            ->findOneById($id);

        $this->formedQuestions($Tag->getQuestions()->toArray());

        $this->HeaderAction(self::TABS_TAGS);

        $this->SidebarAction('json');

        $this->result['current_tag'] = $Tag->getName();

        $this->getDate();

        return $this->result;
    }


    public function TagAction($format = self::FORMAT, $id = null, $id_page){

        if($format === 'json'){//app_dev.php/jurists/rubrics/json/0/

            $this->formedDataAction($id);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($format === 'html') {

            $m = new Mustache_Engine();

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/tag_questions.html'), json_decode(json_encode($this->formedDataAction($id)))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}