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

class RubricController extends ApiController
{
    const URN = "https://pravo.rg.ru/generate_ssi1/?uri=/views/include/tmpl-question_item/rubrics-";
    const URL = "/index.html?format=json";
    
    public function formedDataAction ($CPUName)
    {
        $Rubric = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Rubrics')
            ->findOneBy(['CPUName' => $CPUName]);
        
        $this->result['current_rubric'] = [
            'current_rubric_name' => $Rubric->getName(),
            'current_rubric_id' => $Rubric->getId(),
            'seo_title_rubric' => htmlspecialchars($Rubric->getTitle()),
            'seo_title_rubric_for_block' => htmlspecialchars($Rubric->getTitleForBlock()),
            'seo_title_description' => htmlspecialchars($Rubric->getDescription()),
            'seo_title_description_for_block' => $Rubric->getDescriptionForBlock()
        ];

        $questionsAndLimit = json_decode(@file_get_contents(self::URN . $CPUName . self::URL), true);
        $this->result["items_list"] = $questionsAndLimit["items_list"];
        $this->result["infiniteScroll"] = $questionsAndLimit["infiniteScroll"];
        $this->result["requestUri"] = "https://pravo.rg.ru/generate_ssi1/?uri=/views/include/tmpl-question_item/rubrics-" . $CPUName;

        $this->HeaderAction(self::TABS_MAIN);

        $this->SidebarAction('json', $Rubric->getId());

        $this->getDate();

        $this->result['canonical'] = "https://pravo.rg.ru/rubric/{$CPUName}/";

        $this->pageNotFound(empty($this->result['items_list']));

        return $this->result;

    }

    public function RubricAction ($CPUName = null)
    {
        if(is_numeric(intval($CPUName)) && intval($CPUName) !== 0) { // Редирект со старых id на новые

            //За
            $Rubric = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Rubrics')
                ->findOneById($CPUName);

            $this->pageNotFound(!$Rubric);

            $CPUName = $Rubric->getCPUName();

            return $this->redirectToRoute('rg_rubric_page_1', ['CPUName' => $CPUName], 301);
        }

        if($this->fetchFormat() === 'json') {
            $this->formedDataAction($CPUName);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($this->fetchFormat() === 'html') {
            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/rubric_questions.html'),
                    json_decode(json_encode($this->formedDataAction($CPUName)))
                )
            );
        } else {
            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");
        }

    }
}