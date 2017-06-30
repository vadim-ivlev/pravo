<?php

namespace JuristBundle\Controller;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Mustache_Engine;
use \JuristBundle\Controller\ApiController;

use JuristBundle\Classes\ErrorFabricMethodClasses;

class GenerateSSI1Controller extends Controller
    implements ContainerAwareInterface
{
    protected $connect_to_Jurists_bd, $container;

    private $JsonErrorMessage, $HtmlErrorMessage, $pathToResource, $pathToTmpl, $redis;

    const
        DIRECTORY_SEPARATOR = DIRECTORY_SEPARATOR,
        ARGS_SEPARATOR = '-',
        ALLOW_FORMAT_TMPL = '.html',
        ALLOW_NAME_FILE = 'index',
        TABLE_SEPARATOR = 'AND'
    ;

    /**
     * Регулярка странныхслов, должна быть регистро не зависимая!!
     */
    const BLACK_LIST_CHARACTERS_AND_WORDS = '/select|delete|insert|update|sleep|into|join|having|\slimit|table.?|schema|info|from|\+|--|\(|\)|\||\s/i';

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;

        $this->connect_to_Jurists_bd = $this
            ->getDoctrine()
            ->getManager(ApiController::NAME_BD);

        $this->HtmlErrorMessage = ErrorFabricMethodClasses::initial('HtmlErrorClasses');

        $this->pathToResource = $this->get('kernel')->getRootDir() . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR .
            'src' . DIRECTORY_SEPARATOR . 'JuristBundle' . DIRECTORY_SEPARATOR;// .  'Resources' . DIRECTORY_SEPARATOR;

        $this->redis = $this->container->get('snc_redis.default');
    }

    public function getURISSIAction(Request $request)
    {

        $uri = $request->query->get('uri');
        if (empty($uri))
            return new Response($this->HtmlErrorMessage->generateError('uri not found'));

        return $this->generatePathSSI($uri);
    }

    private function validateUri($uri)
    {
        /**
         * Проверить из конфигов корректность
         * потом сделать mkdir
         * Написать коллоратор запросов
         */
        $appConfiger = $this->get('app.configer');

        $defaultStartUri = $appConfiger->getBy(null, 'generate_SSI', 'args:default_start_uri');

        if (stripos($uri, $defaultStartUri) !== 0) //Если uri не начинается с /include/
            return new Response($this->HtmlErrorMessage->generateError("uri must start with ${$defaultStartUri}"));

        if (!(boolean)preg_match("/\/" . $this::ALLOW_NAME_FILE . $this::ALLOW_FORMAT_TMPL . "$/", $uri)) //Если не оканчивается на index.html
            return new Response($this->HtmlErrorMessage->generateError('uri must end /' . $this::ALLOW_NAME_FILE . $this::ALLOW_FORMAT_TMPL));
        else //Если оканчивается, то удаляем index.html
            $uri = substr($uri, 0, - strlen($this::ALLOW_NAME_FILE . $this::ALLOW_FORMAT_TMPL));

        $args = ltrim($uri, $defaultStartUri); //Удаляем из начала /views/include/

        if($args[strlen($args) - 1] === DIRECTORY_SEPARATOR) //Если последний символ DIRECTORY_SEPARATOR, то удаляем его, так, как потом бьем по сепаратору и он не нужен лишний
            $args = substr($args, 0, -1);

        $args = explode($this::DIRECTORY_SEPARATOR, $args);

        $defaultArgsTmpl = $appConfiger->getBy(null, 'generate_SSI', 'args:default_args_tmpl');

        if (stripos($args[0], $defaultArgsTmpl . $this::ARGS_SEPARATOR) !== 0) //Проверяем, что после /include/ идет имя шаблон
            return new Response($this->HtmlErrorMessage->generateError("incorrect position or name {$defaultArgsTmpl}"));

        $tmpl = explode($this::ARGS_SEPARATOR, $args[0]); //Забрали шаблон из аргументов
        unset($args[0]);

        $tmpl = (isset($tmpl[2]) ? "{$tmpl[1]}-{$tmpl[2]}" : $tmpl[1]);
        if (empty($tmpl))
            return new Response($this->HtmlErrorMessage->generateError('name tmpl is empty'));

        //Проверяем наличие указанного шаблона после tmpl-...
        $this->pathToTmpl = $this->pathToResource . 'Resources' . self::DIRECTORY_SEPARATOR .
            'views' . DIRECTORY_SEPARATOR . 'includeTemplate' . DIRECTORY_SEPARATOR . $tmpl . self::ALLOW_FORMAT_TMPL;
        if (!is_readable($this->pathToTmpl)) //Если нет tmpl
            return new Response($this->HtmlErrorMessage->generateError("tmpl not found or not readble check rules {$this->pathToTmpl}" ));

        /**
         * могут быть
         * 'tags', 'rubrics', 'jurists' И 'order_by', 'limit', 'offset'
         * больше ничего быть не может (если в generate_SSI.yml ничего не поменяли, естественно)
         */
        $allowedArgs = $appConfiger->getBy(null, 'generate_SSI', 'args:allowed_args');
        $tables = $appConfiger->getBy(null, 'generate_SSI', 'args:tables');

        $queryArgs = [];
        foreach ($args as $arg) { //Составляем параметры для запроса, которые указанны
            $arg = explode($this::ARGS_SEPARATOR, $arg);

            try {
                if (array_key_exists($arg[0], $queryArgs)) //Если дубликат
                    return new Response($this->HtmlErrorMessage->generateError("Duplicate param in {$arg[0]}"));
                if ($arg[0] === 'order_by') { //Не разрешенное значение в order_by
                    $declareOrderBy = $appConfiger->getBy(null, 'generate_SSI', 'args:order_by_allow');
                    $defaultOrderByValue = $appConfiger->getBy(null, 'generate_SSI', 'args:order_by_default_value');
                    $defaultOrderBy = $appConfiger->getBy(null, 'generate_SSI', 'args:order_by_default_sort');
                    if(!in_array($arg[1], $declareOrderBy)) {

                        return new Response(
                            $this->HtmlErrorMessage->generateError("invalid value for order_by {$arg[1]}. Use declare: " . implode(' ,', $declareOrderBy) .
                                ' or not use any. When use default value: ' . $defaultOrderByValue)
                        );
                    }

                    $queryArgs[$arg[0]] = $arg[1] . ' ' . $defaultOrderBy;
                } else {
                    $queryArgs[$arg[0]] = $arg[1];
                }
            } catch (\Exception $e) {
                return new Response($this->HtmlErrorMessage->generateError("perhaps incorrect delimiter in {$arg[0]}, try use define delimiter " . $this::ARGS_SEPARATOR ));
            }
        }

        foreach ($allowedArgs as $operatorSQL => $allowedArg) {
            if (!array_key_exists($operatorSQL, $queryArgs)) //Подстановка дефолтных параметров, если нужны
                $queryArgs[$operatorSQL] = $allowedArg;
        }

        $compareUriArrayAndSimple = array_diff_key($queryArgs, $allowedArgs);
        if(!empty($compareUriArrayAndSimple)) { //Проверка на не допустимые параметры
            array_walk($compareUriArrayAndSimple, create_function('&$i,$k','$i=" $k=\"$i\"";'));
            return new Response($this->HtmlErrorMessage->generateError("incorrect parametrs: " .  implode(',', $compareUriArrayAndSimple)));
        }

        $maxLimit = $appConfiger->getBy(null, 'generate_SSI', 'max_limit');
        if($queryArgs['limit'] > $maxLimit)
            $queryArgs['limit'] = $maxLimit;

        $queryConditional = array_diff_key($queryArgs, $tables); // Забираем значения
        $queryTables = array_intersect_key($queryArgs, $tables); // Забираем таблицы

        foreach ($queryTables as $key => &$queryTable) {
            if ($queryTable === 0) {//Если не указали, то удалить
                unset($queryTables[$key]);
            }

            $queryTable = explode(GenerateSSI1Controller::TABLE_SEPARATOR, $queryTable); //Если указанно несколько

            if ($key === 'rubrics' && count($queryTable) > 1) //TODO 
                return new Response($this->HtmlErrorMessage->generateError("Rubrics can`t content more 1 value"));
        }
        unset($queryTable);

        return [
            'conditions' => $queryConditional,
            'tables' => $queryTables
        ];
    }

    private function generatePathSSI($path)
    {
        $ifJSON = strpos($path, "?"); // Проверка, что JSON

        if ((bool)preg_match(GenerateSSI1Controller::BLACK_LIST_CHARACTERS_AND_WORDS, $path)) // Если есть запрещенные слова в запросе
            die;

        if ($ifJSON) { // Если запрос на JSON, то проверяем, что верные параметры в GET
            $isJSON = substr($path, $ifJSON + 1);
            $parseGetQuery = explode("=", $isJSON);
            if ($parseGetQuery[0] === "format" && $parseGetQuery[1] === "json") {
                $returnJSON = true;
                $path = substr($path, 0, -strlen($isJSON) - 1); // Приводим путь к норм виду удаляя GET запрос

                $redis = unserialize($this->redis->get($path)); // Должно быть после, тк пишется в редис с именим без ?format=json

                if (!empty($redis)) {
                    $response = new JsonResponse();
                    $response
                        ->setData([
                            "items_list" => $redis['questions'],
                            "infiniteScroll" => $redis['pagination']
                        ], JSON_UNESCAPED_SLASHES)
                        ->headers->set('Content-Type', 'application/json');
                    return $response;
                }
            }
        }


        $args = $this->validateUri($path);

        if ($args instanceof Response)
            return $args; // Если вернулась ошибка, то ее и возвращаем

        $pathCreate = $path;
        if ($pathCreate[0] === $this::DIRECTORY_SEPARATOR)
            $pathCreate = substr($pathCreate, 1);

        //$pathCreate = $this->pathToResource . /*'public' .*/ $this::DIRECTORY_SEPARATOR . $pathCreate;
        $pathCreate = $this->pathToResource . 'Resources' . $this::DIRECTORY_SEPARATOR . $pathCreate;

        $fabric = new \JuristBundle\Classes\SelectionFabric\SelectionFabricReal($this->connect_to_Jurists_bd, $this->HtmlErrorMessage);
        $fabric = $fabric->assembler($args);

        /**
         * помнить про ограничения рубрик, тегов, юристов
         */
        if ($fabric instanceof Response)
            return $fabric;

        if (isset($returnJSON)) //Если format=json то и возвращаем JSON
            return $this->generateJSON($fabric, $path);

        /**
         * Чтоб нельзя было забить сервак произвольными SSI. Все равно не работает SSI, если когда-то будет нужна
         * такая возможность, тогда и включить
        */
        die;

        // Создать иерархию папок
        $pathCreateHierarchy = substr($pathCreate, 0, - strlen($this::ALLOW_NAME_FILE . $this::ALLOW_FORMAT_TMPL));
        try {
            if (!is_dir($pathCreateHierarchy)) // Если нет директории, то создаем
                if (!mkdir($pathCreateHierarchy, 0775, true)) //mkdir -p /foo/bar/baz/
                    return new Response($this->HtmlErrorMessage->generateError("error create {$pathCreateHierarchy}"));
        } catch (\Exception $e) {
            if($e->getMessage() !== 'Warning: mkdir(): File exists')
                return new Response($this->HtmlErrorMessage->generateError("unknown error: " . $e->getMessage()));
        }

        $tmpl = $this->generateTemplate($path, $this->pathToTmpl, $fabric);

        $savePath = $this->connect_to_Jurists_bd //Записать путь для инвалидации
            ->getRepository('JuristBundle:SsiStoragePath')
            ->savePath(substr($path, 0, - strlen($this::ALLOW_NAME_FILE . $this::ALLOW_FORMAT_TMPL)));
        if(!$savePath) // Если произошла ошибка при сохранение
            return new Response($this->HtmlErrorMessage->generateError("error save uri in BD"));

        return new Response($tmpl);

    }

    private function generateJSON(array $data, $redisName) {
        $data = $this->formedData($data);
        
        $this->redis->setEx(
            $redisName,
            (60 * 5), // Expires на 5 минут
            serialize(
                [
                    'questions' => $data['questions'],
                    'pagination' => $data['pagination'],
                ]
            ));

        $response = new JsonResponse();
        $response
            ->setData([
              "items_list" => $data['questions'],
              "infiniteScroll" => $data['pagination']
              ], JSON_UNESCAPED_SLASHES)
            ->headers->set('Content-Type', 'application/json');
        return $response;
    }

    private function generateTemplate($pathToWrite, $pathTmpl, array $data)
    {

        $data = $this->formedData($data); // Сформировал данные

        $readyTmpl = $this->writeTmpl($pathToWrite, $pathTmpl, $data); // Совместил данные с шаблоном

        return $readyTmpl;
    }

    public function hideTargetCityAndFIOoDBAL(array $arrayRubrics)
    {//скрывает у рубрики СТАТЬИ город и ФИО

        foreach (ApiController::LIST_FOR_HIDE_CITY_AND_FIO as $rubric) {
            foreach ($arrayRubrics as $rubricName) {
                if (!empty($rubricName) && $rubric === $rubricName)
                    return false;
            }
        }

        return true;
    }

    private function formedData($data)
    {
        $result['questions'] = [];

        foreach ($data['query'] as $questionKey => $item) {
            $tags = json_decode($item['tags']);
            if (isset($item['current_rubric']))
                $currentRubric = json_decode($item['current_rubric']);

            $mods = $visibility = [];
            if($item['au_dateEndPay']) // Оплачен ли юрист
                $mods[] = ApiController::NAME_PAY_JURIST;

            if($item['a_typeCards'] === ApiController::TYPE_CARD) // Является ли карточкой
                $mods[] = ApiController::TYPE_CARD;

            $result['questions'][] = [
              "mods" => $mods,
              "visibility" => [
                "visibility__state" => (((bool)$item['au_dateEndPay']) ? "visible" : false), // Оплачен ли юрист
              ],
              "mods__length" => count($mods),
              "visibility__length" => (int)$item['au_dateEndPay'],
              'questions__head' => [
                  [
                      'questions__head__author' => [
                          'questions__head__author__name' => $item['author_name'],
                          'questions__head__author__location' => $item['author_city']
                      ],
                      'questions__head__author__active' => $this->hideTargetCityAndFIOoDBAL([$item['r_name']])
                  ]
              ],
              'questions__list__bibliotechka' => ($questionKey == 2) ? true : false,
              'tags' => $tags,
              'tags__length' => count($tags),
              'link' => ApiController::RUBRICS . ApiController::QUESTIONS . $item['q_id'] .  ApiController::REDIRECT,
              'rubrics' => [
                  [
                      'rubrics__title' =>  $item['r_name'],
                      'rubrics__link' =>  ApiController::RUBRIC . $item['r_CPU_name'] . ApiController::REDIRECT,
                      'rubrics__id' =>  $item['r_id'],
                      'rubrics__FIRST__' =>  1,
                      'rubrics__LAST__' =>  1
                  ]
              ],
              'title' => $item['q_title'],
              'title_seo' => ((!empty($item['q_title_seo'])) ? $item['q_title_seo'] : $item['q_title']),
              'text' => $item['q_description'],
              'keywords' => ((!empty($item['q_keywords_seo'])) ? $item['q_keywords_seo'] : false),
              'jurist' => [
                  'jurist__active' => (((bool)$item['au_disabled'] === (bool)ApiController::DISABLED_VALUE_ON) ? !ApiController::DISABLED_VALUE_ON : ApiController::DISABLED_VALUE_ON),
                  'jurist__first_name' => $item['au_name'],
                  'jurist__last_name' => $item['au_second_name'],
                  'jurist__link' => ApiController::JURIST . $item['au_id'] . ApiController::REDIRECT,
                  'jurist__img' => [
                      [
                          'jurist__img__type_medium' => 1,
                          'jurist__img__file' => "{$item['au_directory']}{$item['au_filename']}",
                          'jurist__img__title' => "{$item['au_name']} {$item['au_second_name']}",
                          'jurist__img__width' => 100,
                          'jurist__img__height' => 100,
                      ]
                  ],
                  'jurist__rate' => [
                      'jurist__rate__reply' => $item['a_rating'],
                      'jurist__rate__author' => $item['au_total_rating']
                  ],
                  'jurist__img__length' => 1,
              ],
              'current_rubric' => ((isset($currentRubric)) ? $currentRubric[0] : false)
            ];
        }

        return array_merge(
            $result,
            [
                'pagination' => $data['pagination']
            ]
        );
    }

    /**
     * @param $pathToWrite - куда записывать готовый ssi
     * @param $pathTmpl - шаблон
     * @param $data - данные для шаблона
     * @return mixed
     */
    private function writeTmpl($pathToWrite, $pathTmpl, $data)
    {

        $m = new Mustache_Engine();

        $result = $m->render(
            @file_get_contents($pathTmpl),
            $data
        );

        //$pathToWrite = $this->pathToResource /*. 'public' . $this::DIRECTORY_SEPARATOR*/ . $pathToWrite;
        $pathToWrite = $this->pathToResource . 'Resources' . $this::DIRECTORY_SEPARATOR . $pathToWrite;
        @file_put_contents($pathToWrite, $result);

        return @file_get_contents($pathToWrite);
    }
}