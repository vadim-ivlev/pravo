<?php


namespace JuristBundle\Classes\SelectionFabric;

use Symfony\Component\HttpFoundation\Response;

use Doctrine\ORM\EntityManager;
use JuristBundle\Classes\ErrorFabricMethodClasses;

class SelectionFabricReal extends SelectionFabricAbstract
{
    public function __construct(EntityManager $em, ErrorFabricMethodClasses $HtmlErrorMessage)
    {
        parent::__construct($em, $HtmlErrorMessage, new DecoratorSelection\DecoratorQuery());
    }

    public function assembler(array $data)
    {
        $conditionForCorrectData =
            !isset($data['tables']) || !is_array($data['tables'])
            || empty($data['conditions']) || !is_array($data['conditions']);

        if ($conditionForCorrectData)
            return new Response($this->HtmlErrorMessage->generateError("incorrect data for " . __CLASS__));

        $default['questions'] = []; //Если нет questions
        if (!array_key_exists('questions', $data['tables']))
            $data['tables'] = $default + $data['tables'];

        foreach ($data['tables'] as $table => $id)
            $this->tables[$table] = $id;


        try {
            $this->query = $this->decorator->compile($this->tables);
            $result = $this->em
            ->getRepository('JuristBundle:Questions')
            ->fetchSSI(
                $this
                    ->orderBy($data['conditions']['order_by'])
                    ->limit($data['conditions']['limit'])
                    ->offset($data['conditions']['offset'])
            );

            if (empty($result))
                return new Response($this->HtmlErrorMessage->generateError("Query return empty results"));

            $resultCount = $this->em // Пагинация
                ->getRepository('JuristBundle:Questions')
                ->fetchSSI(
                    $this->decorator->compileCount($this->tables)
                );

            $pagination = $resultCount[0];
            $pagination['offset'] = $data['conditions']['offset'];
            $pagination['limit'] = $data['conditions']['limit'];
            return [
                'query' => $result,
                'pagination' => $pagination
            ];
        } catch (\Exception $e) {
//            dump($e->getMessage());die;
            return new Response($this->HtmlErrorMessage->generateError("Internal MySQL error"));
        }
    }

    public function orderBy($orderBy)
    { //Monada
        $this->query .= "\n ORDER BY {$orderBy}";

        return $this;
    }

    public function limit($limit)
    { //Monada
        $this->query .= "\n LIMIT {$limit}";

        return $this;
    }

    public function offset($offset)
    { //Pipeline
        $this->query .= "\n OFFSET {$offset}";

        return $this->query;
    }
}