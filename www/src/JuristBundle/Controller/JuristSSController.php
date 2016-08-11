<?php

namespace JuristBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Mustache_Engine;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Configer;
use Symfony\Component\HttpFoundation\Request;

class JuristSSController extends Controller
{
    public function getAllAction(){
        $m = new Mustache_Engine();
        $config = $this->get("app.configer");
        $template_url = $config->getBy($this, 'jurists_templates', 'root_web');
        $template_filename = $config->getBy($this, 'jurists_templates', 'get_list_of_jurists:tmpl');
        $data_url = $config->getBy($this, 'jurists_templates', 'root_data');
        $data_filename = $config->getBy($this, 'jurists_templates', 'get_list_of_jurists:data');
        $text = @file_get_contents($template_url.$template_filename);
        $data = @file_get_contents($data_url.$data_filename);
        print $m->render($text, json_decode($data));

        return new Response();
    }

    public function getOneAction($id){
        $m = new Mustache_Engine();
        $config = $this->get("app.configer");
        $template_url = $config->getBy($this, 'jurists_templates', 'root_web');
        $template_filename = $config->getBy($this, 'jurists_templates', 'get_one_jurist:tmpl');
        $data_url = $config->getBy($this, 'jurists_templates', 'root_data');
        $data_filename = $config->getBy($this, 'jurists_templates', 'get_one_jurist:data');
        $text = @file_get_contents($template_url.$template_filename);
        $data = @file_get_contents($data_url.$data_filename);
        print $m->render($text, json_decode($data));

        return new Response();
    }

}
