<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Symfony\Component\HttpFoundation\Response;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;


class ValidateSSIFactory extends ValidateSSIFactoryAbstract
{
    public function __construct(EntityManager $em, ContainerInterface $container)
    {
        parent::__construct($em, $container);
    }

    public function make($name)
    {
        try {
            switch ($name) {
                case (bool)preg_match('/^' . static::JURIST_FACTORY . '\d*$/', $name):
                    return new InvalidateSSIJurist($this->em, $name, $this->container);
                break;
                case (bool)preg_match('/^' . static::TAG_FACTORY . '\d*$/', $name):
                    return new InvalidateSSITags($this->em, $name, $this->container);
                break;
                case (bool)preg_match('/^' . static::RUBRIC_FACTORY . '\d*$/', $name):
                    return new InvalidateSSIRubrics($this->em, $name, $this->container);
                break;
                case (bool)preg_match('/^' . static::QUESTION_FACTORY . '\d*$/', $name):
                    return new InvalidateSSIQuestion($this->em, $name, $this->container);
                break;
                default:
                    throw new \Exception('Class not register');
            }
        } catch (\Exception $e) {
            return null;
        }

    }

}