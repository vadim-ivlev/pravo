<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;


class InvalidateSSITags extends InvalidateSSIAbstract
{
    //private $em, $name, $container, $path;
    private $name;

    public function __construct(EntityManager $em, $name, ContainerInterface $container)
    {
        parent::__construct($em, $container);
        $this->name = explode('-', $name);
    }

    public function invalidateCache()
    {
        if (count($this->name) !== 2)
            return false;
        $filedName = $this->name[0];
        $id = $this->name[1];

        $question = $this->getAllQuestionWithoutParameters(); // Получаем все вопросы с главной и где использованно без параметров

        $tags = $this->em
            ->getRepository('JuristBundle:Tags')
            ->invalidateCacheSSI($filedName, $id);

        $rubrics = $this->em // Получить все связанные рубрики
            ->getRepository('JuristBundle:Tags')
            ->getAllRelatedRubricsTags($filedName, $id);

        $jurists = $this->em
            ->getRepository('JuristBundle:AuthUsers')
            ->getAllPathJurists();

        $pathForDels = array_merge($tags, $question, $rubrics, $jurists);

        if (!empty($pathForDels))
            $this->delArrayPath($pathForDels);
    }
}