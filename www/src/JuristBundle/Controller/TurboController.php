<?php

namespace JuristBundle\Controller;

use JuristBundle\Entity\Answers;
use Symfony\Component\HttpFoundation\Response;

class TurboController extends ApiController
{

    public function RSSAction()
    {
        try {
            $root = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:yandex="http://news.yandex.ru"
                xmlns:media="http://search.yahoo.com/mrss/"
                xmlns:turbo="http://turbo.yandex.ru"
                version="2.0">
            </rss>';

            $xml = new \SimpleXMLElement($root);

            $channel = $xml->addChild('channel');

            $questions = $this->getDoctrine()
                ->getRepository('JuristBundle:Questions')
                ->fetchQuestions(10, 0)
            ;

            foreach ($questions as $question) {
                $channel->addChild('item');

                $channel->item->addAttribute('turbo', 'true');

                $channel->addChild('link', 'https://pravo.rg.ru/rubrics/question/' . $question['q_id'] . '/');
                $channel->addChild('title', $question['q_title']);
                $channel->addChild('description', $question['q_description']);
                $channel->addChild('pubDate', $question['q_date']);
                $channel->addChild('category', $question['r_name']);


                $channel->addChild('content', 'content', 'turbo');
                $channel->addChild('related', 'related', 'yandex');
            }


            $content = $xml->asXML();
        } catch (\Exception $e) {
            $content = 'EXC: ' . $e->getMessage() . ' ### <br/>' . $e->getTraceAsString();
        } catch (\Error $e) {
            $content = 'ERR: ' . $e->getMessage() . ' ### <br/>' . $e->getTraceAsString();
        }

        return new Response(
            $content,
            200,
            [
                'Content-Type' => 'application/rss+xml',
            ]
        );
    }
}
