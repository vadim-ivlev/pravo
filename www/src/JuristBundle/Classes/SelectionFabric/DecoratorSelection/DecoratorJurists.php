<?php

namespace JuristBundle\Classes\SelectionFabric\DecoratorSelection;

class DecoratorJurists implements DecoratorQueryInterface
{
    public function select(&$query)
    {}

    public function from(&$query)
    {}

    public function where(&$query, array $id = null)
    {
        if (!empty($id))
            $query .= " AND au.id in (" . implode(', ', $id) . ")";

        unset($query);
    }
}