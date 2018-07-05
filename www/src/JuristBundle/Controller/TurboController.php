<?php

namespace JuristBundle\Controller;

use JuristBundle\Entity\Answers;
use Predis\Client;
use Symfony\Component\HttpFoundation\Response;

class TurboController extends ApiController
{
    const TURBO_RSS_LIMIT = 50;
    const YANDEX_TURBO_KEY = 'Pravo:Turbo:RSS';
    const RSS_HEADERS = [
//        'Content-Type' => 'application/rss+xml; charset=utf-8', // в хроме некрасиво отображается
        'Content-Type' => 'application/xml; charset=utf-8',
    ];
    const ERR_HEADERS = [
//        'Content-Type' => 'application/rss+xml; charset=utf-8', // в хроме некрасиво отображается
        'Content-Type' => 'application/json; charset=utf-8',
    ];

    const YANDEX_NS = "http://news.yandex.ru";
    const MEDIA_NS = "http://search.yahoo.com/mrss/";
    const TURBO_NS = "http://turbo.yandex.ru";


    public function RSSAction()
    {
        /** @var Client $redis */
        $redis = $this->redis;

        // DEBUG, delete it
//        if ($_GET['_neg'] == 'teg')
//            $redis->del([self::YANDEX_TURBO_KEY]);
        // DEBUG END, delete it

        $content = $redis->get(self::YANDEX_TURBO_KEY);

        if (!is_null($content)) {
            return new Response(
                $content,
                200,
                self::RSS_HEADERS
            );
        }

        $root = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:yandex="http://news.yandex.ru"
            xmlns:media="http://search.yahoo.com/mrss/"
            xmlns:turbo="http://turbo.yandex.ru"
            version="2.0" compiled-at="' . date('Y-m-d H:i:s') . '">
        </rss>';

        $xml = $this->get('app.cdata_simplexmlelement')->create($root);

        $channel = $xml->addChild('channel');
        $channel->addChild('title', 'Бесплатная юридическая консультация. Российская газета');
        $channel->addChild('link', 'https://pravo.rg.ru/');
        $channel->addChild('description', 'Правовая поддержка граждан: вы можете получить юридическую помощь бесплатно. Практикующие юристы проконсультируют вас онлайн по любым вопросам');
        $channel->addChild('language', 'ru');

        $channel->addChild('yandex:logo', 'https://pravo.rg.ru/touch-icon-ipad-retina.png', self::YANDEX_NS);
        $square_logo = $channel->addChild(
            'yandex:logo',
            'https://pravo.rg.ru/touch-icon-ipad-retina.png',
            self::YANDEX_NS
        );
        $square_logo->addAttribute('type', 'square');

        ## добавим аналитику
        $ya = $channel->addChild('yandex:analytics', null, self::YANDEX_NS);
        $ya->addAttribute('type', 'Yandex');
        $ya->addAttribute('id', '39269930');

        $go = $channel->addChild('yandex:analytics', null, self::YANDEX_NS);
        $go->addAttribute('type', 'Google');
        $go->addAttribute('id', 'UA-7039329-31');

        $ma = $channel->addChild('yandex:analytics', null, self::YANDEX_NS);
        $ma->addAttribute('type', 'MailRu');
        $ma->addAttribute('id', '2808226');

        ## сами вопросы-ответы
        $questions = $this->getDoctrine()
            ->getRepository('JuristBundle:Questions')
            ->fetchQuestionsForTurbo(self::TURBO_RSS_LIMIT)
        ;

        foreach ($questions as $question) {
            $item = $channel->addChild('item');

            $item->addAttribute('turbo', 'true');

            $item->addChild('link', 'https://pravo.rg.ru/rubrics/question/' . $question['q_id'] . '/');
            $item->addChild('title', $this->htmlToPlainText($question['q_title']));
            $item->addChild('description', $this->htmlToPlainText($question['q_description']));
            $item->addChild('pubDate', $question['q_date']);
            $item->addChild('category', $question['r_name']);

            $cdata = '<i>' . $question['author_name'] . '</i><div>' . $question['q_description'] . '</div>';
            $cdata .= '<h3>' . $question['au_name'] . '</h3><div>' . $question['a_answers'] . '</div>';

            $item->addChildCData('turbo:content', $cdata, self::TURBO_NS);
//                $channel->addChild('content', 'content', 'turbo');

            // добавим с той же рубрики 4 вопроса
            $related = $item->addChild('yandex:related', '', self::YANDEX_NS);
            $similarQuestions = $this->getDoctrine()
                ->getRepository('JuristBundle:Questions')
                ->fetchSimilarQuestionsForTurbo($question['q_id'], $question['r_id']);
            foreach ($similarQuestions as $sq) {
                $link = $related->addChild('link', $sq['title']);
                $link->addAttribute('url', 'https://pravo.rg.ru/rubrics/question/' . $sq['id'] . '/');
            }
        }

        ## выкладываем результат
        $content = $xml->asXML();

        $redis->setEx(
            self::YANDEX_TURBO_KEY,
            60 * 5, // на пять минуток
            $content
        );

        try {

        } catch (\Error $e) {
//            $content = 'ERR: ' . $e->getMessage() . ' ### <br/>' . $e->getTraceAsString();
            $content = 'ERR: nothing to show';
            return new Response(
                json_encode($content, JSON_UNESCAPED_UNICODE),
                200,
                self::ERR_HEADERS
            );
        } catch (\Exception $e) {
//            $content = 'EXC: ' . $e->getMessage() . ' ### <br/>' . $e->getTraceAsString();
            $content = 'EXC: nothing to show';
            return new Response(
                json_encode($content, JSON_UNESCAPED_UNICODE),
                200,
                self::ERR_HEADERS
            );
        }

        return new Response(
            $content,
            200,
            self::RSS_HEADERS
        );
    }

    /**
     * Взято с https://stackoverflow.com/a/48454039/6864293
     * @param string $html
     * @return mixed|string
     */
    private function htmlToPlainText(string $html)
    {
        $str = str_replace('&nbsp;', ' ', $html);
        $str = html_entity_decode($str, ENT_QUOTES | ENT_COMPAT , 'UTF-8');
        $str = html_entity_decode($str, ENT_HTML5, 'UTF-8');
        $str = html_entity_decode($str);
        $str = htmlspecialchars_decode($str);
        $str = strip_tags($str);

        return $str;
    }
}
