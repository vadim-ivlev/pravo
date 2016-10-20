<?php

namespace JuristBundle\Controller;

use JuristBundle\Entity\SectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use JuristBundle\Controller\ApiController;
use Mustache_Engine;
use AppBundle\Services\Configer;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Служит для обработки сортировки в https://pravo.rg.ru/jurists/1/ в общем списке юристов
 * Class SortController
 * @package JuristBundle\Controller
 */
class SortController extends ApiController
{
    public function MakeSortAction(Request $request)
    {
        $request = $request->request->all();

        /**
         * @param $request['current_url'] - текущий url
         * @param $request['current_search'] - текущие get запросы, если они есть
         * @param array $request['order_by'] - по какому полю пришла сортировка
         */
        if (!empty($request['current_url']) &&  isset($request['current_search']) && is_array($request['order_by'])) {

            /**
             * START запрос на старую сортировку
             */
            $request['current_url'] = preg_replace('/\.?\d+/', '1', $request['current_url']);

            if (!empty($request['current_search'])) {
                $old_get = preg_replace('/^\?/', '', $request['current_search']); //Убераем знак в начале строки гет запроса
                $old_get = explode('&', $old_get); //Разбиваем по &
                $old_get_new_array = [];

                /**
                 * Формируем массив $old_get_new_array, где ключ - это ключ старого гет запроса между & а значение - это значение старого гет запроса
                 * Т.е. если был такой запрос в гете ?a=e&b=c то, теперь, он будет такой ['a' => 'e', 'b' => 'c',]
                 */
                foreach ($old_get as $val_old_get) {
                    $tmp = explode('=', $val_old_get);
                    $old_get_new_array[$tmp[0]] = $tmp[1];
                }
                /**
                 * END запрос на старую сортировку
                 */
            }

            /**
             * START формирование новой сортировки
             */
            (isset($old_get_new_array))
                ? $result = array_merge($old_get_new_array, $request['order_by'])
                : $result = $request['order_by']; //Если есть повтор, то он заменится на новый

            $result_string = '';

            if ($result) { //Смотрим, не пустое ли
                $result_string = '?';

                foreach ($result as $key_result => $val_result) {
                    $result_string .= $key_result . '=' . $val_result . '&';
                }

                if ($result_string[strlen($result_string)-1] === '&') { //Убераем последнию амперсанду
                    $result_string = substr($result_string, 0, strlen($result_string)-1);
                }

                $result_string = $request['current_url'] . $result_string;
            }
            /**
             * END формирование новой сортировки
             */

        } else {
            $result_string = 'incorrect data!!!';
        }

        return new Response(
            $result_string
        );
    }
}