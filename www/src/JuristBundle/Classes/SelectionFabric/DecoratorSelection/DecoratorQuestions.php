<?php

namespace JuristBundle\Classes\SelectionFabric\DecoratorSelection;

class DecoratorQuestions implements DecoratorQueryInterface, DecoratorCountInterface
{
    public function selectCount(&$query)
    {
        $query .= "
                COUNT(DISTINCT q.id) AS count_records
            ";

        unset($query);
    }

    public function fromCount(&$query)
    {
        $this->from($query);

        unset($query);
    }

    public function select(&$query)
    {
        // DATE_FORMAT(q.date,'%m.%d.%Y') AS q_date,
        $query .= "
            q.id AS q_id, q.author_id AS q_author_id, q.authUsers_id AS q_authUsers_id, q.step AS q_step, q.title AS q_title, 
            q.description AS q_description, q.status AS q_status, q.deadline AS q_deadline, q.deadline_id AS q_deadline_id, 
            q.deadline_info AS q_deadline_info, q.title_seo AS q_title_seo, q.description_seo AS q_description_seo, q.keywords_seo AS q_keywords_seo,
            
            a.id AS a_id, a.question_id AS a_question_id, a.auth_users_id AS a_auth_users_id, 
            a.answers AS a_answers, a.answers_steps AS a_answers_steps, a.date AS a_date, a.rating AS a_rating,
            a.typeCards AS a_typeCards, a.secure_entry_check AS a_secure_entry_check, 
            a.entry_feed_check AS a_entry_feed_check, a.entry_feed_date AS a_entry_feed_date, a.actual_user_charge AS a_actual_user_charge,
            
            au.id AS au_id, au.companies_id AS au_companies_id, IF(au.dateEndPay > NOW(), 1, 0) AS au_dateEndPay, au.disabled AS au_disabled, au.name AS au_name, 
            au.second_name AS au_second_name, au.filename AS au_filename, au.directory AS au_directory, au.total_rating AS au_total_rating, 
            au.total_count_public_answers AS au_total_count_public_answers,
            
            author.name AS author_name, author.city AS author_city,
            
            (
			  SELECT 
				CONCAT('[', 
				GROUP_CONCAT('
					{
						\"tags__id\":\"', t1.id, 
						'\",\"tags__link\":\"/tag/', t1.id,
						'/\",\"tags__disabled\":\"', t1.disabled,
						'\",\"tags__title\":\"', t1.name SEPARATOR '\"
					}, '), '\", \"tags__LAST__\": 1}]' 
			)
			  FROM tags AS t1
				JOIN tags_questions AS tq1 ON (tq1.tags_id = t1.id AND t1.disabled = 1)
			  WHERE tq1.questions_id = q.id  
			) AS `tags`,
            
            r.id AS r_id, r.name AS r_name, r.CPU_name AS r_CPU_name
        ";

        unset($query);
    }

    /**
     * INNER JOIN tags_questions AS tq ON q.id = tq.questions_id
     * INNER JOIN tags AS t ON t.id = tq.tags_id
     */
    public function from(&$query)
    {
        $query .= "
            questions AS q 
                INNER JOIN rubrics_questions AS rq ON q.id = rq.questions_id
                INNER JOIN rubrics AS r ON r.id = rq.rubrics_id
                
                INNER JOIN answers AS a ON a.question_id = q.id
                INNER JOIN auth_users AS au ON au.id = q.authUsers_id
                INNER JOIN author ON author.id = q.author_id 
        ";

        unset($query);
    }

    public function where(&$query, array $id = null)
    {
        $au_disabled = (\JuristBundle\Controller\ApiController::DISABLED_VALUE_ON ? 'true' : 'false');
        $query .=
            "q.step = " . \JuristBundle\Controller\ApiController::FINISHED_STEP
            . " AND au.is_jurist = " . true
            . " AND au.id != " . \JuristBundle\Controller\ApiController::ID_USER_WITHOUT_AVATARS
            . " AND au.disabled = {$au_disabled}"
        ;

        if (!empty($id))
            $query .= " AND q.id in (" . implode(' ,', $id) . ")";

        unset($query);
    }
}