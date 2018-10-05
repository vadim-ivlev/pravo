<?php
namespace prof;
 
/** 
 * Profiling utilities
 * https://stackoverflow.com/questions/21133/simplest-way-to-profile-a-php-script/45512462
 * 
 * 
*/

$prof_enabled=false;

$prof_times=[];
$prof_names=[];

const log_location= "/var/www/pravo/logs/my-errors.log";

/**
 * clear log history.
 */
function init(){
    global $prof_enabled, $prof_times, $prof_names;
    $prof_times = [];
    $prof_names = [];
    file_put_contents(\profiler\log_location, "");
}


/** 
 * Call this at each point of interest, passing a descriptive string
 */
function flag($str)
{
    global $prof_enabled, $prof_times, $prof_names;

    if( !$prof_enabled )
        return;
       
    $prof_times[] = microtime(true);
    $prof_names[] = $str;
}
    
/**
 * Call this when you're done and want to see the results
 */
function print_log( $show_in_browser = false)
{
    global $prof_enabled, $prof_times, $prof_names;

    if( !$prof_enabled )
        return;
        

    $size = count($prof_times);
    $time_delta = '';
    $s = '';

    for($i=0;$i<$size - 1; $i++)
    {
        $time_delta = sprintf("%.4f", $prof_times[$i+1]-$prof_times[$i]);
        $s .= "{$prof_names[$i]} | {$time_delta} \n";
    }
    
    $s .= "{$prof_names[$i]} \n";

    if ($show_in_browser){
       echo \str_replace("\n","<br>\n", $s);
    }

    error_log($s);
    error_log($s, 3, \prof\log_location );
}

