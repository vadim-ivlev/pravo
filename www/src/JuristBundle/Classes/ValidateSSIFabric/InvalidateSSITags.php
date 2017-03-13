<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;


class InvalidateSSITags implements InvalidateSSIInterface
{
    private $em, $name, $container, $path;

    public function __construct(EntityManager $em, $name, ContainerInterface $container)
    {
        $this->em = $em;
        $this->name = explode('-', $name);
        $this->container = $container;
        $this->path = $this->container->get('kernel')->getRootDir() . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'JuristBundle' . DIRECTORY_SEPARATOR . 'Resources' . DIRECTORY_SEPARATOR . 'public';
    }

    public function invalidateCache()
    {
        $tags = $this->em
            ->getRepository('JuristBundle:AuthUsers')
            ->invalidateCacheSSI($this->name);

        foreach ($tags as $tag) {
            $this->em
                ->getRepository('JuristBundle:AuthUsers')
                ->delPathSSI($this->path . $tag['path'], $tag['path']);
        }

        die;
        return $this->name;
    }
}