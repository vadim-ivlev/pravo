<?php

namespace JuristBundle\Entity;

use Doctrine\ORM\EntityRepository;
use JuristBundle\Entity\Rubrics;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
/**
 * RubricsRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RubricsRepository extends \Doctrine\ORM\EntityRepository
{

    const RUBRICS = '/jurists/rubrics/';

    private $oDBALConnection;

    public function __construct($em, $class)
    {
        parent::__construct($em, $class);
        $this->oDBALConnection = $this->getEntityManager()->getConnection();
    }

    public function fetchRubricsDBAL(array $orderBy)
    {
        $sql = "
          SELECT *
          FROM rubrics
        ";

        if ($orderBy) {
            $orderByStr = "ORDER BY ";
            foreach ($orderBy as $field => $paramSort) {
                if(is_numeric($field)) { //Если не передано, то устанавливаем дефолтное значения для $paramSort
                    $field = $paramSort;
                    $paramSort = 'ASC';
                }

                if(!next($orderBy)) $orderByStr .= "{$field} {$paramSort}";
                else $orderByStr .= "{$field} {$paramSort}, ";
            }
            $sql .= $orderByStr;
        }

        $query = $this->oDBALConnection->executeQuery($sql);
        $query->execute();

        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function fetchRubrics($field)
    {
        $rubric_result = [];

        $Rubrics = $this
            ->getEntityManager()
            ->getRepository('JuristBundle:Rubrics')
            ->createQueryBuilder('r')
            ->innerJoin('r.questions', 'q')
            ->where('q.id = :questions_id')
            ->setParameter('questions_id', $field)
            ->getQuery()
            ->getArrayResult();
        foreach ($Rubrics as $rubric){
            $rubric_result[] = [
                'rubric_link' => self::RUBRICS . $rubric['id'],
                'rubric_text' => $rubric['name']
            ];
        }
        return $rubric_result;
    }
}
