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
    public function formedDataAction ($id)
    {
        $Jurist = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:AuthUsers')
            //->findOneById($id);
            ->findOneBy(array('id' => $id/*, 'disabled' => 0*/));

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
                    'jurist__rate__author' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()),//общий рейтинг
                ],
                'jurist__consultations' => $this->getCountConsultation($Jurist->getId()),
                'jurist__paid__feedback' => [//кнопка обратной связи у юристов
                    'feedback__active' => ($Jurist->getDateEndPayFeedbackButton() > new \DateTime('now')) ? true : false,
                    'type__feedback__email' => ($Jurist->getJuristFeedbackSiteOrEmail() === false) ? false : true, //site == false,
                    'feedback__data' => $Jurist->getJuristDataFeedback(),
                ]
            );

            $data_jurist = &$this->result['jurists_profile'];

            $data_jurist['mods__length'] = count($data_jurist['mods']);
            $data_jurist['jurist__education__length'] = count($data_jurist['jurist__education']);
            $data_jurist['jurist__company__length'] = count($data_jurist['jurist__company']);
            $data_jurist['jurist__bio__length'] = count($data_jurist['jurist__bio']);

            $this->generateFirstLast($data_jurist['rubrics']);

            $Questions = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Questions')
                ->findBy(
                    ['AuthUsersId' => $Jurist->getId()], //AuthUsersId - where название филда берется из ентити, а не из sql
                    ['date' => 'DESC'], //order by
                    self::LIMIT_FOR_JURIST //limit
                );
            $this->formedQuestions($Questions);

            $this->getDate();

        } else {
            $this->result['Ban'] = 'Users block';
        }

        $this->HeaderAction(self::TABS_JURIST);

        $this->SidebarAction('json');

        return $this->result;
    }

    public function JuristAction($id = null, $format = self::FORMAT)
    {
        if (!empty($id) && $format === 'json') {///app_dev.php/jurists/jurist/1/json/


            $this->formedDataAction($id);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif (!empty($id) && $format === 'html') {

            $m = new Mustache_Engine();

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/lawer.html'), json_decode(json_encode($this->formedDataAction($id)))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}