<?php

namespace JuristBundle\Repository;

USE JuristBundle\Entity\SsiStoragePath;
/**
 * SsiStoragePathRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class SsiStoragePathRepository extends \Doctrine\ORM\EntityRepository
{
    private $oDBALConnection;

    public function __construct($em, $class)
    {
        parent::__construct($em, $class);
        $this->oDBALConnection = $this->getEntityManager()->getConnection();
    }

    public function savePath($path)
    {
        try {
            $checkPath = $this
                ->getEntityManager()
                ->getRepository('JuristBundle:SsiStoragePath')
                ->findOneByPath($path);

            if (!(bool)$checkPath) {
                $SsiStoragePath = new SsiStoragePath();
                $SsiStoragePath->setPath($path);

                $em = $this->getEntityManager();

                $em->persist($SsiStoragePath);
                $em->flush();
            }

            return true;
        } catch (\PDOException $e) {
            dump($e->getMessage());
        }

        return false;
    }
}
