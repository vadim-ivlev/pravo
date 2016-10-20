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

    /**
     * @param $numberPage - для погинации
     * @return mixed
     */
    public function formedDataAction ($numberPage)
    {
        $this->result['material_title'] = 'Рубрики и актуальные теги';

        $nameRedisNow = "PravoRubrics(" . strval($numberPage) . ")";
        $redis = $this->redis->get($nameRedisNow);
        $redis = unserialize($redis);

        if ($redis) {
            $this->result['categories'] =  $redis['categories'];
        } else {
            $rubrics = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Rubrics')
                ->findBy([], ['name' => 'ASC']);

            if ($numberPage) {

                $this->formedTagsForRubrics($rubrics, $numberPage); //Хардкор для ВСЕХ рубрик

            } else { //Если рубрика не выбрана - т.е в разделе ВСЕ рубрики

                $this->formedTagsForRubrics($rubrics);

            }

            $this->pageNotFound(!isset($this->result['categories']['rubrics_tags']));

            $this->redis->setEx(
                $nameRedisNow,
                ((60 * 60) * 24), //Expires на 1 день
                serialize(
                    [
                        'categories' => $this->result['categories']
                    ]
                ));
        }

        $this->HeaderAction(self::TABS_TAGS);

        $this->SidebarAction('json');

        $this->getDate();

        return $this->result;
    }

    /**
     * @param int $numberPage - Номер страницы пагинации
     * @return JsonResponse|Response
     */
    public function RubricAction ($numberPage = 0)
    {
        if ($this->fetchFormat() === 'json') {

            $this->formedDataAction ($numberPage);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/rubrics.html'),
                    json_decode(json_encode($this->formedDataAction($numberPage)))
                )
            );

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}