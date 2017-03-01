<?php

namespace JuristBundle\Classes;

class JsonErrorClasses extends ErrorFabricMethodClasses
{
    public function generateError($message, $key = null)
    {
        return [
            (isset($key) ? $key : 'error') => $message
        ];
    }
}