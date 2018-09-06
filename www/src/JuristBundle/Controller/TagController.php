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
    const URN = "https://pravo.rg.ru/generate_ssi1/?uri=/views/include/tmpl-question_item/tags-";
    const URL = "/index.html?format=json";

    /**
     * @param $id - записи в таблице Tags
     * @return mixed
     */
    public function formedDataAction ($id)
    {
        $Tag = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Tags')
            ->findOneById($id);

        $questionsAndLimit = json_decode(@file_get_contents(self::URN . $id . self::URL), true);
        $this->result["items_list"] = $questionsAndLimit["items_list"];
        $this->result["infiniteScroll"] = $questionsAndLimit["infiniteScroll"];
        $this->result["requestUri"] = "https://pravo.rg.ru/generate_ssi1/?uri=/views/include/tmpl-question_item/tags-" . $id;

        $this->result['page__title'] = $Tag->getName();
        $this->result['current_tag'] = $Tag->getName();
        $this->result['description_tag'] = [
            'description_title' => ((!empty($Tag->getTitle())) ? $Tag->getTitle() : $Tag->getName()),
            'description_description' => ((!empty($Tag->getDescription())) ? $Tag->getDescription() : false),
            'description_length' => ((!empty($Tag->getDescription())) ? true : false),
        ];

        $this->result['seo'] = [
            'seo__title' => ((!empty($Tag->getTitle())) ? $Tag->getTitle() : $Tag->getName()),
            //'seo__block_text' => ((!empty($Tag->getDescription())) ? $Tag->getDescription() : false),
            'seo__block_text' => ((!empty($Tag->getDescriptionForBlock())) ? $Tag->getDescriptionForBlock() : false),
            'seo__length' => ((!empty($Tag->getDescription())) ? true : false),
        ];

        $this->HeaderAction(self::TABS_TAGS);
        $this->SidebarAction('json');

        $this->getDate();

        // $this->result['canonical'] = "https://pravo.rg.ru/tag/1/{$id}/";
        $this->result['canonical'] = "https://pravo.rg.ru/tag/{$id}/";

        $this->pageNotFound(empty($this->result['items_list']));

        return $this->result;

    }

    /**
     * @param null $id - Id записи в JuristBundle:Tags
     * @return JsonResponse|Response
     */

    public function TagAction($id = null)
    {

        if ($this->fetchFormat() === 'json') {
            $this->formedDataAction($id);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($this->fetchFormat() === 'html') {
            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/tag_questions.html'),
                    json_decode(json_encode($this->formedDataAction($id)))
                )
            );
        } else {
            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");
        }

    }

}
