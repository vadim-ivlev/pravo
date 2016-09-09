<?php

namespace JuristBundle\Command;

//use Symfony\Component\Console\Command\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand as Command;

use JuristBundle\Entity\AuthUsers;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Exception;

class RatingJuristCountCommand extends Command
{
    const FINISHED_STEP = 15;
    const DISABLED_VALUE_ON = false;//значение, когда АКТИВЕН юзер
    const IS_JURIST = true;//юрист
    const ID_USER_WITHOUT_AVATARS = 6;//юрист

    protected function configure ()
    {
        $this
            ->setName('jurist:ratingJuristCount')
            ->setDescription('rating jurist count');
    }

    protected function execute (InputInterface $input, OutputInterface $output)
    {
        try {
            $property = $this->getContainer()->get('doctrine')->getEntityManager();
            /**
                        SELECT
                            a.auth_users_id, sum(a.rating) totatl_rating,
                            au.second_name, au.id
                        FROM answers a
                        left join questions q
                            on q.id = a.question_id
                        left join auth_users au
                            on au.id = a.auth_users_id
                        where
                            q.step = 15
                            and au.disabled = false
                        group by a.auth_users_id
                        order by totatl_rating desc;
            **/

            /**
            SELECT a.id a_id, q.step, sum(a.rating) total_rating
            FROM JuristBundle\Entity\Answers a
                INNER JOIN a.question q
                    WITH q.id = a.question
                INNER JOIN a.authUsersId au
                    WITH q.AuthUsersId = au.id
            WHERE
               q.step = :step
               AND au.disabled = :disabled
               AND au.isJurist = :isJurist
               AND au.id != :idAvatarUser
               GROUP BY a.authUsersId"

             */
            $Answers = $property
                ->getRepository('JuristBundle:Answers')
                ->createQueryBuilder('a')
                ->select('a.id a_id, q.step q_step, sum(a.rating) total_rating, au.id au_id, au.secondName')
                ->innerJoin('a.question', 'q', 'WITH', 'q.id = a.question')
                ->innerJoin('a.authUsersId', 'au', 'WITH', 'q.AuthUsersId = au.id')
                ->where('q.step = :step')
                ->andWhere('au.disabled = :disabled')
                ->andWhere('au.isJurist = :isJurist')
                ->andWhere('au.id != :idAvatarUser')
                ->setParameters([
                    'step' => self::FINISHED_STEP, 'disabled' => self::DISABLED_VALUE_ON,
                    'isJurist' => self::IS_JURIST, 'idAvatarUser' => self::ID_USER_WITHOUT_AVATARS
                ])
                ->groupBy('a.authUsersId')
                ->getQuery()
                ->execute();
                //->getDQL();dump($Answers);die;


            $Answer_update = $this
                ->getContainer()
                ->get('doctrine')
                ->getEntityManager();
            
            foreach ($Answers as $key => $Answer) {
                $record = $Answer_update
                    ->getRepository('JuristBundle:AuthUsers')
                    ->findOneById($Answer['au_id']);
                if ($record != null) {
                    $record->setTotalRating($Answer['total_rating']);
                }
            }

            $Answer_update->flush();
            $output->writeln('success rating count ' . date('Y-m-d H:i:s'));
        } catch (Exception $e) {
            var_export($e->getMessage());
        }
    }
}
