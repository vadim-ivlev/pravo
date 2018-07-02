<?php

namespace JuristBundle\Controller;

use JuristBundle\Entity\Answers;
use Symfony\Component\HttpFoundation\Response;

class TurboController extends ApiController
{
    const TURBO_RSS_LIMIT = 10;

    public function RSSAction()
    {
        try {
            $root = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:yandex="http://news.yandex.ru"
                xmlns:media="http://search.yahoo.com/mrss/"
                xmlns:turbo="http://turbo.yandex.ru"
                version="2.0">
            </rss>';

//            $xml = new \SimpleXMLElement($root);
            $xml = $this->get('app.cdata_simplexmlelement')->create($root);

            $channel = $xml->addChild('channel');

            $questions = $this->getDoctrine()
                ->getRepository('JuristBundle:Questions')
                ->fetchQuestions(self::TURBO_RSS_LIMIT, 0)
            ;

            foreach ($questions as $question) {
                $channel->addChild('item');

                $channel->item->addAttribute('turbo', 'true');

                $channel->addChild('link', 'https://pravo.rg.ru/rubrics/question/' . $question['q_id'] . '/');
                $channel->addChild('title', $question['q_title']);
                $channel->addChild('description', $question['q_description']);
                $channel->addChild('pubDate', $question['q_date']);
                $channel->addChild('category', $question['r_name']);

                $cdata = '<i>' . $question['author_name'] . '</i><div>' . $question['q_description'] . '</div>';
                $cdata .= '<h3>' . $question['au_name'] . '</h3><div>' . $question['a_answers'] . '</div>';
                $channel->addChildCData('content', $cdata);


                $channel->addChild('content', 'content', 'turbo');
                $channel->addChild('related', 'related', 'yandex');
            }


            $content = $xml->asXML();
        } catch (\Error $e) {
            $content = 'ERR: ' . $e->getMessage() . ' ### <br/>' . $e->getTraceAsString();
        } catch (\Exception $e) {
            $content = 'EXC: ' . $e->getMessage() . ' ### <br/>' . $e->getTraceAsString();
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
