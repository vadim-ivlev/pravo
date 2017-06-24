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

        $nameRedisNow = "PravoJurists(id:${id}/uri:'" . $request->getUri() . "')";

        $redis = $this->redis->get($nameRedisNow);

        $redis = unserialize($redis);

        if ($redis) {
            $this->result = $redis;
        } else {

            $rubricsConditionsGet = $request->query->get('rubrics_conditions'); //Сортировка по специализации
            $filtersForJuristGet = $request->query->get('order_by'); //Сортировка по рейтинг/алфавит/компания

            $rubricsСonditions = $this->connect_to_Jurists_bd//Получаем рубрики для селекта Сonditions
            ->getRepository('JuristBundle:Rubrics')
                ->findBy([]);

            $this->result['rubrics__conditions'][] = [ //Получаем рубрики для селекта (хардкодим Любая специализация)
                'rubrics__conditions__current_id' => (empty($rubricsСonditions)) ? 'selected' : false,
                'rubrics__conditions__id' => 0,
                'rubrics__conditions__name' => 'Любая специализация',
            ];

            foreach ($rubricsСonditions as $rubricsСondition) { //Формируем рубрики для селекта
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

            $requestsOrderBy = $request->query->get('order_by');

            switch ($requestsOrderBy) {
                case 'rating':
                    $orderBy = [
                        'au.total_rating desc'
                    ];
                    break;
                case 'company':
                    $orderBy = [
                        'c.name asc'
                    ];
                    break;
                default:
                    $orderBy = [
                        'au.second_name asc'
                    ];
            }

            $AllJurist = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->createQueryBuilder('j')
                ->select('COUNT(DISTINCT j.id)')
                ->join('j.rubrics', 'r')
                ->where('j.disabled = false')
                ->andWhere('j.isJurist = true')
                ->andWhere('j.id != ' . self::ID_USER_WITHOUT_AVATARS);

            if (!empty($request->query->get(self::RUBRICS_CONDITION_NAME))) {
                $Jurists = $this->connect_to_Jurists_bd//Получаем рубрики для селекта Сonditions
                ->getRepository('JuristBundle:AuthUsers')
                    ->fetchJurists(
                        $orderBy,
                        [
                            [
                                'field_condition' => 'AND r1.id = ',
                                'field_oDBAL' => ':r_id',
                                'value' => $request->query->get(self::RUBRICS_CONDITION_NAME),
                            ]
                        ],
                        $limitPagination
                    );

                $AllJurist = $AllJurist->andWhere('r.id  = ' . $request->query->get(self::RUBRICS_CONDITION_NAME));
            } else {
                $Jurists = $this->connect_to_Jurists_bd //Получаем рубрики для селекта Сonditions
                ->getRepository('JuristBundle:AuthUsers')
                    ->fetchJurists($orderBy, [], $limitPagination);
            }
//                if ($_SERVER['REMOTE_ADDR'] === '212.69.111.131') {
//                    dump($Jurists);die;
//                }
            $AllJurist = $AllJurist
                ->getQuery()
                ->getSingleScalarResult();


            $this->formedJuristsoDBAL($Jurists);

            $this->pageNotFound(!isset($this->result['jurists_list']));

            $this->PaginationAction(
                $AllJurist, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS,
                $id, '/jurists/', 1, '', $this->ProcessingRequestForPaginationAction()
            );


            if (isset($nameRedisNow) && $this->AllowParamGet($request)) {
                $this->redis->setEx(
                    $nameRedisNow,
                    (60 * 30), //Expires на 30 мин
                    serialize(
                        [
                            'pagination' => $this->result['pagination'],
                            'jurists_list' => $this->result['jurists_list'],
                            'filters__for__jurists' => $this->result['filters__for__jurists'],
                            'rubrics__conditions' => $this->result['rubrics__conditions']
                        ]
                    )
                );
            }

        }

        $this->HeaderAction(self::TABS_JURIST);

        $this->SidebarAction('json');

        $this->getDate();

        $this->result['canonical'] = 'https://pravo.rg.ru/jurists/1/';

        return $this->result;
    }

    private function AllowParamGet($request)
    { //Служит для определения, разрешенн ли GET запрос. Ибо пишется url целиком в редис и можно вальнуть его большим количеством запросов

        if(is_array($request->query->all()) && empty($request->query->all())) return true; //Если нет никаких GET

        $allows = [ //Формируем список разрешений
            'order_by' => [
                'alphabet', 'rating', 'company'
            ],
            'rubrics_conditions' => [],
        ];

        if (!empty(array_diff_key($request->query->all(), $allows))) return false; //Если ключи не совпадают (есть лишний ключ в get запросе, например https://pravo.rg.ru/app_dev.php/jurists/12/?order_by=alphabet&rubrics_conditions=3&something=123)

        $rubrics = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Rubrics')
            ->findBy([]);

        foreach ($rubrics as $rubric) { //Заполяем всеми возможными id
            $allows['rubrics_conditions'][] = $rubric->getId();
        }

        foreach ($request->query->all() as $queryKey => $queryVal) {
            if (!in_array($queryVal, $allows[$queryKey])) return false; //Проверяем, есть ли в @var $allows значение из $request->query->all(), если нет, то возвращаем false, чтоб не писать в кеш
        }

        return true;

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
