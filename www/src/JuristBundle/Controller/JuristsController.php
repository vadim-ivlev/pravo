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

    /**
     * @param $id - page number. I`m sorry :/
     * @param $limitPagination - offset. And so - i`m sorry :/
     * @return mixed
     */
    public function formedDataAction ($id, $limitPagination)
    {
        $request = Request::createFromGlobals();
        $rubricsConditionsGet = $request->query->get('rubrics_conditions'); //Сортировка по специализации
        $filtersForJuristGet = $request->query->get('order_by'); //Сортировка по рейтинг/алфавит/компания

        $rubricsСonditions = $this->connect_to_Jurists_bd //Получаем рубрики для селекта Сonditions
            ->getRepository('JuristBundle:Rubrics')
            ->findBy([]);

        $this->result['rubrics__conditions'][] = [ //Получаем рубрики для селекта (хардкодим Любая специализация)
            'rubrics__conditions__current_id' => (empty($rubricsСonditions)) ? 'selected' : false,
            'rubrics__conditions__id' => 0,
            'rubrics__conditions__name' => 'Любая специализация',
        ];

        foreach ($rubricsСonditions as $rubricsСondition ){ //Формируем рубрики для селекта
            $this->result['rubrics__conditions'][] = [
                'rubrics__conditions__current_id' => (!empty($rubricsСonditions) && $rubricsConditionsGet == $rubricsСondition->getId()) ? 'selected' : false,
                'rubrics__conditions__id' => $rubricsСondition->getId(),
                'rubrics__conditions__name' => $rubricsСondition->getName(),
            ];
        }

        foreach ($this->filtersForJurists as $filtersForJuristKey => $filtersForJuristVal) { //Получаем фильтры для селекта
            $this->result['filters__for__jurists'][] = [
                'filters__for__jurists__values' => $filtersForJuristKey,
                'filters__for__jurists__name' => $filtersForJuristVal,
                'filters__for__jurists__current' => ($filtersForJuristGet == $filtersForJuristKey) ? 'selected' : false,
            ];
        }

        $request = Request::createFromGlobals();
        $requestsOrderBy = $request->query->get('order_by');

        switch ($requestsOrderBy) {
            case 'rating':
                $orderBy = [
                    'j.totalRating',
                    'desc'
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

        $this->HeaderAction(self::TABS_JURIST);

        $this->SidebarAction('json');

        $this->getDate();

        if (!$request->query->get(self::RUBRICS_CONDITION_NAME) && !$request->query->get('order_by')) { //Пока кешируется без любых сортировок

            $nameRedisNow = "PravoJuristsPage(${id})".str_replace(' ', '-', date('Y-m-d H')); //PravoJuristsPage(numberPage)2016-10-18-03 такой вид, каждый час

            $redisNow = $this->redis->get($nameRedisNow);

            $redisUnserialize = unserialize($redisNow); //Так надо из-за мусташа

            if ($redisNow) {

                $this->result['pagination'] =  $redisUnserialize['pagination'];
                $this->result['jurists_list'] =  $redisUnserialize['jurists_list'];

                return $this->result;
            }
        }

        if (!empty($request->query->get(self::RUBRICS_CONDITION_NAME))) { //TODO переделать

            $Jurists = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->createQueryBuilder('j')
                ->setFirstResult($limitPagination) //Offset
                ->setMaxResults(self::COUNT_RECORDS_ON_PAGE_JURISTS) //Limit
                ->join('j.rubrics', 'r')
                ->join('JuristBundle:Companies', 'c')
                ->where('j.disabled = :disabled')
                ->andWhere('j.isJurist = :isJurist')
                ->andWhere('j.id != :id')
                ->andWhere('c.id = j.companiesId')
                ->andWhere('r.id  = ' . $request->query->get(self::RUBRICS_CONDITION_NAME))
                ->setParameters(array('disabled' => false, 'isJurist' => true, 'id' => self::ID_USER_WITHOUT_AVATARS))
                ->orderBy($orderBy[0], $orderBy[1])
                ->getQuery()
                ->execute();

            $AllJurist = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->createQueryBuilder('j')
                ->join('j.rubrics', 'r')
                ->where('j.disabled = false')
                ->andWhere('j.isJurist = true')
                ->andWhere('r.id  = ' . $request->query->get(self::RUBRICS_CONDITION_NAME))
                ->andWhere('j.id != ' . self::ID_USER_WITHOUT_AVATARS)
                ->orderBy('j.secondName', 'ASC')
                ->getQuery()
                ->execute();
        } else {

            $Jurists = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->createQueryBuilder('j')
                ->setFirstResult($limitPagination) //Offset
                ->setMaxResults(self::COUNT_RECORDS_ON_PAGE_JURISTS) //Limit
                ->join('JuristBundle:Companies', 'c')
                ->where('j.disabled = :disabled')
                ->andWhere('j.isJurist = :isJurist')
                ->andWhere('j.id != :id')
                ->andWhere('c.id = j.companiesId')
                ->setParameters(array('disabled' => false, 'isJurist' => true, 'id' => self::ID_USER_WITHOUT_AVATARS))
                ->orderBy($orderBy[0], $orderBy[1])
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

        $this->formedJurists($Jurists);

        $this->pageNotFound(!isset($this->result['jurists_list']));

        $this->PaginationAction(
            $AllJurist, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS,
            $id, '/jurists/', 1, '', $this->ProcessingRequestForPaginationAction()
        );

        if (isset($nameRedisNow)) {
            $this->redis->setEx(
                $nameRedisNow,
                (60 * 60), //Expires на 1 час
                serialize(
                    [
                        'pagination' => $this->result['pagination'],
                        'jurists_list' => $this->result['jurists_list']
                    ]
                )
            );
        }

        return $this->result;
    }

    /**
     * @param null $id - pageNumber номер страницы в пагинации
     * @return JsonResponse|Response
     */
    public function JuristsAction ($id = null)
    {
        $limitPagination = $this->generateOffsetPagination($id); //Образуем offset

        if ($this->fetchFormat() === 'json') {
            
            $this->formedDataAction($id, $limitPagination);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/users.html'), json_decode(json_encode($this->formedDataAction($id, $limitPagination)))
                )
            );

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}
