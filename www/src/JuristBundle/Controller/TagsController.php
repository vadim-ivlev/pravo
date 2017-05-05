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

class TagsController extends ApiController
{
    private $ruAlphabet = [];

    private function formedDataAction ($id)
    {
        $this->pageNotFound($id !== "0");

        $this->result['material_title'] = 'Актуальные теги';

        $nameRedisNow = "PravoTags(id:" . strval($id) . ")";
        $redis = $this->redis->get($nameRedisNow);
        $redis = unserialize($redis);

        if ($redis) {
            $this->result['tags'] =  $redis['tags'];
        } else {
            foreach (range(chr(0xC0), chr(0xDF)) as $letter) //Формируем rage русского алфавита
                $this->ruAlphabet[] = [
                    'tags__letter' => iconv('CP1251', 'UTF-8', $letter),
                    'length' => 0
                ];

            $tags = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Tags')
                ->createQueryBuilder('q')
                ->where('q.disabled = :disabled')
                ->setParameters(['disabled' => true])
                ->orderBy('q.name', 'ASC')
                ->getQuery()
                ->execute();

            foreach ($this->ruAlphabet as $letter => &$arrLetter)
                foreach ($tags as $tag)
                    if (!empty($tag->getName()) && mb_substr($tag->getName(), 0, 1) === $arrLetter['tags__letter']) {
                        $arrLetter['tags__items'][] = [
                            'tags__items__title' => $tag->getName(),
                            'tags__items__link' => self::TAG . $tag->getId() . self::REDIRECT,
                            'tags__items__frequency' => (!$tag->getCountPublicQuestions()) ? false : $tag->getCountPublicQuestions(),
                        ];
                        $arrLetter['length']++;
                    }


            unset($arrLetter);
            $this->result['tags'] = $this->ruAlphabet;

            $this->redis->setEx(
                $nameRedisNow,
                (60 * 30), //Expires на 30 минут
                serialize(
                    [
                        'tags' => $this->result['tags']
                    ]
                ));
        }

        $this->HeaderAction(self::TABS_TAGS);

        $this->SidebarAction('json');

        $this->getDate();

        $this->result['canonical'] = "https://pravo.rg.ru/rubrics/{$id}/";

        return $this->result;
    }

    public function TagsAction ($id = 0)
    {

        if ($this->fetchFormat() === 'json') {

            $response = new JsonResponse();
            $response
                ->setData($this->formedDataAction($id), JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/tags.html'),
                    json_decode(json_encode($this->formedDataAction($id)))
                )
            );

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}