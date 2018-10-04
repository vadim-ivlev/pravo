<?php

function head42(){
    $v = getenv('INDOCKER');
    return $v == 1? "http://127.0.0.1:81" : "https://pravo.rg.ru";
}

function get_url_content($url)
{   
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
    //     CURLOPT_FOLLOWLOCATION => true,
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

// Profiling utilities
// https://stackoverflow.com/questions/21133/simplest-way-to-profile-a-php-script/45512462

// Call this at each point of interest, passing a descriptive string
function prof_flag($str)
{
    global $prof_timing, $prof_names;
    $prof_timing[] = microtime(true);
    $prof_names[] = $str;
}

// Call this when you're done and want to see the results
function prof_print()
{
    global $prof_timing, $prof_names;
    $size = count($prof_timing);
    $s = "";
    for($i=0;$i<$size - 1; $i++)
    {
        $s .= "\n{$prof_names[$i]}  " . ($prof_timing[$i+1]-$prof_timing[$i]) . " \n";
        echo "<b>{$prof_names[$i]}</b><br>";
        echo sprintf("&nbsp;&nbsp;&nbsp;%f<br>", $prof_timing[$i+1]-$prof_timing[$i]);
    }
    echo "<b>{$prof_names[$size-1]}</b><br>";
    
    error_log($s, 3, "/var/www/pravo/logs/my-errors.log");
    error_log($s);
}

