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

class JuristsController extends ApiController
{
    const RUBRICS_CONDITION_NAME = 'rubrics_conditions';

    public function formedDataAction ($id, $limit_pagination, $where_rubric = 0)
    {
        $request = Request::createFromGlobals();
        $rubrics_conditions_get = $request->query->get('rubrics_conditions');

        //dump($rubrics_conditions_get);die;
        $rubrics_conditions = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Rubrics')
            ->findBy([]);
        $this->result['rubrics__conditions'][] = [
            'rubrics__conditions__current_id' => (empty($rubrics_conditions)) ? 'selected' : false,
            'rubrics__conditions__id' => 0,
            'rubrics__conditions__url' => '/jurists/jurists/1/html/0/',
            'rubrics__conditions__name' => 'Любая',
        ];
        //dump($id);die;
        foreach ($rubrics_conditions as $rubrics_condition ){
            $this->result['rubrics__conditions'][] = [
                'rubrics__conditions__current_id' => (!empty($rubrics_conditions) && $rubrics_conditions_get == $rubrics_condition->getId()) ? 'selected' : false,
                'rubrics__conditions__id' => $rubrics_condition->getId(),
                'rubrics__conditions__url' => '/jurists/jurists/1/html/0/?' . self::RUBRICS_CONDITION_NAME . '=' . $rubrics_condition->getId(),
                'rubrics__conditions__name' => $rubrics_condition->getName(),
            ];
        }
        //$request = Request::createFromGlobals();

        $request = Request::createFromGlobals();
        $requestsOrderBy = $request->query->get('order_by');

            switch ($requestsOrderBy) {
                case 'rating':
                    $orderBy = [
                        'c.name',
                        'asc'
                    ];
                break;
                case 'company':
                    $orderBy = [
                        'c.name',
                        'desc'
                    ];
                break;
                default:
                    $orderBy = [
                        'j.secondName',
                        'asc'
                    ];
            }
        //dump($requestsOrderBy);die;

        if ( !empty($request->query->get(self::RUBRICS_CONDITION_NAME)) ) {//TODO переделать
        $Jurists = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:AuthUsers')
            ->createQueryBuilder('j')
            /*->select('j')
            ->addSelect('
                 (select sum(a.rating) as total_rating
                  from JuristBundle:AuthUsers aus
                  join JuristBundle:Answers an
                      WITH an.authUsersId = aus.id
                      where aus.id = j.id
                  group by aus.id
                 ) as total_ratings'
                )*/
            ->setFirstResult($limit_pagination)//offset
            ->setMaxResults(self::COUNT_RECORDS_ON_PAGE_JURISTS)//limit
            ->join('j.rubrics', 'r')
            //->join('JuristBundle:Companies', 'c', \Doctrine\ORM\Query\Expr\Join::WITH, 'c.id = j.companiesId')
            ->join('JuristBundle:Companies', 'c')
            //->leftJoin('JuristBundle:Answers', 'a', \Doctrine\ORM\Query\Expr\Join::WITH, 'a.authUsersId = j.id')
            ->where('j.disabled = :disabled')
            //->andWhere('a.authUsersId = j.id')
            ->andWhere('j.isJurist = :isJurist')
            ->andWhere('j.id != :id')
            ->andWhere('c.id = j.companiesId')
            ->andWhere('r.id  = ' . $request->query->get(self::RUBRICS_CONDITION_NAME, ''))
            //->andWhere('c.id = j.companiesId')
            ->setParameters(array('disabled' => false, 'isJurist' => true, 'id' => self::ID_USER_WITHOUT_AVATARS))
            //->orderBy($orderBy[0], $orderBy[1])
            ->orderBy('j.secondName', 'asc')
            //->orderBy('a.id', 'asc')
            ->getQuery()
            ->execute();

            //dump($Jurists);die;
            //dump($Jurists);die;
            $AllJurist = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->createQueryBuilder('j')
                ->join('j.rubrics', 'r')
                ->where('j.disabled = false')
                ->andWhere('j.isJurist = true')
                ->andWhere('r.id  = ' . $request->query->get(self::RUBRICS_CONDITION_NAME, ''))
                ->andWhere('j.id != ' . self::ID_USER_WITHOUT_AVATARS)
                ->orderBy('j.secondName', 'ASC')
                ->getQuery()
                ->execute();
        } else {
            $Jurists = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->createQueryBuilder('j')
                /*->select('*')
                ->addSelect('
                 (select sum(a.rating) as total_rating
                  from auth_users aus
                  join answers a
                      on a.auth_users_id = aus.id
                      where aus.id = au.id
                  group by aus.id
                  order by total_rating desc limit 1
                 ) as total_rating'
                )*/
                ->setFirstResult($limit_pagination)//offset
                ->setMaxResults(self::COUNT_RECORDS_ON_PAGE_JURISTS)//limit
                ->join('JuristBundle:Companies', 'c')
                //->leftJoin('JuristBundle:Answers', 'a')
                ->where('j.disabled = :disabled')
                ->andWhere('j.isJurist = :isJurist')
                ->andWhere('j.id != :id')
                ->andWhere('c.id = j.companiesId')
                //->andWhere('a.authUsersId = j.id')
                ->setParameters(array('disabled' => false, 'isJurist' => true, 'id' => self::ID_USER_WITHOUT_AVATARS))
                //->orderBy($orderBy[0], $orderBy[1])
                ->orderBy('j.secondName', 'asc')
                ->getQuery()
                ->execute();
            $AllJurist = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->createQueryBuilder('j')
                ->where('j.disabled = false')
                ->andWhere('j.isJurist = true')
                ->andWhere('j.id != ' . self::ID_USER_WITHOUT_AVATARS)
                ->orderBy('j.secondName', 'ASC')
                ->getQuery()
                ->execute();
        }

        $pagination = [];

        foreach ($Jurists as $Jurist) {
            if ($Jurist->getDisabled() === self::DISABLED_VALUE_ON /*&& $Jurist->getIsJurist() == true && $Jurist->getId() != self::ID_USER_WITHOUT_AVATARS*/){
                $rubrics = [];
                foreach ($Jurist->getRubrics()->toArray() as $rubric) {
                    $rubrics[] = [
                        'rubrics__title' => $rubric->getName(),
                        'rubrics__link' => self::RUBRICS . $rubric->getId() . /*'/' . self::FORMAT . */self::REDIRECT,
                    ];
                }
                $this->result['jurists_list'][] =
                    [
                        'mods' => 'list',
                        'jurist__img' => [$this->fetchAvatar($Jurist, $Jurist)],
                        'jurist__first_name' => $Jurist->getName(),
                        'jurist__link' => self::JURIST . $Jurist->getId() . '/' . self::FORMAT . self::REDIRECT,
                        'jurist__last_name' => $Jurist->getSecondName(),
                        'jurist__patronymic' => $Jurist->getPatronymic(),
                        'jurist__education' => $Jurist->getGraduate(),
                        'rubrics' => $rubrics,
                        'jurist__company' => (!empty($Jurist->getCompaniesId())) ? $Jurist->getCompaniesId()->getName() : '',
                        'jurist__rate' => [
                            'jurist__rate__author' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()),//общий рейтинг
                        ],
                        'jurist__consultations' => $this->getCountConsultation($Jurist->getId()),
                        'jurist__id' => $Jurist->getId(),
                    ];

                $pagination[] = $Jurist->getId();
            }
        }
        foreach ($this->result['jurists_list'] as &$val) {
            $val['jurist__education__length'] =  (strlen($val['jurist__education']) > 0) ? 1 : 0;
            $val['jurist__company__length'] =  (strlen($val['jurist__company']) > 0) ? 1 : 0;
            $val['mods__length'] = count($val['mods']);
            $val['rubrics__length'] = count($val['rubrics']);
            $this->generateFirstLast($val['rubrics']);
        }
        unset($val);

