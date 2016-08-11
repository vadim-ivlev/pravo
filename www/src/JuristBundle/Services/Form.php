<?php

namespace JuristBundle\Services;

class Form
{
    protected $id_forms = array(
        1 => 'Forms questions'
    );

    public function GetAction($id, array $lengt_field){
        //return 123 . ' ' .  $lengt_field['max_symbols_for_question'];

        if(array_key_exists($id, $this->id_forms)){

            $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);//TODO переделать через request
            $title = $_POST['input'];
            $name = $_POST['name'];
            $city = $_POST['location'];
            $rubric = $_POST['select'];
            $description = $_POST['message'];

            if(!filter_var($email, FILTER_VALIDATE_EMAIL) === true) return 'error';
            if(!isset($_POST['select'])) return 'error';
            if(empty($title) && iconv_strlen(trim($title)) > $lengt_field['max_symbols_for_title_question']) return 'error';//title
            if(iconv_strlen(trim($description)) > $lengt_field['max_symbols_for_question']) return 'error';//message

            if($_POST['confirmation'] == false) return 'error';

            /**
             * сохраняем автора, рубрики и сам вопрос
             */

            $Author = new Author();
            $Author->setName($name);
            $Author->setEmail($email);
            isset($city) ? $Author->setCity($city) : $Author->setCity('');

            $em = $this->connect_to_Jurists_bd;
            $em->persist($Author);
            $em->flush();
            $AuthorId = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Author')
                ->findOneBy([], ['id' => 'DESC']);

            $Questions = new Questions();
            $Questions->setAuthorId($AuthorId);
            $Questions->setStep(self::NEW_STEP);
            $Questions->setTitle(trim($title));
            isset($description) ? trim($Questions->setDescription($description)) : $Questions->setDescription('');

            $em->persist($Questions);
            $em->flush();
            $em->close();


            $QuestionId = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Questions')
                ->findOneBy([], ['id' => 'DESC']);

            $conn = $this->connect_to_Jurists_bd->getConnection();
            $stmt = $conn->prepare(
                "INSERT INTO rubrics_questions (rubrics_id, questions_id) 
                    values(:rubrics_id, :questions_id)");
            $stmt->bindValue('rubrics_id', $rubric);
            $stmt->bindValue('questions_id', $QuestionId->getId());
            $stmt->execute();

            $this->result = array(
                'code' => 200,
                'text' => 'success!'
            );

        } else {
            $this->result = array(
                'code' => 0,
                'text' => 'incorrect data!'
            );
        }
        $response = new JsonResponse();
        $response
            ->setData($this->result, JSON_UNESCAPED_SLASHES)
            ->headers->set('Content-Type', 'application/json');

        return $response;
    }
}