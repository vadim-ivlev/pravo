<?php

namespace JuristBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;
use JuristBundle\Controller\ApiController;
/**
 * Pagination
 */
class Pagination
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @param ContainerInterface $serviceContainer
     */
    public function __construct(ContainerInterface $serviceContainer)
    {
        $this->container = $serviceContainer;
    }

    /**
     * @param $query - select * по заданной выборки
     * @param $countNumericPage - количество пагинация на странице
     * @param $countRecordsOnPage - количество записей на странице
     * @param $currentPage - текущая страница
     * @param $link - ссылка роут
     * @param int $firstPage - первая страница
     * @param string $conditionId - костыли для таких категорий, как выборка по тегу или рубрики
     * @param string $getString - набор get запросов
     * @return bool
     * @throws Exception
     */
    public function PaginationAction (
        $query, $countNumericPage, $countRecordsOnPage, $currentPage,
        $link, $firstPage = 1, $conditionId = '', $getString = ''
    )
    {

        if (!$currentPage) {
            if ($this->get('kernel')->getEnvironment() != 'dev') {
                return false;//Если false - $this->pageNotFound(true);
            }
            throw new Exception("Не допустимое значение: id = $currentPage");
        }
        $countRecords = (gettype($query) === 'string') ? $query : count($query);
        $totalPages = ceil($countRecords / $countRecordsOnPage);

        /**
         * start numeric_page
         *
         * logic:
         * We have for example 20 page with $countNumericPage == 5
         *
         * 1,2,3,4,5,6,7,8,9,10,11,12,13,14,1516,17,18,19,20
         *
         * if $currentPage == 1(first)
         * then we see 1(disabled),2,3,4...20
         *
         * else if $currentPage == 20(last page)
         * then we see 1...17,18,19,20(disabled)
         *
         * else if $currentPage == 1+1
         * then we see 1,2(disabled),3,4...20
         *
         * else if $currentPage == 20-1(last page-1)
         * then we see 1...17,18,19(disabled),20
         *
         * else if $currentPage == (example) 10
         * then we see 1...9,10(disabled),11...20
         *
         */
        
        if ($totalPages <= 1) return false; //Если 1 страница всего

        for ($i = $firstPage; $i <= $totalPages; ++$i) { //TODO оптимизировать

            if ($currentPage == $firstPage && $i <= $countNumericPage) { //TODO на первой странице
                if ($i < $countNumericPage) {
                    $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);

                    $numericPage[] = [
                        'number_page' => $i,
                        'link' => ($link . $i . $conditionId . ApiController::REDIRECT !== '/main/1/') ? $link . $i . $conditionId . ApiController::REDIRECT . $getString : '/' . $getString,
                        'current' => ($i == $currentPage) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false
                    ];
                } else {
                    $numericPage[] = [
                        'number_page' => $totalPages,
                        'link' => ($link . $i . $conditionId . ApiController::REDIRECT !== '/main/1/') ? $link . $totalPages . $conditionId . ApiController::REDIRECT . $getString : '/' . $getString,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                        'right_three_dots' => ($totalPages > $countNumericPage+1) ? true : false, //Чтоб не было точек если 2-е стр и между ними точки
                    ];
                }
            } elseif ($currentPage == $totalPages && $i > $totalPages - $countNumericPage) { //TODO последний
                $numericPage[] = [
                    'number_page' => $i,
                    'link' => $link . $i . $conditionId . ApiController::REDIRECT . $getString,
                    'current' => ($i == $currentPage) ? true : false,
                    'first' => ($i == $firstPage) ? true : false,
                    'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                    'last' => ($i == $totalPages) ? true : false,
                ];
                $numericPage[0] = [
                    'number_page' => $firstPage,
                    'link' => ($link . $firstPage . $conditionId . ApiController::REDIRECT . $getString !== '/main/1/') ? $link . $firstPage . $conditionId . ApiController::REDIRECT . $getString : '/' . $getString,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                    'left_three_dots' => ($totalPages > $countNumericPage+1) ? true : false, //Чтоб не было точек если 2-е стр и между ними точки
                ];
                $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);
            } elseif ($currentPage == $firstPage + 1) { //TODO на 2-ой странице
                if ($i < $countNumericPage) {
                    $numericPage[] = [
                        'number_page' => $i,
                        'link' => ($link . $i . $conditionId . ApiController::REDIRECT . $getString !== '/main/1/') ? $link . $i . $conditionId . ApiController::REDIRECT . $getString : '/' . $getString,
                        'current' => ($i == $currentPage) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false,
                    ];
                } elseif ($i == $countNumericPage) {
                    $numericPage[] = [
                        'number_page' => $totalPages,
                        'link' => ($link . $i . $conditionId . ApiController::REDIRECT . $getString !== '/main/1/') ? $link . $totalPages . $conditionId . ApiController::REDIRECT . $getString : '' . $getString,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                        'right_three_dots' => ($totalPages > $countNumericPage) ? true : false,
                    ];
                }
                $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);
            } elseif ($currentPage == $totalPages - 1 && $i > $totalPages - $countNumericPage) { //TODO на предпоследний странице

                $numericPage[] = [
                    'number_page' => $i,
                    'link' => $link . $i . $conditionId . ApiController::REDIRECT . $getString,
                    'current' => ($i == $currentPage) ? true : false,
                    'first' => ($i == $firstPage) ? true : false,
                    'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                    'last' => ($i == $totalPages) ? true : false,
                ];
                $numericPage[0] = [
                    'number_page' => $firstPage,
                    'link' => ($link . $i . $conditionId . ApiController::REDIRECT . $getString !== '/main/1/') ? '/' . $getString : $link . $i . $conditionId . ApiController::REDIRECT . $getString,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                    'left_three_dots' => ($currentPage != 3 && ($totalPages > $countNumericPage)) ? true : false, //Чтоб не было точек между 1-ой и 2-ой, и если всего 5, а мы на 4, чтоб тоже не было
                ];

                $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);
            } elseif (
                ($currentPage-2 < $i && $currentPage+2 > $i)
                && $currentPage != $firstPage && $currentPage != $firstPage+1
                && $currentPage != $totalPages && $currentPage != $totalPages - 1
            ) { //TODO в середине
                $numericPage[0] = [
                    'number_page' => $firstPage,
                    'link' => ($link . $firstPage . $conditionId . ApiController::REDIRECT . $getString !== '/main/1/') ? $link . $firstPage . $conditionId . ApiController::REDIRECT . $getString : '/' . $getString,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                    'left_three_dots' => ($currentPage != 3) ? true : false, //Чтоб не было точек между 1-ой и 2-ой
                ];
                if ($currentPage-2 < $i && count($numericPage)){
                    $numericPage[] = [
                        'number_page' => $i,
                        'link' => ($link . $i . $conditionId . ApiController::REDIRECT . $getString !== '/main/1/') ? $link . $i . $conditionId . ApiController::REDIRECT . $getString : '/' . $getString,
                        'current' => ($i == $currentPage) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false,
                    ];
                }
                if (count($numericPage) == $countNumericPage-1) { //Если массив заполнился до нужного значения
                    $numericPage[] = [
                        'number_page' => $totalPages,
                        'link' => ($link . $totalPages . $conditionId . ApiController::REDIRECT . $getString !== '/main/1/') ? $link . $totalPages . $conditionId . ApiController::REDIRECT . $getString : '/' . $getString,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                        'right_three_dots' => ($currentPage != $totalPages - 2) ? true : false, //Чтоб не было точек между последний и предпоследний,
                    ];
                }
                $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);
            }
        }
        /**
         * End numeric_page
         **/

        /**
         * (!$numericPage && $this->get('kernel')->getEnvironment() != 'dev') Перехват ошибки на проде, если вбита огромная пагинация 100500, то он не сможет ее обработать и провалится на следующию строку вернув 500, а нам надо 404
         */
        if(!$numericPage && $this->get('kernel')->getEnvironment() != 'dev') return false; //$this->pageNotFound(true);
        if (!$numericPage) throw new Exception('Не определена логика вывода страниц пагинации');


        if ($totalPages > 0) {
            $this->result['pagination'] = [
                'total__pages' => $totalPages,
                'limit__pages' => ($totalPages > ApiController::PAGINATION_FOR_JURISTS) ? true : false, //Для многоточия в мусташе
                'range' => $countRecordsOnPage,
                'numeric_page' => $countNumericPage,
                'total__records' => $countRecords,
                'all__pages' => $numericPage,
                'arrow' => $arrow
            ];

            /**
             * Если больше 5 страниц, то у нас есть точки
             **/
            if ($this->result['pagination']['total__pages'] > 5) {
                $this->result['pagination']['all__pages'][0]['__FIRST__'] = true;
                $this->result['pagination']['all__pages'][count($this->result['pagination']['all__pages'])-1]['__LAST__'] = true;
            }
        }

        return $this->result['pagination'];

    }

    protected function PaginationGenerateArrowAction ($numberPage, $currentPage, $link, $conditionId = '', $getString)
    {
        static $arrow = [];

        if ($numberPage == $currentPage-1) {
            $arrow[] = [
                'arrow__prev' => true,
                'arrow__link' => ($link. $numberPage . $conditionId . ApiController::REDIRECT . $getString !== '/main/1/') ? $link. $numberPage . $conditionId . ApiController::REDIRECT . $getString : '/' . $getString,
            ];
        }

        if ($numberPage == $currentPage+1) {
            $arrow[] = [
                'arrow__next' => true,
                'arrow__link' => $link . $numberPage . $conditionId . ApiController::REDIRECT . $getString,
            ];
        }

        return $arrow;
    }
}