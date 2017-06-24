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
    const URN = "https://pravo.rg.ru/generate_ssi1/?uri=/views/include/tmpl-question_item/jurists-";
    const URL = "/index.html?format=json";

    public function formedDataAction ($id, $aliasEntity = 'q')
    {
        $Jurist = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:AuthUsers')
            ->findOneBy(['id' => $id]);

        $this->pageNotFound(!$Jurist || $Jurist->getDisabled() !== self::DISABLED_VALUE_ON || $Jurist->getIsJurist() != true);

        if ($Jurist->getDisabled() === self::DISABLED_VALUE_ON && $Jurist->getIsJurist() == true) {

            $rubrics = [];
            foreach($Jurist->getRubrics()->toArray() as $rubric) {
                $rubrics[] = [
                    'rubrics__title' => $rubric->getName(),
                    'rubrics__link' => self::RUBRICS . $rubric->getId() . self::REDIRECT,
                ];
            }

            $totalRating = $this->connect_to_Jurists_bd->getRepository('JuristBundle:Questions')->fetchTotalRatingJurist([$Jurist], parent::FINISHED_STEP);

	    $juristRateAuthor = $totalRating[$Jurist->getId()]['total_rating'];
            $this->result['jurists_profile'] = [
                'mods' => ['profile'],
                'jurist__img' => [$this->fetchAvatar($Jurist, $Jurist)],
                'jurist__seo_title' => ((!empty($Jurist->getSeoTitle())) ? $Jurist->getSeoTitle() : $Jurist->getSecondName() . " " . $Jurist->getName() . " " . $Jurist->getPatronymic() . " - Юридическая консультация"),
                'jurist__seo_description' => $Jurist->getSeoDescription(),
                'jurist__seo_description_length' => ((strlen($Jurist->getSeoDescription()) !== 0) ? true : false),
                'jurist__first_name' => $Jurist->getName(),
                'jurist__last_name' => $Jurist->getSecondName(),
                'jurist__patronymic' => $Jurist->getPatronymic(),
                'jurist__education' => $Jurist->getGraduate(),
                'rubrics' => $rubrics,
                'jurist__company' => htmlspecialchars($Jurist->getCompaniesId()->getName()),
                'jurist__bio' => $Jurist->getBiography(),
                'jurist__rate' => [
                    //'jurist__rate__author' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()), //Общий рейтинг. Старный O(n) зависимость от количества вопросов
                    'jurist__rate__author' => ((isset($juristRateAuthor)) ? $juristRateAuthor : 0), //Общий рейтинг. Такая проверка, ибо, если у юриста нет ответов, то null и не отображается
                ],
                'jurist__consultations' => $this->getCountConsultation($Jurist->getId()),
                'jurist__paid__feedback' => [ //Кнопка обратной связи у юристов
                    'feedback__active' => ($Jurist->getDateEndPayFeedbackButton() > new \DateTime('now')) ? true : false,
                    'type__feedback__email' => ($Jurist->getJuristFeedbackSiteOrEmail() === true) ? true : false, //site == false,
                    'feedback__data' => $Jurist->getJuristDataFeedback(),
                ]
            ];

            $dataJurist = &$this->result['jurists_profile'];

            $dataJurist['mods__length'] = count($dataJurist['mods']);
            $dataJurist['jurist__education__length'] = (count(trim($dataJurist['jurist__education'])) > 0 && !empty($dataJurist['jurist__education'])) ? true : false;
            $dataJurist['jurist__company__length'] = (count(trim($dataJurist['jurist__company'])) > 0 && !empty($dataJurist['jurist__company'])) ? true : false;
            $dataJurist['jurist__bio__length'] = (count(trim($dataJurist['jurist__bio'])) > 0 && !empty($dataJurist['jurist__bio'])) ? true : false;

            $this->generateFirstLast($dataJurist['rubrics']);
            unset($data_jurist);

            //Infinity scroll
            $questionsAndLimit = json_decode(@file_get_contents(self::URN . $id . self::URL), true);
            $this->result["items_list"] = $questionsAndLimit["items_list"];
            $this->result["infiniteScroll"] = $questionsAndLimit["infiniteScroll"];
             $this->result["requestUri"] = self::URN . $id;

        } else {
            $this->result['Ban'] = 'Users block';
        }

        $this->getDate();

        $this->HeaderAction(self::TABS_JURIST);

        $this->SidebarAction('json');

        $this->result['canonical'] = "https://pravo.rg.ru/jurist/{$id}/";

        return $this->result;
    }

    public function JuristAction($id = null)
    {

        if (!empty($id) && $this->fetchFormat() === 'json') {
            $this->formedDataAction($id);

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
                    json_decode(json_encode($this->formedDataAction($id)))
                )
            );
        } else {
            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");
        }
    }
}
