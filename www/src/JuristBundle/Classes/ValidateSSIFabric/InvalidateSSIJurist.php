<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

class InvalidateSSIJurist implements InvalidateSSIInterface
{
    private $em, $name, $container;

    public function __construct(EntityManager $em, $name, ContainerInterface $container)
    {
        $this->em = $em;
        $this->name = explode('-', $name);
        $this->container = $container;
    }

    public function invalidateCache()
    {
        $result = $this->em
            ->getRepository('JuristBundle:AuthUsers')
            ->invalidateCacheSSI($this->name);

        return $this->name;
    }
}