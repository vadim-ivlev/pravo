<?php

namespace JuristBundle\Command;

//use Symfony\Component\Console\Command\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand as Command;

use JuristBundle\Entity\AuthUsers;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use JuristBundle\Entity\AnswersRepository;
use JuristBundle\Entity\AuthUsersRepository;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use JuristBundle\Controller\ApiController;

use Exception;

class GenerateSitemapCommand extends Command implements ContainerAwareInterface
{

    const DEFAULT_PATH = '/var/www/pravo/www/web/sitemaps/pravo/';
    const NAME = [ // ['name_entity_repository' => 'name_xml_file']
        'AuthUsers' => 'jurists',
        'Answers' => 'answers'
    ];
    const NAME_BD = 'jurist';
    const HOST = 'https://pravo.rg.ru';

    public function setContainer(ContainerInterface $container = null)
    {

        $this->db = $this->getContainer()->get('doctrine')->getEntityManager(self::NAME_BD);
    }


    protected function configure ()
    {

        $this
            ->setName('jurist:generate:sitemap')
            ->setDescription('generate sitemap');

    }

    private function Answers($elemUrl)
    {
        return ApiController::ANSWER . $elemUrl['loc'] . ApiController::REDIRECT;
    }

    private function AuthUsers($elemUrl)
    {
        return ApiController::JURIST . $elemUrl['loc'] . ApiController::REDIRECT;
    }

    private function generateUrl(array $elemUrl, $routeIndetificator)
    {
        return self::HOST . $this->{$routeIndetificator}($elemUrl);
    }

    /**
     * @param $data - массив данных полученный из @method generateSiteMap
     * @return mixed
     */
    private function templateSitemap($data, $entityName)
    {

        $rootNode = new \SimpleXMLElement("<?xml version='1.0' encoding='UTF-8' standalone='yes'?><urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'></urlset>" );

        foreach ($data as $valXml) {
            $itemNode = $rootNode->addChild('url');

            $itemNode->addChild( 'loc', $this->generateUrl($valXml, $entityName) );
            $itemNode->addChild( 'lastmod', (isset($valXml['date']) ? date_format(date_create($valXml['date']), 'Y-m-d') : date('Y-m-d')) );
            $itemNode->addChild( 'priority', (isset($valXml['priority']) ? $valXml['priority'] : '0.5') );
            $itemNode->addChild( 'changefreq', (isset($valXml['changefreq']) ? $valXml['changefreq'] : 'daily') );
        }

        return $rootNode->asXML();

    }

    /**
     * Обращается по заданному @param $entityName к заданному репу, который должен реализовывать @interface createSitemapRepositoryInterface
     * @param $entityName
     * @return mixed
     */
    private function generateSiteMap($entityName)
    {

        $data = $this->db->getRepository("JuristBundle:$entityName")->generateSiteMap();

        return $this->templateSitemap($data, $entityName);
    }

    /**
     * Сохраняет результируюзий XML полученный из @method generateSiteMap
     */
    private function saveSitemap()
    {

        foreach (self::NAME as $entityName => $fileName) {

            file_put_contents(self::DEFAULT_PATH . $fileName . '.xml', $this->generateSiteMap($entityName));
            
        }

    }

    protected function execute (InputInterface $input, OutputInterface $output)
    {
        
        try {
            $this->saveSitemap();

            $output->writeln('Success ' . date('Y-m-d H:i:s'));
        } catch (Exception $e) {
            var_export($e->getMessage());
        }

    }

}
