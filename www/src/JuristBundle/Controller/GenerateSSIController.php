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

    private $JsonErrorMessage, $HtmlErrorMessage;

    const
        DIRECTORY_SEPARATOR = DIRECTORY_SEPARATOR,
        ARGS_SEPARATOR = '-';

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;

        $this->connect_to_Jurists_bd = $this
            ->getDoctrine()
            ->getManager(ApiController::NAME_BD);

        $this->HtmlErrorMessage = ErrorFabricMethodClasses::initial('HtmlErrorClasses');
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
        $data = $this->generatePathSSI($uri);
        return new Response('<div style="margin-left: 20px; width: 100px; height: 20px; border: 1px solid red">123</div>');
    }

    private function generatePathSSI($path)
    {
        $pathToInclude =
            $this->get('kernel')->getRootDir() . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR .
            'JuristBundle' . DIRECTORY_SEPARATOR . 'Resources' . DIRECTORY_SEPARATOR . 'public' /*. DIRECTORY_SEPARATOR . 'include' . DIRECTORY_SEPARATOR*/;

        /**
         * Проверить из конфигов корректность
         * потом сделать mkdir
         */

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