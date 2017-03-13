<?php

namespace JuristBundle\Classes\SelectionFabric\DecoratorSelection;

class DecoratorRubrics implements DecoratorQueryInterface
{
    public function select(&$query)
    {
        $query .= "
            , ( 
                SELECT
					CONCAT('[', 
						GROUP_CONCAT('
							{
								\"current_rubric_id\":\"', r1.id, 
								'\",\"current_rubric_name\":\"', r1.name SEPARATOR '\"
							}, '), '\", \"rubrics__LAST__\": 1}]' 
					)
                FROM rubrics AS r1
                    INNER JOIN rubrics_questions AS rq1 ON rq1.rubrics_id = r1.id
                WHERE rq1.questions_id = q.id    
              ) AS current_rubric
            ";

        unset($query);
    }

    public function from(&$query)
    {}

    public function where(&$query, array $id = null)
    {
        if (!empty($id)) {
            $correctIdForMysql = array_map(function ($n) {return "'{$n}'";}, $id); //Оборачиваем слова в кавычки для sql
            $query .= " AND r.CPU_name in (" . implode(', ', $correctIdForMysql) . ")";
        }

        unset($query);
    }
}