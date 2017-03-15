<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

class InvalidateSSIQuestion extends InvalidateSSIAbstract
{
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

        $rubricsAndTags = $this->em // Получить все связанные рубрики и теги
            ->getRepository('JuristBundle:AuthUsers')
            ->getRubricsAndTagsViaQuestionIdPathSSI($this->em, $id);

        $jurist = $this->em // Получить все связанные рубрики и теги
            ->getRepository('JuristBundle:AuthUsers')
            ->getJuristByQuestionId($this->em, $id);

        $pathForDels = array_merge($question, $jurist, $rubricsAndTags);
        if (!empty($pathForDels))
            $this->delArrayPath($pathForDels);
    }
}