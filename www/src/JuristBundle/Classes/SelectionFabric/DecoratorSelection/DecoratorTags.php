<?php

namespace JuristBundle\Classes\SelectionFabric\DecoratorSelection;

class DecoratorTags implements DecoratorQueryInterface, DecoratorCountInterface
{
    public function selectCount(&$query)
    {}

    public function fromCount(&$query)
    {
        $this->from($query);

        unset($query);
    }

    public function select(&$query)
    {}

    public function from(&$query)
    {
        $query .= " 
            INNER JOIN tags_questions AS tq ON q.id = tq.questions_id 
        ";

        unset($query);
    }

    public function where(&$query, array $id = null)
    {
        if (!empty($id))
            $query .= " AND tq.tags_id in (" . implode(' ,', $id) . ")";
            //$query .= " AND t.id in (" . implode(' ,', $id) . ")";

        unset($query);
    }
}