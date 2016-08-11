<?php

namespace JuristBundle\Controller\Sphinx;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
//use Symfony\Component\DependencyInjection\ContainerInterface;
//use Symfony\Component\DependencyInjection\ContainerAwareInterface;
//use Symfony\Component\DependencyInjection\ContainerInterface;

class InstanceSphinx extends Controller//implements ContainerAwareInterface
{
    static private $instance_sphinx;
    private $property;

    /*private function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }*/

    private function __clone()
    {

    }

    private function __wakeup()
    {

    }

    static public function getInstance()
    {
        if (empty(self::$instance_sphinx)) {
            self::$instance_sphinx = new static();
        }

        return self::$instance_sphinx;
    }

    public function getProperty ()
    {
        return $this->property;
    }

    public function setProperty ($property = null)
    {
        //$a = new Controller();
        //$this->container = 1;
        //$container = new ContainerBuilder();
        die;
        $controller = new DefaultController();
        $controller->setContainer($container);

        dump($this->getContainer()->get('iakumai.sphinxsearch.search'));die;
        dump($this->getContainer()->get('iakumai.sphinxsearch.search'));die;
        $this->property = $property /*|| $a->get('iakumai.sphinxsearch.search')*/;
    }
}