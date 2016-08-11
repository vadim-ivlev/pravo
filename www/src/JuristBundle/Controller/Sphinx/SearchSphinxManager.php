<?php

namespace JuristBundle\Controller\Sphinx;

use Symfony\Component\DependencyInjection\ContainerInterface;
//use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class SearchSphinxManager //extends ContainerAwareCommand
{
    /*private $container;

    public function setContainer (ContainerInterface $container)
    {
        $this->container = $container;
    }*/

    public function prepareResponse(array $option)
    {
        //$em = $this->getContainer()/*->get('iakumai.sphinxsearch.search')*/;
        dump(123);
        //dump($this->getContainer('iakumai.sphinxsearch.search')/*->get('iakumai.sphinxsearch.search')*/);die;
        /*$pref = InstanceSphinx::getInstance();
        $pref->setProperty(2);*/
        //return $pref->GetProperty();
    }
}