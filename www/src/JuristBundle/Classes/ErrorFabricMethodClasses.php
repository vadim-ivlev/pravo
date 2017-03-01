<?php

namespace JuristBundle\Classes;

abstract class ErrorFabricMethodClasses
{
    static $className;
    const DEFAULT_NAMESPACE = '\JuristBundle\Classes\\';
    private static $defaultTemplate = ErrorFabricMethodClasses::DEFAULT_NAMESPACE . 'EmptyErrorClasses';

    public static function initial($type, $namespace = null)
    {
        ErrorFabricMethodClasses::$className = (
            isset($namespace)
                ? $namespace . '\\'
                : ErrorFabricMethodClasses::DEFAULT_NAMESPACE
            ) . $type;

        try {
            return new ErrorFabricMethodClasses::$className();
        } catch (\Error $e) {
            return new ErrorFabricMethodClasses::$defaultTemplate();
        }
    }

    abstract public function generateError($message, $key = null);
}