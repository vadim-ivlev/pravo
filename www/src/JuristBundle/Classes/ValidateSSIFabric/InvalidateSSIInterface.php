<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

interface InvalidateSSIInterface
{
    public function __construct(EntityManager $em, $data, ContainerInterface $container);

    public function invalidateCache();
}