<?php

//namespace JuristBundle\Classes;

/**
 * Если когда-нибудь захочешь сделать нормально через симфони, то флаг тебе в руки
 */

return "<div>1</div>";
header("HTTP/1.1 302 Moved Permanently");
header("Location: https://pravo.rg.ru/generate_ssi1/?uri={$_REQUEST['uri']}");
exit();
