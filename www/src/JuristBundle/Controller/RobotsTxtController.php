<?php

namespace JuristBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use JuristBundle\Entity\SectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;


class RobotsTxtController extends Controller
{
    private $pass = '73n20GN7NRGSN0M0A7ggfrfgiwh.43yhfrubrfdrewfnid';

    private function pathToFile()
    {
        return $this->get('kernel')->getRootDir() . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . 'robots.txt';
    }

    private function checkAccess($request)
    {
        if (
            $this->container->get('request_stack')->getCurrentRequest()->getClientIp() !== '212.69.111.246'
            || empty($request->request->get('pass'))
            || $request->request->get('pass') !== $this->pass . date('Y-m-d H:i')
        ) throw $this->createNotFoundException();
    }

    public function GetRobotsTxtAction(Request $request)
    {
        //return new Response($_SERVER['REMOTE_ADDR']);
        $this->checkAccess($request);

        $value = htmlspecialchars(file_get_contents($this->pathToFile()));
        return new Response($value);

    }

    public function SetRobotsTxtAction(Request $request)
    {

        $this->checkAccess($request);

        if (!empty($request->request->get('data')) && file_put_contents($this->pathToFile(), $request->request->get('data')))
            return new Response('success');

        return new Response('error');

    }
    
}