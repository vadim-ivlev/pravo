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
use JuristBundle\Entity\VoteIp;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Exception;

class RatingController extends ApiController
{

    public function GetAction($id = null)
    {//http://workspace_jurist/app_dev.php/rating/id/

        //dump($this->container->get('request_stack')->getCurrentRequest());die;
        if(isset($id)) {

            $voteIp = new VoteIp();
            //$this->container->get('request')->getClientIp()
            $voteIp->setIp($this->container->get('request_stack')->getCurrentRequest()->getClientIp(). ' ' . $id);

            $em = $this->connect_to_Jurists_bd;
            $em->persist($voteIp);

            try {
                $em->flush();
            } catch( Exception $e ) {//доделать при возможности на 23000(1062) уникальное поле обработку ошибки
                //if($e->getCode() == '2300')
                    //echo $e->getMessage();
                        $rating = array(
                            'status' => 500
                        );
                        $response = new JsonResponse();
                        $response
                            ->setData($rating, JSON_UNESCAPED_SLASHES)
                            ->headers->set('Content-Type', 'application/json');
                        return $response;
                //}

                //else throw $e;
            } /*finally {
                //TODO доделать закрытие коннекта
            }*/

            $answer = $this->connect_to_Jurists_bd->
                            getRepository('JuristBundle:Answers')->
                            findOneById($id);
            if (!$answer) {
                throw $this->createNotFoundException(
                    'No answer found for id ' . $id
                );
            }

            $rating = $answer->getRating();

            $answer->setRating(++$rating);
            $this->connect_to_Jurists_bd->flush();

            $em->close();

            $rating = array(
                'rating' => $rating,
                'status' => 200
            );
            $response = new JsonResponse();
            $response
                ->setData($rating, JSON_UNESCAPED_SLASHES)
                ->headers->set('Content-Type', 'application/json');
            return $response;
        }
    }
}