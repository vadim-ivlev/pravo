<?php

namespace JuristBundle\Command;

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

class CountPublicAnswersForJuristCommand extends Command implements ContainerAwareInterface
{
    const NAME_BD = 'jurist';
    private $db;

    public function setContainer(ContainerInterface $container = null)
    {

        $this->db = $this->getContainer()->get('doctrine')->getEntityManager(self::NAME_BD);
    }

    protected function configure ()
    {

        $this
            ->setName('count:public:answers:for:jurist')
            ->setDescription('CountPublicAnswersForJuristCommand');

    }

    protected function execute (InputInterface $input, OutputInterface $output)
    {

        try {
            $output->writeln('Start ' . date('Y-m-d H:i:s'));

            $sql = "SELECT id FROM auth_users WHERE is_jurist = :is_jurist AND disabled = :disabled AND id != :id";

            $stmt = $this->db->getConnection()->prepare($sql);
            $stmt->bindValue("is_jurist", true);
            $stmt->bindValue("disabled", \JuristBundle\Controller\ApiController::VALUE_ACTIVE_USER);
            $stmt->bindValue("id", \JuristBundle\Controller\ApiController::ID_USER_WITHOUT_AVATARS);
            $stmt->execute();
            foreach($stmt->fetchAll(\PDO::FETCH_NAMED) as $jurist) {
                $sql = "SELECT COUNT(a.id) AS a_rating
                        FROM answers AS a
                        JOIN questions AS q ON a.question_id = q.id
                        WHERE q.step = :step AND a.auth_users_id = :auth_users_id";
                $stmt = $this->db->getConnection()->prepare($sql);
                $stmt->bindValue("step", \JuristBundle\Controller\ApiController::FINISHED_STEP);
                $stmt->bindValue("auth_users_id", $jurist['id']);
                $stmt->execute();
                $totalCountPublicAnswersJurist = $stmt->fetchColumn();

                $this->db->getConnection()->executeUpdate('UPDATE auth_users SET total_count_public_answers = ? WHERE id = ?', [$totalCountPublicAnswersJurist, $jurist['id']]);
            }

            $output->writeln('End ' . date('Y-m-d H:i:s'));
        } catch (Exception $e) {
            var_export($e->getMessage());
        }

    }
}