<?php

namespace JuristBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand as Command;


use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


use Exception;

class ParseBiblioCommand extends Command
{
    #*/30 * * * * php /var/www/pravo/www/bin/console jurist:parseBiblio >> /home/web_crontabs/parse_biblio.log
    const URL = 'https://bibliotechka.rg.ru/api/get_promo.php';

    const KEYS = array(
        'avto' => 'Авто',
        'banki' => 'Банки',
        'biznes' => 'Бизнес',
        'ghilye' => 'Жилье',
        'ghkh' => 'ЖКХ',
        'zemlya' => 'Земля',
        'nalogi' => 'Налоги',
        'nasledstvo' => 'Наследство',
        'obrazovanie' => 'Образование',
        'rabota' => 'Работа',
        'semyya' => 'Семья',
        'socobespechenie' => 'Соцобеспечение',
        'strahovanie' => 'Страхование',
        'sudy' => 'Суды',
        'drugoe' => 'Другое',
    );

    protected function configure()
    {
        $this
            ->setName('jurist:parseBiblio')
            ->setDescription('parser bibliotechka.rg.ru api');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {

            $redis = $this->getContainer()->get('snc_redis.default');


            foreach (self::KEYS as $key => $value) {
                $output->writeln($key . ', ' . $value);

                $rubric = [];

                $raw = file_get_contents(self::URL ."?keyword=". $value ."&limit=5");
                $content = json_decode($raw);

                foreach ($content as $keyArr) {
                    $rubric[] = [
                        'bibliotechka__issue__array' => [
                            'bibliotechka__issue' => [
                                'bibliotechka__issue__name' => $keyArr -> SECTONS -> FIRST,
                                'bibliotechka__issue__number' => $keyArr -> SECTONS -> NUMBER, // Приходит пустой, в админке нет такого поля
                                'bibliotechka__issue__year' => $keyArr -> SECTONS -> SECOND,
                            ]
                        ],
                        'book' => [
                            'book__img' => [
                                'book__img__type_medium' => 1,
                                'book__img__file' => $keyArr -> PREVIEW -> LINK,
                                'book__img__title' => $keyArr -> NAME,
                                'book__img__width' => 107,
                                'book__img__height' => 151,
                            ],
                            'book__img__length' => 1,
                            'book__title' => $keyArr -> NAME,
                            'book__annotation' => $keyArr -> DESCRIPTION,
                            'book__download' => [
                                'book__download__link' => $keyArr -> PDF -> LINK,
                                'book__download__size' => $this->human_filesize($keyArr->PDF->FILE_SIZE),
                                'book__download__type' => $keyArr -> PDF -> CONTENT_TYPE,
                            ],
                            'book__price' => $keyArr -> PRICE,
                            'book__purchase_link' => $keyArr -> LINK,
                        ],
                    ];
                }

                $prepared = serialize($rubric);
//                $prepared = json_encode($rubric, JSON_UNESCAPED_UNICODE);

                $redis->set('biblio:'. $key, $prepared);

                sleep(1); // На всякий случай, что бы Битрикс не заблокировал (или не упал :) )
            }

//            $output->writeln(var_dump(json_encode($bibliotechka_new, JSON_UNESCAPED_UNICODE)));

        } catch (Exception $e) {
            var_export($e->getMessage());
        }
    }

    private function human_filesize($bytes, $decimals = 2) {
        $sz = 'BKMGTP';
        $factor = floor((strlen($bytes) - 1) / 3);
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
    }
}
