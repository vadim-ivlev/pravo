<?php

namespace JuristBundle\Classes;

/**
 * Лебедев не захотел делать норм редирект на симфони для генерации SSI,
 * если оч охото, можешь с ним посраться
 */
header("HTTP/1.1 302 Moved Permanently");
header("Location: https://pravo.rg.ru/generate_ssi1/?uri={$_REQUEST['uri']}");
exit();
