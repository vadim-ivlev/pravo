<?php

namespace JuristBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class Arr
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @param ContainerInterface $service_container
     */
    public function __construct(ContainerInterface $service_container)
    {
        $this->container = $service_container;
    }

    /**
     * Сравнение значений двух массивов с разделением на не затронутые, новые и удаленные
     *
     * @param array $arr1 - старый массив
     * @param array $arr2 - новый массив
     * @return array - массив с результатами сравнения
     */
    public function different(array $arr1, array $arr2)
    {
        $diff = array();

        $diff['normal'] = array_intersect($arr1, $arr2);
        $diff['delete'] = array_diff($arr1, $arr2);
        $diff['newest'] = array_diff($arr2, $arr1);

        return $diff;
    }

    /**
     * Поиск и удаление в двумерном массиве всех ассоциативных массивов имеющих определенный ключ и значение
     *
     * @param $key - ключ ассоциативного массива
     * @param $value - значение ассоциативного массива
     * @param array $array - массив, в котором производится поиск
     * @return array - новый массив
     */
    public function deleteByElement($key, $value, array $array)
    {
        foreach ($array as $k => $arr) {
            if (isset($arr[$key]) && $arr[$key] == $value) {
                unset($array[$k]);
            }
        }

        return $array;
    }

    /**
     * Поиск в двумерном массиве ассоциативного массива имеющего определенный ключ и значение
     *
     * @param $key - ключ ассоциативного массива
     * @param $value - значение ассоциативного массива
     * @param array $array - массив, в котором производится поиск
     * @return array - пустой массив в случае если ничего не найдено или массив подходящий под критерии поиска
     */
    public function findByElement($key, $value, array $array)
    {
        foreach ($array as $arr) {
            if (isset($arr[$key]) && $arr[$key] == $value) {
                return $arr;
            }
        }

        return array();
    }

    /**
     * Поиск определенного ключа в массиве по указанному пути
     *
     * @param array $array - исходный массив по которому ведется поиск
     * @param $path - путь до ключа вида: first:sub:asd:ser
     * @param string $delimiter - разделитель кулючей в пути
     * @return array|null - значение ключа по указанному пути, либо NULL если искомый элемент не найден
     */
    public function findByXPath(array $array, $path, $delimiter = ":")
    {

        $parts = explode($delimiter, $path);

        if(count($parts) == 0)
            return isset($array[$path]) ? $array[$path] : null;

        foreach($parts as $i) {

            if(!isset($array[$i])) return null;
            $array = $array[$i];

        }

        return $array;
    }

    /**
     * Поиск в двумерном массиве всех ассоциативных массивов имеющих определенный ключ и значение
     *
     * @param $key - ключ ассоциативного массива
     * @param $value - значение ассоциативного массива
     * @param array $array - массив, в котором производится поиск
     * @return array - пустой массив в случае если ничего не найдено или массивы подходящие под критерии поиска
     */
    public function findAllByElement($key, $value, array $array)
    {
        $return_array = array();

        foreach ($array as $arr) {
            if (isset($arr[$key]) && $arr[$key] == $value) {
                $return_array[] = $arr;
            }
        }

        return $return_array;
    }

    /**
     * Получение значения первого элемента массива
     *
     * @param array $array - массив
     * @return mixed - значение массива
     */
    public function first(array $array)
    {
        return array_shift($array);
    }

    /**
     * Получение значения последнего элемента массива
     *
     * @param array $array - массив
     * @return mixed - значение массива
     */
    public function last(array $array)
    {
        return array_pop($array);
    }

    /**
     * Получение элемента массива по его порядковому номеру
     *
     * @param array $array - массив
     * @param $n - порядковый номер
     * @return array | bool - массив с ключом и значением элемента или false если элемент не найден
     */
    public function getElementBySortNumber(array $array, $n)
    {
        $keys = array_keys($array);
        $vals = array_values($array);

        if (isset($keys[$n]) && $vals[$n]) {
            return array($keys[$n] => $vals[$n]);
        }

        return false;
    }

    /**
     * Группировка массива по произвольному значению
     *
     * @param $field - имя значения массива
     * @param array $array - массив с данными
     * @return array - сгруппированный массив
     */
    public function groupByFileld($field, array $array)
    {
        $new_array = array();

        $old = null;

        foreach ($array as $item) {
            $new_array[$item[$field]][] = $item;
        }

        return $new_array;
    }
}