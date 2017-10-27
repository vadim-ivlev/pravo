<?php

namespace JuristBundle\Command;

//use Symfony\Component\Console\Command\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand as Command;

use JuristBundle\Entity\AuthUsers;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Exception;

class BCommand extends Command
{

    protected function configure ()
    {

        $this
            ->setName('jurist:redis')
            ->setDescription('check redis');

    }

    protected function execute (InputInterface $input, OutputInterface $output)
    {
        $redis = $this->getContainer()->get('snc_redis.default');
        $output->writeln($redis->set('vasya', 'vaso'));
        $output->writeln($redis->get('vasya'));

    }

}
