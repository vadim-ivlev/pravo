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

class PartnersController extends ApiController
{
    public function formedDataAction ()
    {
        $this->HeaderAction(self::TABS_PARTNERS);

        $this->SidebarAction('json');

        $this->getDate();

        return $this->result;
    }

    public function PartnersAction()
    {

        if ($this->fetchFormat() === 'json') {

            $this->formedDataAction();

            $response = new JsonResponse();
            $response
                   ->setData($this->result, JSON_UNESCAPED_SLASHES)
                   ->headers->set('Content-Type', 'application/json');
            return $response;
            
        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();
            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/partners.html'), json_decode(json_encode($this->formedDataAction()))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}