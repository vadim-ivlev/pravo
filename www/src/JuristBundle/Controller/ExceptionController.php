<?php

namespace JuristBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Mustache_Engine;


class ExceptionController extends ApiController
{
    private $results;

    private function getResult() {
        return $this->results = [
            'data' => $this->getDate()
        ];
    }

    public function showExceptionAction(Request $request) {
//        var_dump($this->getParameter('locale'));//получает параметр из app/config  получить параметр из app/config

        if ($this->fetchFormat() === 'json') {
            $response = new JsonResponse();
            $response
                ->setData($this->getResult(), JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();
            return new Response($m->render(
                @file_get_contents("{$this->get('kernel')->getRootDir()}/Resources/TwigBundle/views/Exception/error404.html"),
                $this->getResult()
            ));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: {format == html || json}!");

        }
        //return $this->render($this->get('kernel')->getRootDir() . '/Resources/TwigBundle/views/Exception/error404.html.twig', $data);
    }
}
