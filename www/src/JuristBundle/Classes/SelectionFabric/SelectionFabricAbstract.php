<?php

namespace JuristBundle\Classes\SelectionFabric;

use Symfony\Component\HttpFoundation\Response;

use Doctrine\ORM\EntityManager;
use JuristBundle\Classes\ErrorFabricMethodClasses;

abstract class SelectionFabricAbstract
{
    protected
            $em,
            $HtmlErrorMessage,
            $tables = [],
            $decorator,
            $query
    ;

    public function __construct(EntityManager $em, ErrorFabricMethodClasses $HtmlErrorMessage, DecoratorSelection\DecoratorQueryAbstract $decorator) {
        $this->em = $em;
        $this->HtmlErrorMessage = $HtmlErrorMessage;
        $this->decorator = $decorator;
    }

    /**
     * @param array $data - содержит conditions и tables(не обязательно)
     * @return int
     */
    abstract public function assembler(array $data);

    abstract public function orderBy($orderBy);
    abstract public function limit($limit);
    abstract public function offset($offset);

}