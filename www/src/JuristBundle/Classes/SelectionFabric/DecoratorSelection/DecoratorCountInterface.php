<?php

namespace JuristBundle\Classes\SelectionFabric\DecoratorSelection;

interface DecoratorCountInterface
{
    public function selectCount(&$query);
    public function fromCount(&$query);
}