<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Symfony\Component\HttpFoundation\Response;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;


abstract class ValidateSSIFactoryAbstract
{
    protected $em, $container;

    const
        JURIST_FACTORY = 'jurists-',
        TAG_FACTORY = 'tags-',
        RUBRIC_FACTORY = 'rubrics-',
        QUESTION_FACTORY = 'questions-';

    protected function __construct(EntityManager $em, ContainerInterface $container)
    {
        $this->em = $em;
        $this->container = $container;
    }

    abstract public function make($name);
}