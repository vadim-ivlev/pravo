<?php

namespace JuristBundle\Classes\ValidateSSIFabric;

use Symfony\Component\HttpFoundation\Response;

use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;


class ValidateSSIFactory extends ValidateSSIFactoryAbstract
{
    public function __construct(EntityManager $em, ContainerInterface $container)
    {
        parent::__construct($em, $container);
    }

    public function make($name)
    {
        /**
         * Актуально на 15.03.17
         * 0) Логика такая (вопросы с главной без рубрик, тегов или юристов в указание пути такого вида /include/tmpl-foo/
         * или /include/tmpl-bar/limit-1/ или /include/tmpl-baz/offset-10/ или /include/tmpl-foo_bar_baz/order_by-a_id ETC
         * ДОБАВЛЯЮТСЯ ВСЕГДА к описанному ниже)
         *  1) Если Jurist-id -> находим через id все его рубрики через связь рубрик ищем все связанные теги и самого юриста + пункт 0
         *  2) Если Questions-id -> находим через id все связанные рубрики, все связанные с рубрикой теги и самого юриста + пункт 0
         *  3) Если Rubrics-id -> находим через id именно эту рубрику, через нее по связям ищем связанные теги и юристов + пункт 0
         *  4) Если Tags-id -> находим через id все связанные рубрики и через них связанных юристов и теги, + пункт 0
         */

        try {
            switch ($name) {
                case (bool)preg_match('/^' . static::JURIST_FACTORY . '\d*$/', $name):
                    return new InvalidateSSIJurist($this->em, $name, $this->container);
                break;
                case (bool)preg_match('/^' . static::TAG_FACTORY . '\d*$/', $name):
                    return new InvalidateSSITags($this->em, $name, $this->container);
                break;
                case (bool)preg_match('/^' . static::RUBRIC_FACTORY . '\d*$/', $name):
                    return new InvalidateSSIRubrics($this->em, $name, $this->container);
                break;
                case (bool)preg_match('/^' . static::QUESTION_FACTORY . '\d*$/', $name):
                    return new InvalidateSSIQuestion($this->em, $name, $this->container);
                break;
                default:
                    throw new \Exception('Class not register');
            }
        } catch (\Exception $e) {
            return null;
        }

    }

}