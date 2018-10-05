<?php
namespace func;

/**
 * General global functions and parameters
 */

const production_url = "https://pravo.rg.ru";
const development_url = "http://127.0.0.1:81";


/**
 * returns either production or development.
 * Used in places where an absolute address is required.
 */
function url(){
    $v = getenv('INDOCKER');
    return $v == 1? development_url : production_url;
}

/**
 * an alternative to file_get_contents
 */
function curl_get_contents($url)
{   
    
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
    //     CURLOPT_HTTPHEADER => ['Content-Type:application/json;charset=utf8'],
    //     CURLOPT_POST => 1,
    //     CURLOPT_POSTFIELDS => json_encode($param, JSON_UNESCAPED_UNICODE),
     ]);
      
    $result = curl_exec($ch);

    // проблема с сервером? 500, 404 и проч.
    if (!curl_errno($ch)) {
        switch ($http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE)) {
            case 200:  # OK
                break;
            default:
                $error = 'Unexpected HTTP code: '. $http_code;
                curl_close($ch);
                throw new RequestSenderException($error);
        }
    }
    
    // ошибка соединения?
    if ($result === false) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new RequestSenderException($error);
    }
    
    curl_close($ch);
    return $result;
} 


