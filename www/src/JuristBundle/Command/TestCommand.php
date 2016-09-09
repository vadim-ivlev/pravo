<?php

namespace JuristBundle\Command;

//use Symfony\Component\Console\Command\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand as Command;

use JuristBundle\Entity\AuthUsers;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Exception;

class TestCommand extends Command
{
    const FINISHED_STEP = 15;
    const DISABLED_VALUE_ON = false;//значение, когда АКТИВЕН юзер
    const IS_JURIST = true;//юрист
    const ID_USER_WITHOUT_AVATARS = 6;//юрист

    protected function configure ()
    {
        $this
            ->setName('jurist:test')
            ->setDescription('rating jurist count');
    }

    protected function execute (InputInterface $input, OutputInterface $output)
    {
        try {
            file_put_contents('/var/www/pravo/www/src/JuristBundle/Command/a.txt', date('Y-m-d H:i:s'));

            $output->writeln('test');
        } catch (Exception $e) {
            var_export($e->getMessage());
        }
    }
}