        if ($request->query->get(self::RUBRICS_CONDITION_NAME)) {
            $get_string = '?' . self::RUBRICS_CONDITION_NAME . '=' . (int)$request->query->get(self::RUBRICS_CONDITION_NAME);
        } else {
            $get_string = '';
        }

        $this->PaginationAction(
            $AllJurist, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS,
            $id, 'https://front.rg.ru/jurists/jurists/', 1, '', $get_string
        );
        /**
         * array $query, $count_numeric_page, $count_records_on_page,
        $current_page, $link, $firstPage = 1, $condition_id = ''
         */

        $this->HeaderAction(self::TABS_JURIST);

        $this->SidebarAction('json');

        $this->getDate();

        return $this->result;
    }

    public function JuristsAction ($id = null, $format = self::FORMAT, $limit_pagination = 0)
    {
        if ($format === 'json') {//app_dev.php/jurists/jurists/1/json/

            $this->formedDataAction($id, $limit_pagination);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($format === 'html') {
            
            /*$request = Request::createFromGlobals();
            $requests = $request->query->get('rubric_id');
            if ($requests && $requests != 0) {
                dump($requests);die;
            }*/
            $m = new Mustache_Engine();

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/users.html'), json_decode(json_encode($this->formedDataAction($id, $limit_pagination)))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}
