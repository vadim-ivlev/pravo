<?php

namespace JuristBundle\Controller;

use JuristBundle\Entity\SectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use JuristBundle\Entity\Questions;
use JuristBundle\Entity\Author;
use JuristBundle\Entity\Rubrics;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class FormsController - Обработка заданного вопроса
 * @package JuristBundle\Controller
 */
class FormsController extends ApiController
{

    const MAX_SYMBOLS_FOR_QUESTION = 1800;
    const MAX_SYMBOLS_FOR_TITLE_QUESTION = 150;

    protected $id_forms = array(
        1 => 'Forms questions'
    );

    public function GetAction($id = null)
    { //https://front.rg.ru/jurists/ask/html/

        if (array_key_exists($id, $this->id_forms)) {

            $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL); //TODO переделать через request и сервис, который уже начал делать
            $title = $_POST['input'];
            $name = $_POST['name'];
            $city = $_POST['location'];
            $rubric = $_POST['select'];
            $description = $_POST['message'];

            if (!filter_var($email, FILTER_VALIDATE_EMAIL) === true) return 'error';
            if (!isset($_POST['select'])) return 'error';
            if (empty($title) && iconv_strlen(trim($title)) > self::MAX_SYMBOLS_FOR_TITLE_QUESTION) return 'error'; //title
            if (iconv_strlen(trim($description)) > self::MAX_SYMBOLS_FOR_QUESTION) return 'error'; //message

            if ($_POST['confirmation'] == false) return 'error';

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

            /**
             * Отправка письма о success, не плохо бы переделать, впрочем, как и весь проект
             */
             if ($ch = curl_init()) {

                 $url = "https://jurist-admin.rg.ru/project/mailer.php?email={$email}";

                 curl_setopt($ch, CURLOPT_URL, $url);
                 curl_setopt($ch, CURLOPT_HEADER, 0);
                 curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 5.1; rv:34.0) Gecko/20100101 Firefox/34.0');

                 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);

                 curl_exec($ch);

             }

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