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

class QuestionsController extends ApiController
{
    const URI = "https://pravo.rg.ru/generate_ssi1/?uri=/views/include/tmpl-question_item/index.html?format=json";

    public function formedDataAction()
    {

        $this->HeaderAction(self::TABS_MAIN); //Если переставить вверх, то закешированный результат перебьет

        $this->SidebarAction('json');

        $this->getDate();

        $this->result['canonical'] = 'https://pravo.rg.ru';

        $questionsAndLimit = json_decode(@file_get_contents(self::URI), true);
        $questions = [];
        foreach ($questionsAndLimit["items_list"] as $k => $item) {
            if ($k == 3)
                $questions[] = [
                    "mods" => [
                        "bibliotechka"
                    ],
                    "mods__length" => 1,
                    "rubrics" => null,
                    "tags" => null,
                    "tags__length" => 0
                ];

            $questions[] = $item;
        }

        $this->result["items_list"] = $questions;
        $this->result["infiniteScroll"] = $questionsAndLimit["infiniteScroll"];
        $this->result["requestUri"] = "https://pravo.rg.ru/generate_ssi1/?uri=/views/include/tmpl-question_item";

        return $this->result;
    }

    public function MainAction ()
    {

        if (
            Request::createFromGlobals()->getPathInfo() === '/main/1/'
            || Request::createFromGlobals()->getPathInfo() === '/main/1'
            || Request::createFromGlobals()->getPathInfo() === '/main/'
        ) return $this->redirectToRoute('rg_main_page_1', [], 302);


        if($this->fetchFormat() === 'json') {

            $response = new JsonResponse();
            $response
                ->setData($this->formedDataAction(), JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();
            return new Response(
                $m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/main.html'),
                    json_decode(json_encode($this->formedDataAction())
                    )
                )
            );

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}
