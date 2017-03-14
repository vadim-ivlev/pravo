<?php

use Symfony\Component\HttpFoundation\Request;

/**
 * @var Composer\Autoload\ClassLoader
 */
//if ($_SERVER['REMOTE_ADDR'] === '212.69.111.131') {
//    var_dump("<pre>");
//    var_dump($_SERVER);
//    var_dump("</pre>");
////    die;
//}
//if($_SERVER['REMOTE_ADDR'] == '212.69.111.131'){
//    var_dump(1);
//}
$loader = require __DIR__.'/../app/autoload.php';
include_once __DIR__.'/../var/bootstrap.php.cache';

$kernel = new AppKernel('prod', false);
$kernel->loadClassCache();
//$kernel = new AppCache($kernel);

// When using the HttpCache, you need to call the method in your front controller instead of relying on the configuration parameter
//Request::enableHttpMethodParameterOverride();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
