<?php

namespace JuristBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use JuristBundle\Classes\ErrorFabricMethodClasses;

class GenerateSSIController extends Controller
    implements ContainerAwareInterface
{
    protected $connect_to_Jurists_bd, $container;

    private $JsonErrorMessage, $HtmlErrorMessage, $pathToResource;

    const
        DIRECTORY_SEPARATOR = DIRECTORY_SEPARATOR,
        ARGS_SEPARATOR = '-',
        ALLOW_FORMAT_TMPL = '.html';

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;

        $this->connect_to_Jurists_bd = $this
            ->getDoctrine()
            ->getManager(ApiController::NAME_BD);

        $this->HtmlErrorMessage = ErrorFabricMethodClasses::initial('HtmlErrorClasses');

        $this->pathToResource = $this->get('kernel')->getRootDir() . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR .
            'src' . DIRECTORY_SEPARATOR . 'JuristBundle' . DIRECTORY_SEPARATOR .  'Resources' . DIRECTORY_SEPARATOR;
    }

    public function getURISSIAction(Request $request)
    {
        $uri = $request->query->get('uri');
        if (empty($uri)) {
            #$response = new JsonResponse();
            #$response
            #    ->setData($this->HtmlErrorMessage->generateError('uri not found'), JSON_UNESCAPED_SLASHES)
            #    ->headers->set('Content-Type', 'application/json');

            return new Response($this->HtmlErrorMessage->generateError('uri not found'));
        }

        /**TODO должен быть другой класс, который генерит Q, R, T, U и удаляет их по конфигу
         * Тут создаем по заданной из конфигов SSI */

        /**
         * Про этот класс
         * generatePathSSI - генерирует путь
         * generatePathSSI - отдает путь, куда собирать ssi- createSSI
         */
        return $this->generatePathSSI($uri);
//        return new Response($data);
//        return new Response('<div style="margin-left: 20px; width: 100px; height: 20px; border: 1px solid red">123</div>');
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
            return new Response($this->HtmlErrorMessage->generateError('uri must start with /include/'));

        $args = ltrim($uri, $defaultStartUri); //Удаляем из начала /include/

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

        $pathToTmpl = $this->pathToResource . 'views' . DIRECTORY_SEPARATOR . $tmpl . GenerateSSIController::ALLOW_FORMAT_TMPL;
        if (!is_readable($pathToTmpl)) //Если нет tmpl
            return new Response($this->HtmlErrorMessage->generateError("tmpl not found or not readble check rules {$pathToTmpl}" ));

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
            if ($queryTable == 0) //Если не указали, то удалить
                unset($queryTables[$key]);

            $queryTable = explode('_', $queryTable); //Если указанно несколько
        }
        unset($queryTable);

        return [
            'conditions' => $queryConditional,
            'tables' => $queryTables
        ];
    }

    private function generatePathSSI($path)
    {
//        $pathToInclude =
//            $this->get('kernel')->getRootDir() . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR .
//            'JuristBundle' . DIRECTORY_SEPARATOR . 'Resources' . DIRECTORY_SEPARATOR . 'public' /*. DIRECTORY_SEPARATOR . 'include' . DIRECTORY_SEPARATOR*/;

        $args = $this->validateUri($path);

        if ($args instanceof Response)
            return $args; // Если вернулась ошибка, то ее и возвращаем

        $pathCreate = $path;
        if ($pathCreate[0] === $this::DIRECTORY_SEPARATOR)
            $pathCreate = substr($pathCreate, 1);

        //$mkdir = mkdir($this->pathToResource . $pathCreate, 0755, true);
        dump($this->pathToResource . $pathCreate);
        dump($args);
        return new Response('');

        //$exec = `ls $pathToInclude`;
        //$mkdir = mkdir($pathToInclude . $path, 0755, true);
        //dump($exec);
        //$directoryItem = explode($this::DIRECTORY_SEPARATOR, $path);
        //dump($directoryItem);
        die;
    }

    private function createSSI()
    {
        //Тут сохранить в MySQL
    }
}