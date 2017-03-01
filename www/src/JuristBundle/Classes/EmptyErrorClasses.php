<?php

namespace JuristBundle\Classes;

class EmptyErrorClasses extends ErrorFabricMethodClasses
{
    public function generateError($message, $key = null)
    {
        throw new \Exception("Не найден класс " . ErrorFabricMethodClasses::$className);
    }
}