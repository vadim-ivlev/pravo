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
    public function formedDataAction($id, $limit_pagination, $aliasEntity = 'q', $fieldOrderBy= '.id'){

        $Questions = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Questions')
            ->createQueryBuilder($aliasEntity)
            ->where($aliasEntity . '.step = :step')
            ->setParameters(array('step' => 15))
            ->setFirstResult($limit_pagination)//offset
            ->setMaxResults(self::COUNT_RECORDS_ON_PAGE_JURISTS)//limit
            ->orderBy($aliasEntity . $fieldOrderBy, 'DESC')
            ->getQuery()
            ->execute();

        $AllQuestions = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Questions')
            ->createQueryBuilder($aliasEntity)
            ->where($aliasEntity . '.step = :step')
            ->setParameters(array('step' => 15))
            ->orderBy($aliasEntity . $fieldOrderBy, 'DESC')
            ->getQuery()
            ->execute();

        $AllQuestionsAfterCheck = [];
        foreach ($AllQuestions as $AllQuestion){
            if(!empty($AllQuestion->getAnswersId())){
                $AllQuestionsAfterCheck[] = $AllQuestion;
            }
        }


        $this->HeaderAction(self::TABS_MAIN);

        $this->formedQuestions($Questions);

        $this->SidebarAction('json');

        $this->PaginationAction($AllQuestionsAfterCheck, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS, $id, 'https://front.rg.ru/jurists/main/');

        $this->getDate();
        
        return $this->result;
    }

    public function MainAction($pageId = 1, $format = self::FORMAT, $limit_pagination = 0)
    {//app_dev.php/jurists/main/1/json/
        if($format === 'json'){

            //dump($this->formedDataAction($pageId, $limit_pagination));die;
            $response = new JsonResponse();
            $response
                   ->setData($this->formedDataAction($pageId, $limit_pagination), JSON_UNESCAPED_SLASHES)
                   ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif ($format === 'html') {

            $m = new Mustache_Engine();
            //TODO START не удалять
                /*$config = $this->get("app.configer");
                $template_url = $config->getBy($this, 'jurists_templates', 'root_web');
                $data_url = $config->getBy($this, 'jurists_templates', 'root_data');

                $template_filename = $config->getBy($this, 'jurists_templates', 'get_list_of_questions:tmpl');
                $data_filename = $config->getBy($this, 'jurists_templates', 'get_list_of_questions:data');
                $text = @file_get_contents($template_url.$template_filename);

                $data = @file_get_contents($data_url.$data_filename);

                $rendered = $m->render($text, json_decode($data));*/
            //TODO END не удалять
            //dump(file_exists(dirname(__FILE__) . '/../Resources/views/index.html'));die;
            return new Response($m->render($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/main.html'), json_decode(json_encode($this->formedDataAction($pageId, $limit_pagination))))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}