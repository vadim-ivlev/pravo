<?php

namespace JuristBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Exception;

class PullTemplatesCommand extends Command
{

    const URL = 'https://jurist.dev.rg.ru/res/templates/custom/projects/juristical/templates/';
    //const URL = 'https://rg.ru/res/templates/custom/projects/juristical/templates/';
    const UPLOADS_DIRS = '/var/www/front/src/JuristBundle/Resources/views/';
    const REQUIRED_TEMPLATES = array(
        'main', 'rubric_questions', 'tag_questions', 'answer', 'users', 'lawer', 'rubrics', 'rules', 'partners', 'ask',
    );

    protected function configure()
    {
        $this
            ->setName('jurist:pullTemplates')
            ->setDescription('pull templates');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            foreach (self::REQUIRED_TEMPLATES as $template) {

                $ch = curl_init();
                curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_URL, self::URL . $template . '.html');
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);//игнорирует сломанны сертификат
                $data = curl_exec($ch);
                curl_close($ch);

                file_put_contents(self::UPLOADS_DIRS . $template . '.html', $data);
                //file_put_contents(self::UPLOADS_DIRS . $template . '.html', file_get_contents(self::URL . $template . '.html'));
            }

            $output->writeln('success update templates');
        } catch (Exception $e) {
            var_export($e->getMessage());
        }
    }
}
