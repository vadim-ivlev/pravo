<?php

namespace JuristBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Exception;

class RatingJuristCountCommand extends Command
{

    protected function configure()
    {
        $this
            ->setName('jurist:ratingJuristCount')
            ->setDescription('rating jurist count');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            
            $output->writeln('success rating count');
        } catch (Exception $e) {
            var_export($e->getMessage());
        }
    }
}
