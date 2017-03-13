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

//        $this->HtmlErrorMessage = ErrorFabricMethodClasses::initial('HtmlErrorClasses');
//
//        $this->pathToResource = $this->get('kernel')->getRootDir() . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR .
//            'src' . DIRECTORY_SEPARATOR . 'JuristBundle' . DIRECTORY_SEPARATOR .  'Resources' . DIRECTORY_SEPARATOR;
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
        //$this->checkAccess($request);

        $fabric = new \JuristBundle\Classes\ValidateSSIFabric\ValidateSSIFactory($this->connect_to_Jurists_bd, $this->container);


        $concreteFabric = $fabric->make('tags-2');

        if (isset($concreteFabric)) {
            dump($concreteFabric->invalidateCache());
        }


        var_dump($request->request->get('data'));
        return new Response('Success');
    }
}