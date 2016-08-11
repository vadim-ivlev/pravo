<?php

namespace JuristBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Mustache_Engine;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Configer;
use Symfony\Component\HttpFoundation\Request;
class QuestionController extends Controller
{
    public function getQuestionsAction(Request $request, $rubric,$tag){


        $m = new Mustache_Engine();
        $config = $this->get("app.configer");
        $template_url = $config->getBy($this, 'jurists_templates', 'root_web');
        $data_url = $config->getBy($this, 'jurists_templates', 'root_data');
        if($tag){
            $template_filename = $config->getBy($this, 'jurists_templates', 'get_questions_of_tag:tmpl');
            $data_filename = $config->getBy($this, 'jurists_templates', 'get_questions_of_tag:data');
        } elseif ($rubric){
            $template_filename = $config->getBy($this, 'jurists_templates', 'get_questions_of_rubric:tmpl');
            $data_filename = $config->getBy($this, 'jurists_templates', 'get_questions_of_rubric:data');
        } else{
            $template_filename = $config->getBy($this, 'jurists_templates', 'get_list_of_questions:tmpl');
            $data_filename = $config->getBy($this, 'jurists_templates', 'get_list_of_questions:data');
        }
		$text = @file_get_contents($template_url.$template_filename);
		$data = @file_get_contents($data_url.$data_filename);

		$rendered = $m->render($text, json_decode($data));

        return new Response($rendered);       
    }

    public function createQuestionAction(){
        $m = new Mustache_Engine();
        $config = $this->get("app.configer");
        $template_url = $config->getBy($this, 'jurists_templates', 'root_web');
        $template_filename = $config->getBy($this, 'jurists_templates', 'create_question:tmpl');
        $data_url = $config->getBy($this, 'jurists_templates', 'root_data');
        $data_filename = $config->getBy($this, 'jurists_templates', 'create_question:data');
        $text = @file_get_contents($template_url.$template_filename);
        $data = @file_get_contents($data_url.$data_filename);
        print $m->render($text, json_decode($data));

        return new Response();
    }

    public function getAnswerAction($id){
        $m = new Mustache_Engine();
        $config = $this->get("app.configer");
        $template_url = $config->getBy($this, 'jurists_templates', 'root_web');
        $template_filename = $config->getBy($this, 'jurists_templates', 'get_answer:tmpl');
        $data_url = $config->getBy($this, 'jurists_templates', 'root_data');
        $data_filename = $config->getBy($this, 'jurists_templates', 'get_answer:data');
        $text = @file_get_contents($template_url.$template_filename);
        $data = @file_get_contents($data_url.$data_filename);
        print $m->render($text, json_decode($data));

        return new Response();
    }

}
