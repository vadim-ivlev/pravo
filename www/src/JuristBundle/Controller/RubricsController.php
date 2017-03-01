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
     * Генерирует единую структуру вывода тегов для рубрик
     * @param $rubrics
     * @param null $id
     */
    private function formedTagsForRubrics($rubrics, $id = null)
    {

        /**
         * Хардкор для ВСЕХ рубрик
         */
        define('TYPE_PAGE', '');

        $this->result['categories']['rubrics'][] = [
            'rubrics__title' => 'Все',
            'rubrics__link' => self::RUBRICS . TYPE_PAGE .'0' . self::REDIRECT,
            'rubrics__active' => (!isset($id)) ? 1 : 0, //Если вызов во "ВСЕХ" рубриках
            'rubric__id' => null
        ];


        foreach ($rubrics as $rubric) {
            $this->result['categories']['rubrics'][] = [
                'rubrics__title' => $rubric->getName(),
                'rubrics__link' => self::RUBRICS . TYPE_PAGE . $rubric->getId() . self::REDIRECT,
                'rubrics__active' => (isset($id) && $id == $rubric->getId()) ? 1 : 0, //Если вызов во НЕ ВО "ВСЕХ" рубриках и проверка на тру для конкретного юзвера
                'rubrics__id' => $rubric->getId()
            ];

            $rubrics_tags__items = [];
            foreach ($rubric->getTags()->toArray() as $val_tags) {
                if (!empty($val_tags->getName()) && (boolean)$val_tags->getDisabled() !== false) {

                    $rubrics_tags__items['rubrics_tags__items'][] = [
                        'rubrics_tags__items__title' => $val_tags->getName(),
                        'rubrics_tags__items__link' => self::TAG . '1/' . $val_tags->getId()  . self::REDIRECT,
                        'rubrics_tags__items__frequency' => (!$val_tags->getCountPublicQuestions()) ? false : $val_tags->getCountPublicQuestions()  //Количество тегов в поросе
                    ];
                }
            }

            /**
             * @var $rubrics_tags__items !empty($rubrics_tags__items) - нужен и там, и там, чтоб не попадали рубрики у которых еще нет связанных тегов
             * @var $id - проверка для вывода ВСЕХ тегов, если id КОНКРЕТНОЙ рубрики не определен
             *
             */
            if (!empty($rubrics_tags__items)) {
                if (isset($id) && $rubric->getId() == $id) {
                    $this->result['categories']['rubrics_tags'][] = [
                        'rubrics_tags__name' => $rubric->getName(),
                        'rubrics_tags__links' => self::RUBRIC . '1/' . $rubric->getId() . self::REDIRECT,
                        'rubrics_tags__items_unit' => $rubrics_tags__items
                    ];
                } else if (!isset($id)) {
                    $this->result['categories']['rubrics_tags'][] = [
                        'rubrics_tags__name' => $rubric->getName(),
                        'rubrics_tags__links' => self::RUBRIC . '1/' . $rubric->getId() . self::REDIRECT,
                        'rubrics_tags__items_unit' => $rubrics_tags__items
                    ];
                }
            }
        }

    }

    /**
     * @param $id - на рубрики
     * @return mixed
     */
    public function formedDataAction ($id)
    {
        $this->result['material_title'] = 'Рубрики и актуальные теги';

        $nameRedisNow = "PravoRubrics(" . strval($id) . ")";
        $redis = $this->redis->get($nameRedisNow);
        $redis = unserialize($redis);

        if ($redis) {
            $this->result['categories'] =  $redis['categories'];
        } else {
            $rubrics = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Rubrics')
                ->findBy([], ['name' => 'ASC']);

            if ($id) {

                $this->formedTagsForRubrics($rubrics, $id); //Хардкор для ВСЕХ рубрик

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

        $this->result['canonical'] = "https://pravo.rg.ru/rubrics/{$id}/";

        return $this->result;
    }

    /**
     * @param int $id - Номер страницы пагинации
     * @return JsonResponse|Response
     */
    public function RubricAction ($id = 0)
    {
        if ($this->fetchFormat() === 'json') {

            $this->formedDataAction ($id);

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
                    json_decode(json_encode($this->formedDataAction($id)))
                )
            );

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}