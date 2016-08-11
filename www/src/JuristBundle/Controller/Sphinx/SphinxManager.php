<?php

namespace JuristBundle\Controller\Sphinx;

abstract class SphinxManager
{
    const SEARCH = 'search';
    const SEARCH_EX = 'searchEx';

    private $type = 'search';
    private $request;
    private $client_type;

    /**
     * @param $type - тип поиска search\searchEx
     * @param $request - Запрос
     * @param $client_type - Запрос от клиента или сервера
     */
    public function __construct($type, $request, $client_type = 'client')
    {
        $this->type = $type;
        $this->request = $request;
        $this->client_type = $client_type;
    }

    abstract function prepareResponse(array $condition);

    function getSearchType()
    {
        switch ($this->type) {
            case (self::SEARCH_EX):
                return new \JuristBundle\Controller\Sphinx\SearchExSphinxManager();
            default:
                return new \JuristBundle\Controller\Sphinx\SearchSphinxManager();
        }
    }
}