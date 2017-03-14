<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

abstract class InvalidateSSIAbstract
{
    protected $em, $container, $path;

    public function __construct(EntityManager $em, ContainerInterface $container)
    {
        $this->em = $em;
        $this->container = $container;
        $this->path = $this->container->get('kernel')->getRootDir() . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'JuristBundle' . DIRECTORY_SEPARATOR . 'Resources' . DIRECTORY_SEPARATOR . 'public';
    }

    abstract public function invalidateCache();

    /**
     * Получить все пути, типа /include/tmpl-question_list/ или /include/tmpl-question_list/limit-10
     * Ибо они инвалидируются всегда
     */
    protected function getAllQuestionWithoutParameters()
    {
        return $this->em
            ->getRepository('JuristBundle:Questions')
            ->getAllQuestionPathWithoutParameters();
    }

    /**
     * Удаление путей
     * @param array $arrayPath - массив состоящий, например из путей rubrics+jurists+question(всегда)+tags
     */
    protected function delArrayPath(array $arrayPath)
    {
        $pathForDel = [];
        foreach ($arrayPath as $item)
            if($item['path'])
                $pathForDel[] = $this->path . $item['path'];

        $pathForDel = array_unique($pathForDel);

        $pathToRMRF = implode(' ', $pathForDel); // Для rm -rf

        $pathToSQL = "";
        // Для sql
        dump($pathToSQL);
        dump($pathForDel);die;
    }
}