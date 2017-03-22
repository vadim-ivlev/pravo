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

class ValidateSSIController extends Controller
    implements ContainerAwareInterface
{
    protected $connect_to_Jurists_bd, $container;

    private $pass = '73n20GN7NRGSN0M0A7ggfrfgiwh.43yhfrubrfdrewfnid';

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;

        $this->connect_to_Jurists_bd = $this
            ->getDoctrine()
            ->getManager(ApiController::NAME_BD);
    }

    private function checkAccess($request)
    {
        if (
            $this->container->get('request_stack')->getCurrentRequest()->getClientIp() !== '212.69.111.12'
            || empty($request->request->get('pass'))
            || $request->request->get('pass') !== $this->pass . date('Y-m-d H:i')
        ) throw $this->createNotFoundException();
    }

    public function handlerAction(Request $request) {
        $this->checkAccess($request); // Чтоб запрос только с админки был

        $fabric = new \JuristBundle\Classes\ValidateSSIFabric\ValidateSSIFactory($this->connect_to_Jurists_bd, $this->container);

        /**
         * Вся информация указанная ниже, актуальна на 15.03.17
         * Можно тестить от сюда https://jurist-admin.rg.ru/project/consultation/?r=/validate_ssi/
         * в формочку, вбиваем, например, jurists-1 и отправляем, trim() не прекручивал, так что вбивай без пробелов
         * Отправляется данные на ивалидацию POST-ом сюда https://jurist-admin.rg.ru/project/consultation/?r=/validate_ssi/edit/{id}/save/
         * Путь /var/www/outer/plain/jurist/project/consultation/src/Models/ValidatessiModel.php
         *
         * Допустимые значения, которые приходят из $request->request->get('data');
         *  jurists-id
         *  rubrics-id
         *  questions-id
         *  tags-id
         */
        var_dump($request->request->get('data'));
        //$concreteFabric = $fabric->make($request->request->get('data'));

        if (isset($concreteFabric)) //Если нашелся подходящий фабричный метод
            $concreteFabric->invalidateCache();

        return new Response('Success');
    }
}