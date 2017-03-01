<?php

namespace JuristBundle\Entity;

use Doctrine\ORM\EntityRepository;
use JuristBundle\Entity\Questions;
/**
 * QuestionRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class QuestionsRepository extends \Doctrine\ORM\EntityRepository
{
    private $oDBALConnection;

    public function __construct($em, $class)
    {
        parent::__construct($em, $class);
        $this->oDBALConnection = $this->getEntityManager()->getConnection();
    }

    /**
     * Получаем данные для переданного массив $Answers (откуда берется answer_is)
     * @param array $Answers
     * @return array в отфарматированном виде ['a_id' => ['a_id' = 1, 'some_variable' => 2]]
     */
    public function fetchDataByAnswerId(array $Answers, $finishedStep)
    { //use dbal
        $arrayAnswersId = [];
        foreach ($Answers as $Answer) {
            $arrayAnswersId[] = $Answer->getId();
        }

        $sql = "
          SELECT 
            r.id AS r_id, r.name AS r_name, 
            a.id AS a_id, 
            q.id AS q_id, q.title AS q_title
          FROM 
              answers AS a
              JOIN questions AS q ON q.id = a.question_id
              JOIN rubrics_questions AS rq ON rq.questions_id = q.id
              JOIN rubrics AS r ON r.id = rq.rubrics_id
          WHERE a.id IN (?)
          ORDER BY a.date DESC
        ";
        $query = $this->oDBALConnection->executeQuery(
            $sql,
            [$arrayAnswersId],
            [\Doctrine\DBAL\Connection::PARAM_INT_ARRAY]
        );

        $query->execute();
        $query = $query->fetchAll(\PDO::FETCH_ASSOC);

        return array_combine(
            array_column($query, 'a_id'), //Задаем структуру ['a_id' => ['a_id' = 1, 'some_variable' => 2]]
            $query
        );
    }

    public function fetchQuestions($limit, $offset)
    {
        $sql = "
            SELECT
              q.id AS q_id, q.author_id AS q_author_id, q.authUsers_id AS q_authUsers_id, q.step AS q_step, q.title AS q_title, 
              q.date AS q_date, q.description AS q_description, q.status AS q_status, q.deadline AS q_deadline, q.deadline_id AS q_deadline_id, 
              q.deadline_info AS q_deadline_info, q.title_seo AS q_title_seo, q.description_seo AS q_description_seo, q.keywords_seo AS q_keywords_seo,
              
              a.id AS a_id, a.question_id AS a_question_id, a.auth_users_id AS a_auth_users_id, 
              a.answers AS a_answers, a.answers_steps AS a_answers_steps, a.date AS a_date, a.rating AS a_rating,
              a.typeCards AS a_typeCards, a.secure_entry_check AS a_secure_entry_check, 
              a.entry_feed_check AS a_entry_feed_check, a.entry_feed_date AS a_entry_feed_date, a.actual_user_charge AS a_actual_user_charge,
              
              au.id AS au_id, au.companies_id AS au_companies_id, au.dateEndPay as au_dateEndPay, au.disabled AS au_disabled, au.name AS au_name, 
              au.second_name AS au_second_name, au.filename AS au_filename, au.directory AS au_directory, au.total_rating AS au_total_rating, 
              au.total_count_public_answers AS au_total_count_public_answers,
              
              author.name AS author_name, author.city AS author_city,
              
              t.id AS t_id, t.name AS t_name,
              
              r.id AS r_id, r.name AS r_name
               
            FROM questions AS q 
                INNER JOIN rubrics_questions AS rq ON q.id = rq.questions_id
                INNER JOIN rubrics AS r ON r.id = rq.rubrics_id
                
                INNER JOIN tags_questions AS tq ON q.id = tq.questions_id
                INNER JOIN tags AS t ON t.id = tq.tags_id
                
                INNER JOIN answers AS a ON a.question_id = q.id
                INNER JOIN auth_users AS au ON au.id = q.authUsers_id
                INNER JOIN author ON author.id = q.author_id
            WHERE q.step = :step 
            ORDER BY a.date DESC
            LIMIT :limit
            OFFSET :offset
        ";

        $stmt = $this->oDBALConnection->prepare($sql);
        $stmt->bindValue('limit', $limit, \PDO::PARAM_INT);
        $stmt->bindValue("offset", $offset, \PDO::PARAM_INT);
        $stmt->bindValue("step", \JuristBundle\Controller\ApiController::FINISHED_STEP);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_NAMED);
    }

    public function fetchQuestionsForTag($tagId)
    {
        $sql = "
            SELECT
              q.id AS q_id, q.author_id AS q_author_id, q.authUsers_id AS q_authUsers_id, q.step AS q_step, q.title AS q_title, 
              q.date AS q_date, q.description AS q_description, q.status AS q_status, q.deadline AS q_deadline, q.deadline_id AS q_deadline_id, 
              q.deadline_info AS q_deadline_info, q.title_seo AS q_title_seo, q.description_seo AS q_description_seo, q.keywords_seo AS q_keywords_seo,
              
              a.id AS a_id, a.question_id AS a_question_id, a.auth_users_id AS a_auth_users_id, 
              a.answers AS a_answers, a.answers_steps AS a_answers_steps, a.date AS a_date, a.rating AS a_rating,
              a.typeCards AS a_typeCards, a.secure_entry_check AS a_secure_entry_check, 
              a.entry_feed_check AS a_entry_feed_check, a.entry_feed_date AS a_entry_feed_date, a.actual_user_charge AS a_actual_user_charge,
              
              au.id AS au_id, au.companies_id AS au_companies_id, au.dateEndPay as au_dateEndPay, au.disabled AS au_disabled, au.name AS au_name, 
              au.second_name AS au_second_name, au.filename AS au_filename, au.directory AS au_directory, au.total_rating AS au_total_rating, 
              au.total_count_public_answers AS au_total_count_public_answers,
              
              author.name AS author_name, author.city AS author_city,
              
              t.id AS t_id, t.name AS t_name,
              
              r.id AS r_id, r.name AS r_name
               
            FROM questions AS q 
                INNER JOIN rubrics_questions AS rq ON q.id = rq.questions_id
                INNER JOIN rubrics AS r ON r.id = rq.rubrics_id
                
                INNER JOIN tags_questions AS tq ON q.id = tq.questions_id
                INNER JOIN tags AS t ON t.id = tq.tags_id
                
                INNER JOIN answers AS a ON a.question_id = q.id
                INNER JOIN auth_users AS au ON au.id = q.authUsers_id
                INNER JOIN author ON author.id = q.author_id
            WHERE q.step = :step AND t.id = :t_id
        ";

        $stmt = $this->oDBALConnection->prepare($sql);
        $stmt->bindValue('t_id', $tagId, \PDO::PARAM_INT);
        $stmt->bindValue("step", \JuristBundle\Controller\ApiController::FINISHED_STEP);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_NAMED);
    }

    public function fetchDataByJurist(array $Jurists)
    {
        $arrayJuristsId = [];
        foreach ($Jurists as $Jurist) {
            $arrayJuristsId[] = $Jurist->getId();
        }

        $sql = "
        SELECT 
          r.id AS r_id, r.name AS r_name,
          au.id AS au_id
        FROM 
            auth_users AS au
            JOIN auth_users_rubrics AS aur ON aur.auth_users_id = au.id
            JOIN rubrics AS r ON r.id = aur.rubrics_id
        WHERE au.id IN (?);
        ";

        $query = $this->oDBALConnection->executeQuery(
            $sql,
            [$arrayJuristsId],
            [\Doctrine\DBAL\Connection::PARAM_INT_ARRAY]
        );

        $query->execute();
        $query = $query->fetchAll( \PDO::FETCH_ASSOC);

        /**
         * Создаем массив такой структуры
         *  [
         *      1 => [
         *          ['id' => 1, 'some_data' => 12321],
         *          ['id' => 1, 'some_data' => 123312]
         *      ],
         *      2 => [
         *          ['id' => 2, 'some_data' => 21231],
         *          ['id' => 2, 'some_data' => 21312]
         *      ]
         *  ]
         */
        $result = [];
        foreach ($query as $valQuery) {
            $result[$valQuery['au_id']][] = $valQuery;
        }

        return $result;
    }

    public function fetchTotalRatingJurist(array $Jurists, $finishedStep)
    {
        $arrayJuristsId = [];
        foreach ($Jurists as $Jurist) {
            $arrayJuristsId[] = $Jurist->getId();
        }

        $sql = "
            SELECT sum(a.rating) AS total_rating, au.id AS au_id
            FROM answers a
                JOIN auth_users au ON au.id = a.auth_users_id
            WHERE au.id IN (?)
            GROUP BY au.id;
        ";

        $query = $this->oDBALConnection->executeQuery(
            $sql,
            [$arrayJuristsId],
            [\Doctrine\DBAL\Connection::PARAM_INT_ARRAY]
        );

        $query->execute();
        $query = $query->fetchAll( \PDO::FETCH_ASSOC);

        return array_combine(
            array_column($query, 'au_id'), //Задаем структуру ['a_id' => ['a_id' = 1, 'some_variable' => 2]]
            $query
        );
    }

    private function SqlQueryExec($sql, array $data, array $fieldTypeDBAL)
    {
        $query = $this->oDBALConnection->executeQuery(
            $sql,
            $data,
            $fieldTypeDBAL
        );

        $query->execute();
        return $query->fetchAll( \PDO::FETCH_ASSOC);
    }

    public function totalCountConsultation(array $Jurists, $date = null)
    {
        $arrayJuristsId = [];
        foreach ($Jurists as $Jurist) {
            $arrayJuristsId[] = $Jurist->getId();
        }

        $sql = "
            SELECT count(a.id) AS total_count, au.id AS au_id
            FROM auth_users au 
                JOIN answers a ON a.auth_users_id = au.id
                WHERE au.id IN (?)
            GROUP BY au.id;
        ";

        $resultSql = $this->SqlQueryExec($sql, [$arrayJuristsId], [\Doctrine\DBAL\Connection::PARAM_INT_ARRAY]);

        $result['result'] = array_combine(
            array_column($resultSql, 'au_id'), //Задаем структуру ['a_id' => ['a_id' = 1, 'some_variable' => 2]]
            $resultSql
        );

        if ($date) {
            $sqlDate = "
                SELECT count(a.id) AS total_count, au.id AS au_id
                FROM auth_users au 
                    JOIN answers a ON a.auth_users_id = au.id
                    WHERE au.id IN (?) and a.date > '{$date}'
                GROUP BY au.id;
            ";

            $resultSqlWithDate = $this->SqlQueryExec($sqlDate, [$arrayJuristsId], [\Doctrine\DBAL\Connection::PARAM_INT_ARRAY]);

            $result['result_date'] = array_combine(
                array_column($resultSqlWithDate, 'au_id'), //Задаем структуру ['a_id' => ['a_id' = 1, 'some_variable' => 2]]
                $resultSqlWithDate
            );
        }

        return $result;

    }

    public function getQuestionsLimitOffset($conditions, $limit, $offset, $select)
    {
        if (!$select) $select = '*';

        $sql = "
            SELECT {$select}
            FROM questions AS q
            JOIN answers AS a ON a.question_id = q.id
            JOIN auth_users AS au ON au.id = q.authUsers_id
            JOIN author AS author ON author.id = q.author_id
            WHERE q.step = ?
            ORDER BY a.date DESC
            LIMIT ?
            OFFSET ?
        ";

        $result = $this->fetchAllQuery($sql, [$conditions['step'], $limit, $offset], [\PDO::PARAM_INT, \PDO::PARAM_INT, \PDO::PARAM_INT]);

        return $result;
    }

    public function getAllQuestions($conditions, $select = null)
    {

        if (!$select) $select = '*';

        $sql = "
            SELECT {$select}
            FROM questions AS q
            JOIN answers AS a ON q.id = a.question_id
            WHERE q.step = ?
            ORDER BY a.date DESC
        ";


        $result = $this->fetchAllQuery($sql, [$conditions['step']], [\PDO::PARAM_INT]);

        return $result;
    }

    private function fetchAllQuery($sql, $condition , $DBALParam = null)
    {
        $query = $this->oDBALConnection->executeQuery(
            $sql,
            $condition,
            $DBALParam
        );

        $result = $query->fetchAll(\PDO::FETCH_OBJ);
        return $result;

    }

    public function fetchAllQuestionsForRubric($CPUName)
    {
        $sql = "
          SELECT 
            q.id AS q_id, q.author_id AS q_author_id, q.authUsers_id AS q_authUsers_id, q.step AS q_step, q.title AS q_title, 
            q.date AS q_date, q.description AS q_description, q.status AS q_status, q.deadline AS q_deadline, q.deadline_id AS q_deadline_id, 
            q.deadline_info AS q_deadline_info, q.title_seo AS q_title_seo, q.description_seo AS q_description_seo, q.keywords_seo AS q_keywords_seo,
            
            a.id AS a_id, a.question_id AS a_question_id, a.auth_users_id AS a_auth_users_id, 
            a.answers AS a_answers, a.answers_steps AS a_answers_steps, a.date AS a_date, a.rating AS a_rating,
            a.typeCards AS a_typeCards, a.secure_entry_check AS a_secure_entry_check, 
            a.entry_feed_check AS a_entry_feed_check, a.entry_feed_date AS a_entry_feed_date, a.actual_user_charge AS a_actual_user_charge,
            
            au.id AS au_id, au.companies_id AS au_companies_id, au.dateEndPay as au_dateEndPay, au.disabled AS au_disabled, au.name AS au_name, 
            au.second_name AS au_second_name, au.filename AS au_filename, au.directory AS au_directory, au.total_rating AS au_total_rating, 
            au.total_count_public_answers AS au_total_count_public_answers,
            
            author.name AS author_name, author.city AS author_city,
            
            t.id AS t_id, t.name AS t_name, t.disabled AS t_disabled,
            
            r.id AS r_id, r.name AS r_name
          FROM questions AS q 
            INNER JOIN rubrics_questions AS rq ON q.id = rq.questions_id
            INNER JOIN rubrics AS r ON r.id = rq.rubrics_id
            
            INNER JOIN tags_questions AS tq ON q.id = tq.questions_id
            INNER JOIN tags AS t ON t.id = tq.tags_id
            
            INNER JOIN answers AS a ON a.question_id = q.id
            INNER JOIN auth_users AS au ON au.id = q.authUsers_id
            INNER JOIN author ON author.id = q.author_id
            
          WHERE r.CPU_name = :CPU_name AND q.step = :step
          ORDER BY a.date DESC
        ";

        $stmt = $this->oDBALConnection->prepare($sql);
        $stmt->bindValue("CPU_name", $CPUName);
        $stmt->bindValue("step", \JuristBundle\Controller\ApiController::FINISHED_STEP);
        $stmt->execute();

        //return $stmt->fetchAll(\PDO::FETCH_OBJ);
        return $stmt->fetchAll(\PDO::FETCH_NAMED);
    }
}

