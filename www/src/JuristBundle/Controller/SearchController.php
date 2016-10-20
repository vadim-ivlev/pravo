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

use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Class SearchController - Юзается для сфинкса
 * @package JuristBundle\Controller
 */
class SearchController extends ApiController
{

    const VALUE_HEADERS = [
        1 => 'AuthUsers',
        2 => 'Questions',
    ];

    private function emptyQueryAction($message)
    {
        return $this->result['empty_search'] = $message;
    }

    public function formedDataAction ($request, $pagination)
    {
        $query = urldecode(trim($request->query->get('query')));
        $headerIndexer = $request->query->get('search'); //Передается по какому идексу искать

        $this->HeaderAction(self::TABS_MAIN);

        $this->SidebarAction('json');

        $this->getDate();


        if (!$query) return $this->emptyQueryAction("Задан пустой поисковый запрос. <a class='b-link b-link_blue' href='/'>Вернуться на главную</a>"); //Если пустой результат

        $indexerName = self::VALUE_HEADERS[$headerIndexer];
        $offset = $pagination-1; //Потому что страница 1, а offset при этом 0

        if (empty($query) || !(array_key_exists($headerIndexer, self::VALUE_HEADERS))) { //Проверка, что есть get запрос и валидный запрос поиска indexer
            throw new HttpException(400, "No data");
        } elseif ($offset < 0 || !ctype_digit($pagination)) {//TODO и если больше максимума то тоже
            $this->pageNotFound(true);
        }


        $sphinx = $this->get('iakumai.sphinxsearch.search');

        $resultSphinx = $sphinx->search($request->query->get('query'), array($indexerName));

        if (isset($resultSphinx['matches'])) {

            $aliasEntity = $indexerName[0];

            $allResults = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:' . self::VALUE_HEADERS[$headerIndexer])
                ->createQueryBuilder($aliasEntity)
                ->select("COUNT({$aliasEntity}.id)")
                ->where($aliasEntity . '.id  IN(:id)')
                ->setParameters(['id' => array_keys($resultSphinx['matches'])])
                ->getQuery()
                ->getSingleScalarResult();

            if ($allResults < ($offset * self::COUNT_RECORDS_ON_PAGE_JURISTS)) return $this->pageNotFound(true);

            $results = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:' . self::VALUE_HEADERS[$headerIndexer])
                ->createQueryBuilder($aliasEntity)
                ->where($aliasEntity . '.id  IN(:id)')
                ->setParameters(['id' => array_keys($resultSphinx['matches'])])
                ->setFirstResult($offset * self::COUNT_RECORDS_ON_PAGE_JURISTS) //offset
                ->setMaxResults(self::COUNT_RECORDS_ON_PAGE_JURISTS) //limit
                ->getQuery()
                ->execute();

            $this->{"{$indexerName}Action"}($results, "{$indexerName}_list", $offset);

            $all_get = $request->query->all();

            array_walk(
                $all_get,
                function(&$value, $key) use (&$resultGetQuery) {
                    $resultGetQuery .= ((!$resultGetQuery) ? '?' : '&') . "{$key}=" . urlencode($value);
                }
            );

            $this->PaginationAction($allResults, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS, $pagination, '/search/', 1, '', $resultGetQuery);

        } else {
            $this->emptyQueryAction("Ваш запрос '{$query}' не дал результатов. <a class='b-link b-link_blue' href='/'>Вернуться на главную</a>");
        }


    }

    /**
     * Метод используется, просто вызывается динамически $this->{"{$indexerName}Action"}($results, "{$indexerName}_list", $offset);
     * @param $data - данные результатов поиска
     * @param $nameJson
     */
    private function QuestionsAction($data, $nameJson, $pagination)
    {
        foreach ($data as $dataKey => $dataVal) {
            $date = $dataVal->getDate();
            $date = $date->format('Y-m-d H:i');

            $this->result[$nameJson][] = [
                'link' => "/rubrics/question/{$dataVal->getId()}/",
                'title' => htmlspecialchars($dataVal->getTitle()),
                'text' => htmlspecialchars($dataVal->getDescription()),
                'date' => $date,
                'value' => ($pagination * self::COUNT_RECORDS_ON_PAGE_JURISTS) + $dataKey+1
            ];
        }
    }

    /**
     * Метод используется, просто вызывается динамически $this->{"{$indexerName}Action"}($results, "{$indexerName}_list", $offset);
     * @param $data
     * @param $nameJson
     * @param $pagination
     */
    private function AuthUsersAction($data, $nameJson, $pagination)
    {
        foreach ($data as $dataKey => $dataVal) {
            $this->result[$nameJson][] = [
                'jurist__first_name' => htmlspecialchars($dataVal->getName()),
                'jurist__link' => "/jurist/{$dataVal->getId()}/",
                'jurist__last_name' => $dataVal->getSecondName(),
                'jurist__patronymic' => $dataVal->getPatronymic(),
                'jurist__img' => [$this->fetchAvatar($dataVal, $dataVal)],
                'jurist__total__rating' => $dataVal->getTotalRating(),
                'value' => ($pagination * self::COUNT_RECORDS_ON_PAGE_JURISTS) + $dataKey+1
            ];
        }
    }

    public function SearchAction($pageVal = 0, Request $request) 
    {

        if ($this->fetchFormat() === 'json') {

            $this->formedDataAction($request, $pageVal);

            $response = new JsonResponse();
            $response
                ->setData($this->result, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;

        } elseif ($this->fetchFormat() === 'html') {

            $m = new Mustache_Engine();

            $this->formedDataAction($request, $pageVal);

            return new Response($m->render(@file_get_contents(dirname(__FILE__) . '/../Resources/views/search.html'), json_decode(json_encode($this->result))));

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}