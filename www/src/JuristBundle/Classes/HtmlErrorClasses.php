<?php

namespace JuristBundle\Classes;

class HtmlErrorClasses extends ErrorFabricMethodClasses
{
    public function generateError($message, $key = null)
    {
        return "
            <h1>
                404 page not found
                <br>
                " . (isset($key) ? $key : 'error') . ": {$message}
            </h1>";
    }
}