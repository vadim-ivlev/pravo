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
    {

        if(isset($id)) {

            $voteIp = new VoteIp();
            $voteIp->setIp($this->container->get('request_stack')->getCurrentRequest()->getClientIp(). ' ' . $id);

            $em = $this->connect_to_Jurists_bd;
            $em->persist($voteIp);

            try {
                $em->flush();
            } catch( Exception $e ) {
                $rating = [
                    'status' => 500
                ];
                $em->close();
                $response = new JsonResponse();
                $response
                    ->setData($rating, JSON_UNESCAPED_SLASHES)
                    ->headers->set('Content-Type', 'application/json');
                return $response;
            }

            $answer = $this->connect_to_Jurists_bd->
                            getRepository('JuristBundle:Answers')->
                            findOneById($id);
            if (!$answer) {
                throw $this->createNotFoundException(
                    'No answer found for id ' . $id
                );
            }

            $rating = $answer->getRating();

            $idForQuestion = $answer->getQuestion()->getId();

            $answer->setRating(++$rating);
            $this->connect_to_Jurists_bd->flush();

            $em->close();

            $this->redis->del("PravoQuestionAnswers({$idForQuestion})"); // Удаляем кеш

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