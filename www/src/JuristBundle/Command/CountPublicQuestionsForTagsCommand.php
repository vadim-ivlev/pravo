<?php

namespace JuristBundle\Command;

//use Symfony\Component\Console\Command\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand as Command;

use JuristBundle\Entity\AuthUsers;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use JuristBundle\Entity\AnswersRepository;
use JuristBundle\Entity\AuthUsersRepository;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use JuristBundle\Controller\ApiController;

use Exception;

class CountPublicQuestionsForTagsCommand extends Command implements ContainerAwareInterface
{
    const NAME_BD = 'jurist';

    public function setContainer(ContainerInterface $container = null)
    {

        $this->db = $this->getContainer()->get('doctrine')->getEntityManager(self::NAME_BD);
    }

    protected function configure ()
    {

        $this
            ->setName('jurist:count:public:question:for:tags')
            ->setDescription('CountPublicQuestionsForTagsCommand');

    }

    protected function execute (InputInterface $input, OutputInterface $output)
    {

        try {
            $output->writeln('Start ' . date('Y-m-d H:i:s'));

            $rubrics = $this->db
                ->getRepository('JuristBundle:Rubrics')
                ->findBy([], ['name' => 'ASC']);

            foreach ($rubrics as $rubric) {
                foreach ($rubric->getTags()->toArray() as $val_tags) {
                    if (!empty($val_tags->getName())) {

                      $total_frequency = 0;

                      foreach ($val_tags->getQuestions()->toArray() as $check_finished_step) {
                          if ($check_finished_step->getStep() >= \JuristBundle\Controller\ApiController::FINISHED_STEP) ++$total_frequency;
                      }

                        $tags = $this->db->getRepository('JuristBundle:Tags')->find($val_tags->getId());

                        if (!$tags) continue;

                        $tags->setCountPublicQuestions($total_frequency);
                        $this->db->flush();
                    }
                }
            }

            $output->writeln('End ' . date('Y-m-d H:i:s'));
        } catch (Exception $e) {
            var_export($e->getMessage());
        }

    }
}