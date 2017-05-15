<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;

// If you don't want to setup permissions the proper way, just uncomment the following PHP line
// read http://symfony.com/doc/current/book/installation.html#checking-symfony-application-configuration-and-setup
// for more information
//umask(0000);

// This check prevents access to debug front controllers that are deployed by accident to production servers.
// Feel free to remove this, extend it, or make something more sophisticated.

function closeAppDev() {
    header("HTTP/1.x 404 Not Found");
    include("/var/www/pravo/www/app/Resources/TwigBundle/views/Exception/error404.html");
    die;
}

if(@$_SERVER['REMOTE_ADDR'] !== '212.69.111.131' && @$_SERVER['REMOTE_ADDR'] !== '192.168.1.2') {
    closeAppDev();
}

if (isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !(in_array(@$_SERVER['REMOTE_ADDR'], ['127.0.0.1', 'fe80::1', '::1']) || php_sapi_name() === 'cli-server')
) {
    /*header('HTTP/1.0 403 Forbidden');
    exit('You are not allowed to access this file. Check '.basename(__FILE__).' for more information.');*/
}

//$_SERVER['REQUEST_URI'] = "/generate_ssi/";
//$_SERVER['REQUEST_URI'] = '/some_route?url=' . $_GET['uri'];
/**
 * @var Composer\Autoload\ClassLoader $loader
 */
$loader = require __DIR__.'/../app/autoload.php';
Debug::enable();

$kernel = new AppKernel('dev', true);
$kernel->loadClassCache();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
