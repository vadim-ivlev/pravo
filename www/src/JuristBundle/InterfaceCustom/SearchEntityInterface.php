<?php

namespace JuristBundle\InterfaceCustom;

/**
 * Create 30.03.17
 * Этот интерфес должен быть у Entity, которые работают в Sphinx
 * Interface SearchEntityInterface
 * @package JuristBundle\InterfaceCustom
 */
interface SearchEntityInterface
{

    /**
     * Create 30.03.17
     * @param array $idSearch - массив найденных сфиксом данных
     * @param $limit
     * @param $offset
     * @return array
     */
    public function getSearchResult(array $idSearch, $limit, $offset) : array;

}