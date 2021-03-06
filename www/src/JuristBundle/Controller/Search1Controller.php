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
class Search1Controller extends ApiController
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
        } elseif ($offset < 0 || !ctype_digit($pagination)) {
            $this->pageNotFound(true);
        }


        $this->sphinx = $this->get('iakumai.sphinxsearch.search');

        /*if ($_SERVER['REMOTE_ADDR'] == '212.69.111.131') { //TODO для сортировки
            dump($this->sphinx->getClient()->SetSortMode(SPH_SORT_RELEVANCE));
        }*/

        $resultSphinx = $this->sphinx->search($request->query->get('query'), array($indexerName));

        if (isset($resultSphinx['matches'])) {

            $aliasEntity = $indexerName[0];

            $allResults = $this->connect_to_Jurists_bd //Выборка для пагинации
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

            $this->{"{$indexerName}Action"}($results, $indexerName, $request->query->get('query')); //Динамическое обращение к классу, который сформирует данные для Mustache. Имя класса, например, QuestionsAction

            $allGet = $request->query->all(); //Получение всех GET запросов

            array_walk( //Формирование всех GET запросов для следующий странице в пагинации
                $allGet,
                function(&$value, $key) use (&$resultGetQuery) {
                    $resultGetQuery .= ((!$resultGetQuery) ? '?' : '&') . "{$key}=" . urlencode($value);
                }
            );

            $this->PaginationAction($allResults, self::PAGINATION_FOR_JURISTS, self::COUNT_RECORDS_ON_PAGE_JURISTS, $pagination, '/search1/', 1, '', $resultGetQuery);

        } else {
            $this->emptyQueryAction("Ваш запрос '" . htmlspecialchars($query) . "' не дал результатов. <a class='b-link b-link_blue' href='/'>Вернуться на главную</a>"); //htmlspecialchars - если в поиске ввели что-то типа <div чтоб его экранировать
        }


    }

    /**
     * Класс для подсветки найденных слов
     * @param array $queryResults - результат запроса к сфинксу
     * @param $indexerName - имя сфнкс индекса
     * @param $query - запрос к сфинксу на поиск, например "авто"
     * @param array $options - options http://php.net/manual/ru/sphinxclient.buildexcerpts.php
     */
    private function WordsLightsAction(
        $queryResults, $indexerName, $query,
        array $options = [
            'before_match'      => '<span class="b-search-results__sphinx_search">',
            'after_match'       => '</span>',
            //'chunk_separator'   => ' ',
            'exact_phrase'      => true,
            'limit'             => 512,
            //'around'            => 10
        ]
    )
    {
        if (!is_array($queryResults)) $queryResults = [$queryResults]; //Нужно для сфинкса, чтоб был массив
        //$queryResults = $this->sphinx->getClient()->BuildExcerpts($queryResults, $indexerName, "*{$query}*", $options);
        //$queryResults[0] = htmlspecialchars($queryResults[0]); //Костыль, ибо надо искать по *$query* и по самому $query, так $query без зведочек он ищет по корням

        $queryResults = $this->sphinx->getClient()->BuildExcerpts($queryResults, $indexerName, "{$query}", $options);

        return $queryResults[0];
    }

    /**
     * Формирует подсветку в модулях formedJurists И formedQuestions найденых слов
     * @param $results
     * @param array $dataForChanges
     * @param $indexerName
     * @param $getQuery
     * @return bool
     */
    private function FormLightFromOld(&$results, array $dataForChanges, $indexerName, $getQuery)
    {
        if (empty($dataForChanges) || empty($indexerName) || empty($getQuery)) return false;


        foreach ($results as &$result) {
            array_map(function(&$dataForChange) use (&$result, $indexerName, $getQuery) {
                if(isset($result[$dataForChange])) $result[$dataForChange] = $this->WordsLightsAction($result[$dataForChange], $indexerName, $getQuery);
            }, $dataForChanges);
        }
        unset($result, $results, $dataForChange);

    }

    /**
     * Метод используется, просто вызывается динамически $this->{"{$indexerName}Action"}($results, "{$indexerName}_list", $offset);
     * @param $data
     * @param $indexerName
     * @param $getQuery
     * @throws \Exception
     */
    private function QuestionsAction($data, $indexerName, $getQuery)
    {
        $this->formedQuestions($data);
        $questionsList = 'questions_list';

        if (!isset($this->result[$questionsList])) throw new \Exception("Отсутствует {$questionsList}");
        $valForCheck = ['title', 'text']; //Поле которые должны быть проверенны на совпадение с запросом и в случае успеха подсвечины

        $this->FormLightFromOld($this->result['questions_list'], $valForCheck, $indexerName, $getQuery);
    }

    /**
     * Метод используется, просто вызывается динамически $this->{"{$indexerName}Action"}($results, "{$indexerName}_list", $offset);
     * @param $data
     * @param $indexerName
     * @param $getQuery
     * @throws \Exception
     */
    private function AuthUsersAction($data, $indexerName, $getQuery)
    {
        $this->formedJurists($data);
        $juristList = 'jurists_list';

        if (!isset($this->result[$juristList])) throw new \Exception("Отсутствует {$juristList}");
        $valForCheck = ['jurist__first_name', 'jurist__last_name', 'jurist__patronymic', 'jurist__company']; //Поле которые должны быть проверенны на совпадение с запросом и в случае успеха подсвечины

        $this->FormLightFromOld($this->result['jurists_list'], $valForCheck, $indexerName, $getQuery);

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

            return new Response(
                $m->render(
                    @file_get_contents(dirname(__FILE__) . '/../Resources/views/search1.html'),
                    json_decode(json_encode($this->result))
                )
            );

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }
}