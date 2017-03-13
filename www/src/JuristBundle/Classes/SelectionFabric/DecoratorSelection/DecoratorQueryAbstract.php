<?php

namespace JuristBundle\Classes\SelectionFabric\DecoratorSelection;

abstract class DecoratorQueryAbstract implements DecoratorQueryInterface
{
    protected $querySelect, $queryFrom, $queryWhere;

    abstract public function compile(array $neededDecorators);

    abstract public function compileCount(array $neededDecorators);
}