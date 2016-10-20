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

class JuristController extends ApiController
{
    public function formedDataAction ($id, $limitPagination, $pageId = 1, $aliasEntity = 'q')
    {
        $Jurist = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:AuthUsers')
            ->findOneBy(['id' => $id]);

        $this->pageNotFound(!$Jurist || $pageId <= 0);

        if ($Jurist->getDisabled() === self::DISABLED_VALUE_ON && $Jurist->getIsJurist() == true) {

            $rubrics = [];
            foreach($Jurist->getRubrics()->toArray() as $rubric){
                $rubrics[] = [
                    'rubrics__title' => $rubric->getName(),
                    'rubrics__link' => self::RUBRICS . $rubric->getId() . self::REDIRECT,
                ];
            }
            
            $this->result['jurists_profile'] = array(
                'mods' => array('profile'),
                'jurist__img' => [$this->fetchAvatar($Jurist, $Jurist)],
                'jurist__first_name' => $Jurist->getName(),
                'jurist__last_name' => $Jurist->getSecondName(),
                'jurist__patronymic' => $Jurist->getPatronymic(),
                'jurist__education' => $Jurist->getGraduate(),
                'rubrics' => $rubrics,
                'jurist__company' => htmlspecialchars($Jurist->getCompaniesId()->getName()),
                'jurist__bio' => $Jurist->getBiography(),
                'jurist__rate' => [
                    'jurist__rate__author' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()), //Общий рейтинг
                ],
                'jurist__consultations' => $this->getCountConsultation($Jurist->getId()),
                'jurist__paid__feedback' => [ //Кнопка обратной связи у юристов
                    'feedback__active' => ($Jurist->getDateEndPayFeedbackButton() > new \DateTime('now')) ? true : false,
                    'type__feedback__email' => ($Jurist->getJuristFeedbackSiteOrEmail() === true) ? true : false, //site == false,
                    'feedback__data' => $Jurist->getJuristDataFeedback(),
                ]
            );

            $dataJurist = &$this->result['jurists_profile'];

            $dataJurist['mods__length'] = count($dataJurist['mods']);
            $dataJurist['jurist__education__length'] = (count(trim($dataJurist['jurist__education'])) > 0 && !empty($dataJurist['jurist__education'])) ? true : false;
            $dataJurist['jurist__company__length'] = (count(trim($dataJurist['jurist__company'])) > 0 && !empty($dataJurist['jurist__company'])) ? true : false;
            $dataJurist['jurist__bio__length'] = (count(trim($dataJurist['jurist__bio'])) > 0 && !empty($dataJurist['jurist__bio'])) ? true : false;

            $this->generateFirstLast($dataJurist['rubrics']);
            unset($data_jurist);
            
            $Questions = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Questions')
                ->createQueryBuilder('q')
                ->innerJoin("q.answersId", 'a', 'WITH', "q.id = a.question")
                ->where('q.AuthUsersId = :AuthUsersId')
                ->setParameters(array('AuthUsersId' => $Jurist->getId()))
                ->setFirstResult($limitPagination) //offset
                ->setMaxResults(self::COUNT_RECORDS_ON_PAGE_JURISTS) //limit
                ->orderBy('a.date', 'DESC')
                ->getQuery()
                ->execute();

            $AllQuestions = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Questions')
            ->createQueryBuilder($aliasEntity)
            ->innerJoin("q.answersId", 'a', 'WITH', "q.id = a.question")
            ->where('q.AuthUsersId = :AuthUsersId')
            ->setParameters(array('AuthUsersId' => $Jurist->getId()))
            ->orderBy('a.date', 'DESC')
            ->getQuery()
            ->execute();

            $AllQuestionsAfterCheck = [];
            foreach ($AllQuestions as $AllQuestion){
                if(!empty($AllQuestion->getAnswersId())){
                    $AllQuestionsAfterCheck[] = $AllQuestion;
                }
            }

            $this->PaginationAction($AllQuestionsAfterCheck, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS, $pageId, '/jurist/', 1, "/" . trim($id));


            $this->formedQuestions($Questions);

            $this->getDate();

        } else {
            $this->result['Ban'] = 'Users block';
        }

        //if($_SERVER['REMOTE_ADDR'] == '212.69.111.131') {
            if (isset($this->result['pagination'])) { //Если пагинация есть и $pageId > count($this->result['pagination'])
                if ($pageId > count($this->result['pagination'])) $this->pageNotFound(true);
            } else {
                if ($pageId != 1) $this->pageNotFound(true);
            }
            //dump(isset($this->result['pagination']) && count($this->result['pagination']));die;
        //}

        $this->HeaderAction(self::TABS_JURIST);

        $this->SidebarAction('json');

        return $this->result;
    }

    public function JuristAction($pageId = 1, $id = null)
    {
        $limitPagination = $this->generateOffsetPagination($pageId);

        if (!empty($id) && $this->fetchFormat() === 'json') {
            $this->formedDataAction($id, $limitPagination, $pageId);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        } elseif (!empty($id) && $this->fetchFormat() === 'html') {
            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/lawer.html'),
                    json_decode(json_encode($this->formedDataAction($id, $limitPagination, $pageId)))
                )
            );
        } else {
            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");
        }
    }
}