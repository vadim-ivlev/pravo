<?php

namespace JuristBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Yaml\Yaml;

class Configer
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var \ReflectionClass
     */
    protected $reflector;

    /**
     * @param ContainerInterface $service_container
     */
    public function __construct(ContainerInterface $service_container)
    {
        $this->container = $service_container;
    }

    /**
     * Получение определенного параметра из конфига
     *
     * @param $controller - текущий контроллер $this, если null то конфиг в должен быть в app/config/
     * @param $config - название файла конфига без расширения
     * @param $param - имя ключа в файле параметров
     * @return mixed|null
     */
    public function getBy($controller, $config, $param)
    {

        $arr = $this->container->get('app.arr');

        $yml = $this->getAll($controller, $config);

        if(is_null($yml)) return null;

        return $arr->findByXPath($yml, $param);

    }

    /**
     * Получить все параметры из конфига в виде массива
     *
     * @param $controller - текущий контроллер $this
     * @param $config - название файла конфига без расширения
     * @return array|null
     */
    public function getAll($controller, $config)
    {
        if(!is_null($controller))
            $this->reflector = new \ReflectionClass(get_class($controller));

        $raw = $this->load($config);

        if(is_null($raw)) return null;

        return Yaml::parse($raw);
    }

    /**
     * Загрузить конфиг
     *
     * @param $config
     * @return null|string
     */
    private function load($config)
    {
        $root = $this->container->get('kernel')->getRootDir();

        $path = $root . '/../src/' . $this->getBundleName() . '/Resources/config/' . $config . '.yml';

        if(!file_exists($path))
            $path = $root . '/config/' . $config . '.yml';

        if(!file_exists($path))
            return null;

        return @file_get_contents($path);
    }

    /**
     * Получить Имя бандла
     *
     * @return string
     */
    private function getBundleName()
    {

        $namespace = $this->getNamespace();

        if(is_null($namespace)) $namespace = 'NULL';

        return str_replace(array('Controller', '\\'), '', $namespace);

    }

    /**
     * Получить Неймспейс
     *
     * @return string
     */
    private function getNamespace()
    {
        if(!$this->reflector) return null;

        return $this->reflector->getNamespaceName();
    }

    /**
     * Получить имя контроллера
     *
     * @return string
     */
    private function getControllerName()
    {

        return $this->reflector->getShortName();

    }

    /**
     * Получить полный путь к контроллеру
     *
     * @return string
     */
    private function getFullName()
    {

        return $this->reflector->getName();

    }
}