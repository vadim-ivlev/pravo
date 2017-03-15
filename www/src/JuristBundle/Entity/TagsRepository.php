<?php

namespace JuristBundle\Entity;

use Doctrine\ORM\EntityRepository;
use JuristBundle\Entity\Tags;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
/**
 * TagsRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class TagsRepository extends \Doctrine\ORM\EntityRepository
{

    private $oDBALConnection;

    public function __construct($em, $class)
    {
        parent::__construct($em, $class);
        $this->oDBALConnection = $this->getEntityManager()->getConnection();
    }

    const TAGS = '/jurists/tags/';
    const TAGS_FIELD = 'tags', RUBRICS_FIELD = 'rubrics';

    public function fetchTags($field) {
        $tags_result = [];

        $Tags = $this
            ->getEntityManager()
            ->getRepository('JuristBundle:Tags')
            ->createQueryBuilder('t')
            ->innerJoin('t.questions', 'q')
            ->where('q.id = :questions_id')
            ->setParameter('questions_id', $field)
            ->getQuery()
            ->getArrayResult();

        foreach ($Tags as $tag_result){
            $tags_result[] = [
                'tags_title' => $tag_result['name'],
                'tags_link' => self::TAGS . $tag_result['id']
            ];
        }
        return $tags_result;
    }

    /**
     * @param array $fieldName - например rubrics
     * @param array $id - например 6
     * @return bool
     */
    public function invalidateCacheSSI($fieldName, $id)
    {
        $delimiter = \JuristBundle\Controller\GenerateSSIController::TABLE_SEPARATOR;
        // Были проблемы, когда приходила 4 искалось 494
        /*$sql = "
            SELECT path
            FROM ssi_storage_path
            WHERE
                path like '%{$fieldName}-%{$id}/'
                OR path like '%{$fieldName}-{$id}%'
                OR path like '%{$fieldName}-{$id}{$delimiter}%/'
                OR path like '%{$fieldName}-%{$delimiter}{$id}{$delimiter}%/';
        ";*/

        $sql = "
            SELECT path
            FROM ssi_storage_path
            WHERE
                path like '%{$fieldName}-{$id}{$delimiter}%' OR
                path like '%{$fieldName}-{$id}/%' OR
                path like '%{$fieldName}-%{$delimiter}{$id}/%' OR
                path like '%{$fieldName}-%{$delimiter}{$id}{$delimiter}%';
        ";

        try {
            $stmt = $this->oDBALConnection->prepare($sql);

            $stmt->execute();

            return $stmt->fetchAll(\PDO::FETCH_NAMED);

        } catch (\PDOException $e) {
            $e->getTrace();
        }
    }


    public function getAllRelatedRubricsTags($fieldName, $id)
    {
        $sql = "
            SELECT 
                tags_id AS tags, r.CPU_name AS rubrics
            FROM tags_rubrics
              JOIN rubrics AS r ON r.id = rubrics_id
            WHERE {$fieldName}_id = :id
        ";

        try {
            $stmt = $this->oDBALConnection->prepare($sql);
            $stmt->bindValue('id', $id);

            $stmt->execute();
        } catch (\PDOException $e) {
            $e->getTrace();
        }

        $targetFiled = (($fieldName === self::TAGS_FIELD) ? self::RUBRICS_FIELD : self::TAGS_FIELD);
        $results = [];

        foreach ($stmt->fetchAll(\PDO::FETCH_NAMED) AS $path) {
            $resultInvalidateCacheSSI = $this->invalidateCacheSSI($targetFiled, $path[$targetFiled]);

            if (!empty($resultInvalidateCacheSSI))
                $results = array_merge($results, $resultInvalidateCacheSSI);
        }

        return $results;
    }
}
