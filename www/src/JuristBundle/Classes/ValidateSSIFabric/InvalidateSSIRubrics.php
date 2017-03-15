<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

class InvalidateSSIRubrics extends InvalidateSSIAbstract
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

        $rubricsTagsAndJurists = $this->em // Получить все связанные рубрики и теги и юристов
        ->getRepository('JuristBundle:AuthUsers')
            ->getRubricsTagsAndJuristsViaRubricsIdPathSSI($this->em, $id);

        $pathForDels = array_merge($question, $rubricsTagsAndJurists);
        
        if (!empty($pathForDels))
            $this->delArrayPath($pathForDels);
    }
}