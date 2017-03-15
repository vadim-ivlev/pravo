<?php

namespace JuristBundle\Classes\SelectionFabric\DecoratorSelection;

class DecoratorQuery extends DecoratorQueryAbstract
{
    //Получает массив таблиц table => [id]
    //реализует данные методы декоратора и возвращает запрос
    public function compile(array $neededDecorators)
    {
        $decoratorQuery = new DecoratorQuery();

        $decoratorQuery->select($this->querySelect);
        $decoratorQuery->from($this->queryFrom);
        $decoratorQuery->where($this->queryWhere);

        foreach ($neededDecorators as $table => $id) {
            $className = __NAMESPACE__ . '\\' . 'Decorator' . ucfirst($table);

            $className = new $className();
            $className->select($this->querySelect);
            $className->from($this->queryFrom);
            $className->where($this->queryWhere, $id);
        }

        return $this->querySelect . $this->queryFrom . $this->queryWhere;
    }
    
    public function compileCount(array $neededDecorators)
    {
        $decoratorQuery = new DecoratorQuery();

        /**
         * Если уже есть инстансы, надо удалить, иначе, он начне к абстрактному классу стакать
         */
        unset($this->querySelect, $this->queryFrom, $this->queryWhere);
        
        $decoratorQuery->select($this->querySelect);
        $decoratorQuery->from($this->queryFrom);
        $decoratorQuery->where($this->queryWhere);

        foreach ($neededDecorators as $table => $id) {
            $className = __NAMESPACE__ . '\\' . 'Decorator' . ucfirst($table);

            $className = new $className();
            if ($className instanceof DecoratorCountInterface) {
                $className->selectCount($this->querySelect);
                $className->fromCount($this->queryFrom);
            }
            $className->where($this->queryWhere, $id);
        }

        return $this->querySelect . $this->queryFrom . $this->queryWhere;
    }

    public function select(&$query)
    {
        $query = "SELECT \n";
        unset($query);
    }
    public function from(&$query)
    {
        $query .= "FROM \n";
        unset($query);
    }

    public function where(&$query, array $id = null)
    {
        $query .= "WHERE \n";
        unset($query);
    }
}