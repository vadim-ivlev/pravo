<?php

namespace JuristBundle\Classes\SelectionFabric\DecoratorSelection;

interface DecoratorQueryInterface
{
    public function select(&$query);
    public function from(&$query);
    public function where(&$query, array $id = null);
}