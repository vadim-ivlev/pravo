<?php

namespace JuristBundle\Controller;

use Symfony\Component\HttpFoundation\Response;

class TurboController extends ApiController
{

    public function RSSAction()
    {
        try {
            $root = '<?xml version="1.0" encoding="utf-8"?>
            <rss xmlns:yandex="http://news.yandex.ru"
    xmlns:media="http://search.yahoo.com/mrss/"
    xmlns:turbo="http://turbo.yandex.ru"
    version="2.0">
            </rss>';

            $xml = new \SimpleXMLElement($root);

            $channel = $xml->addChild('channel', 'rss 2.0 coming soon...');

            $channel->addChild('item');

            $channel->item->addAttribute('turbo', 'true');

            $content = $xml->asXML();
        } catch (\Exception $e) {
            $content = 'EXC: ' . $e->getTraceAsString();
        } catch (\Error $e) {
            $content = 'ERR: ' . $e->getTraceAsString();
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
