<?php

namespace JuristBundle\Controller;

use JuristBundle\Entity\SectionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use JuristBundle\Entity\Author;
use JuristBundle\Entity\Answers;
use JuristBundle\Entity\Questions;
use JuristBundle\Entity\Jurists;
use JuristBundle\Entity\AuthUsers;
//use JuristBundle\Entity\Sections;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use JuristBundle\Controller\Sphinx\SphinxManager;
use JuristBundle\Controller\Sphinx\SearchSphinxManager;
use JuristBundle\Controller\Sphinx\FabricSphinx;
use JuristBundle\Controller\Sphinx\SearchExSphinxManager;

use Exception;

class ApiController extends Controller implements ContainerAwareInterface
{
    //Шаги вопросов
    const NEW_STEP = 1;//новый вопрос, находящийся в песочнице модераторов

    const PUBLIC_STEP = 2;//в паблике (песочнице)
    const JURIST_STEP = 3;//у юриста
    const COMPANY_STEP = 4;//у комании, тут видет модер компании, если в auth_user его company_id = company которой отдан вопрос

    const DEADLINE_STEP = 5;//прошел deadline проекта
    const CHECK_STEP = 6;//проверка после ответа юристом
    const DELETE_STEP = 7;//вопрос, который удалили

    const WITHDRAWN_BEFORE_STEP = 11;//отозванный вопрос до публикации
    const WITHDRAWN_AFTER_STEP = 12;//отозванный вопрос после публикации

    const RETURN_STEP = 14;//вопрос, (отложенный)
    const FINISHED_STEP = 15;//шаг, когда у вопроса есть ответ и он прошел модерацию

    //Лимиты для пагинации
    const LIMIT_FOR_JURIST = 5;

    //константы ссылок
    const JURISTS = '/jurists/';
    const RUBRICS = self::JURISTS . 'rubrics/';
    const RUBRIC = self::JURISTS . 'rubric/';
    const QUESTIONS = 'question/'; //для формирование страницы ответа нужна без jurist
    const TAGS = self::JURISTS . 'tags/';
    const TAG = self::JURISTS . 'tag/';
    const JURIST = self::JURISTS . 'jurist/';
    const QUESTION = self::JURISTS . 'question/';
    const COMPANIES = self::JURISTS . 'companies/';
    const ANSWER = self::JURISTS . 'answer/';

    const REDIRECT = '/'; //окончание ссылок для редиректа

    const FORMAT = 'html'; //константы параметров методов

    //const TYPE_PAGES = 'html';

    const ID_USER_WITHOUT_AVATARS = 6; //todo id workspace->user у которого берется картинка, если нет еще у юзера авы

    const NAME_PAY_JURIST = 'highlighted'; //Оплаченный юрист

    //const routeBundle = '/jurists';// todo
    //const mainPageProject = 'main'; //без / так как используется регулярка todo для sections

    const MESSAGE_FROM_RUBRIC_THAT_DOES_NOT_HAVE_TAGS = 'Для этой рубрики теги еще не добавлены.';//тайтл для рубрик у которых пустой тег

    const NAME_BD = 'jurist';

    const DISABLED_VALUE_ON = false;//значение, когда АКТИВЕН юзер

    protected $connect_to_Jurists_bd, $container;

    public $result = [];

    /**
     * START TABS
     */

    const TABS_MAIN = 'main';
    const TABS_JURIST = 'jurist';
    const TABS_RULES = 'rules';
    const TABS_TAGS = 'tags';
    const TABS_PARTNERS = 'partners';

    /**
     * END TABS
     */

    /**
     * start Пагниация
     */
    const PAGINATION_FOR_JURISTS = 5;
    const COUNT_RECORDS_ON_PAGE_JURISTS = 7;
    /**
     * end Пагниация
     */

    /**
     *
     */
    const MAIN_HEADER_TITLE = 'юридическая консультация';
    const MAIN_HEADER = '/jurists/main/1/html/0/';
    const JURISTS_HEADER = '/jurists/jurists/1/html/0/';
    const RULES_HEADER = '/jurists/rules/html/';
    const TAGS_HEADER = '/jurists/rubrics/html/0/';
    const PARTNERS_HEADER = '/jurists/partners/html/';
    /**
     *
     */

    /**
     * @param ContainerInterface|null $container* setContainer - это, как __construct.
     * Используем setContainer, так как в момент создания класса еще не инициализирован контейнер.
     * */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;

        $this->connect_to_Jurists_bd = $this
                                            ->getDoctrine()
                                            ->getManager(self::NAME_BD);

    }

    public function Sphinx($type = 'search', $request = '')
    {

        $SM = new FabricSphinx($type, $request);

        $SM_fabric = $SM->getSearchType();

        return $SM_fabric->prepareResponse([]);
    }

    public function getDate()
    {
        return $this->result['copyright__info'] = '© 1998&ndash;' .date('Y'). ' &nbsp; ФГБУ <b>«Редакция «Российской газеты»</b>';
    }

    protected function generateFirstLast( &$element )
    {
        $type = (!empty($element[0]) && stristr(key($element[0]), 'tags')) ? 'tags' : 'rubrics';
        if (count($element) >= 2) {
            $element[0][$type . '__FIRST__'] = 1;
            $element[count($element) -1][$type . '__LAST__'] = 1;
        } else if (count($element) === 1){
            $element[0][$type . '__FIRST__'] = 1;
            $element[0][$type . '__LAST__'] = 1;
        }
        return $element;
    }

    protected function formedTagsAndRubrics( $data )
    {
        if (!empty($data)) {
            $result = [];
            foreach ($data as $data_val) {
                /**
                 * эти проверки ключей нужны для мусташа, так как в случае ошибки ключа, он будет искать
                 * key с аналогичным именим и может возникнуть путаница
                **/
                $result[] = [
                    (stristr((string)key($data_val), 'Tags'))
                        ? 'tags__title'
                        : 'rubrics__title'
                    =>
                        $data_val->getName(),

                    (stristr((string)key($data_val), 'Tags'))
                        ? 'tags__link'
                        : 'rubrics__link'
                    =>
                        (stristr((string)key($data_val), 'Tags'))
                        ? self::TAG .'html/' . $data_val->getId() . '/0' . self::REDIRECT
                        //: self::RUBRIC .'html/' . '0/' . $data_val->getId() . self::REDIRECT
                        : self::RUBRICS . self::FORMAT . '/' . $data_val->getId() . self::REDIRECT//self::RUBRICS . $rubric->getId() . self::REDIRECT,
                ];
            }
            return $result;
        }
    }

    protected function getCountConsultation( $idJurist )
    {
        if (gettype($idJurist) == 'object') $idJurist = $idJurist->getId();
        $CountConsultationJurist = $this->connect_to_Jurists_bd
            ->getRepository('JuristBundle:Questions')
            ->findBy(array('AuthUsersId' => $idJurist, 'step' => self::FINISHED_STEP));

        return count($CountConsultationJurist);
    }

    protected function fetchAvatar( $Avatar, $Question )
    {
        if(!empty($Avatar->getFileName())){
            $image_medium = [
                'jurist__img__type_medium' => 1,
                'jurist__img__file' => $Avatar->getDirectory() . $Avatar->getFilename(),
                'jurist__img__title' => (method_exists($Question, 'getAnswersId')) ? //проверка нужна для того, какой параметр получается. Question как на main и answers или как на Jurists
                    $Question->getAnswersId()->getAuthUsersId()->getName() . ' ' .
                    $Question->getAnswersId()->getAuthUsersId()->getSecondName()
                    :
                    $Question->getName() . ' ' .
                    $Question->getSecondName(),
                'jurist__img__width' => 100,
                'jurist__img__height' => 100,
            ];
        } else {
            $userNotHaveAvatar = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->findOneById(self::ID_USER_WITHOUT_AVATARS);

            $image_medium = [
                'jurist__img__type_medium' => 1,
                'jurist__img__file' => $userNotHaveAvatar->getDirectory().$userNotHaveAvatar->getFilename(),
                'jurist__img__title' => $userNotHaveAvatar->getName() . ' ' . $userNotHaveAvatar->getSecondName(),
                'jurist__img__width' => $userNotHaveAvatar->getWidth(),
                'jurist__img__height' => $userNotHaveAvatar->getHeight(),
            ];
        }

        return $image_medium;
    }

    protected function receiveAnOverallRating( $ratings )
    {
        $total_rating = 0; //рейтинг юриста считается по вытаскиванию его рейтинга из всех вопросов и его суммирования
        foreach ($ratings as $rating) {
            if ($rating->getQuestion()->getStep() >= self::FINISHED_STEP) {
                $total_rating += $rating->getRating();
            }
        }
        return $total_rating;
    }

    protected function formedTagsForRubrics( $Rubrics, $id = null )
    {//Генерирует единую структуру вывода тегов для рубрик

        /**
         * Хардкор для ВСЕХ рубрик
         */
        define('TYPE_PAGE', 'html/');

        $this->result['categories']['rubrics'][] = array(
            'rubrics__title' => 'Все',
            'rubrics__link' => self::RUBRICS . TYPE_PAGE .'0' . self::REDIRECT,
            'rubrics__active' => (!isset($id)) ? 1 : 0,//если вызов во "ВСЕХ" рубриках
        );

        foreach ($Rubrics as $Rubric){
            $this->result['categories']['rubrics'][] = array(
                'rubrics__title' => $Rubric->getName(),
                'rubrics__link' => self::RUBRICS . TYPE_PAGE . $Rubric->getId() . self::REDIRECT,
                'rubrics__active' => (isset($id) && $id == $Rubric->getId()) ? 1 : 0//если вызов во НЕ ВО "ВСЕХ" рубриках и проверка на тру для конкретного юзвера
            );

            $rubrics_tags__items = array();
            foreach ($Rubric->getTags()->toArray() as $val_tags) {
                if (!empty($val_tags->getName())) {

                    $total_frequency = 0;

                    foreach ($val_tags->getQuestions()->toArray() as $check_finished_step) {//проверка, что тянутые теги
                        if ($check_finished_step->getStep() >= self::FINISHED_STEP) ++$total_frequency;
                    }

                    $rubrics_tags__items['rubrics_tags__items'][] = array(
                        'rubrics_tags__items__title' => $val_tags->getName(),
                        'rubrics_tags__items__link' => self::TAG . 'html/' . $val_tags->getId() . '/0' . self::REDIRECT,
//                        'rubrics_tags__items__link' => self::TAGS . $val_tags->getId() . self::REDIRECT,
                        'rubrics_tags__items__frequency' => $total_frequency//количество кпоминаний в вопросе
                    );
                }
            }

            /**
             * @var $rubrics_tags__items !empty($rubrics_tags__items) - нужен и там, и там, чтоб не попадали рубрики у которых еще нет связанных тегов
             * @var $id - проверка для вывода ВСЕХ тегов, если id КОНКРЕТНОЙ рубрики не определен
             *
             */
            if (!empty($rubrics_tags__items)) {
                if (isset($id) && $Rubric->getId() == $id) {
                    $this->result['categories']['rubrics_tags'][] = array(
                        'rubrics_tags__name' => $Rubric->getName(),
                        'rubrics_tags__links' => self::RUBRIC .'1/html/0/' . $Rubric->getId() . self::REDIRECT,
                        'rubrics_tags__items_unit' => $rubrics_tags__items
                    );
                } else if (!isset($id)) {
                    $this->result['categories']['rubrics_tags'][] = array(
                        'rubrics_tags__name' => $Rubric->getName(),
                        'rubrics_tags__links' => self::RUBRIC .'1/html/0/' . $Rubric->getId() . self::REDIRECT,
                        'rubrics_tags__items_unit' => $rubrics_tags__items
                    );
                }
            }
        }

    }

    protected function formedQuestions( $Questions )
    {
        foreach ($Questions as $Question){

            /**
             * Проверка что есть ответ. Потому что нельзя сделать сразу выборку по ассоциативным полям answersId
             */
            if(!empty($Question->getAnswersId()) && $Question->getStep() >= self::FINISHED_STEP) {
                /**
                 * генерация mods
                 *
                 * */
                $this->result['questions_list'][] = [
                    'mods' => [
                        ($Question->getAnswersId()->getAuthUsersId()->getDateEndPay() > new \DateTime('now'))
                            ? self::NAME_PAY_JURIST
                            : '',//оплачен ли юрист

                        $Question->getAnswersId()->getTypeCards() === 'card'
                            ? 'card'
                            : ''//Является ли вопрос карточкой
                    ],

                    /**
                     * генерация автора
                     *
                     * */

                    'questions__head' =>
                        ['questions__head__author' =>
                            [
                                [
                                    'questions__head__author__name' => $Question->getAuthorId()->getName(),
                                    'questions__head__author__location' => $Question->getAuthorId()->getCity(),
                                ]
                            ]
                        ]
                    ,
                    'tags' => $this->formedTagsAndRubrics($Question->getTags()->toArray()),//$tags_result,
                    'link' => self::RUBRICS . self::QUESTIONS . $Question->getId() . '/' . self::FORMAT.  self::REDIRECT,
                    'rubrics' => $this->formedTagsAndRubrics($Question->getRubrics()->toArray()),
                    'title' => $Question->getTitle(),
                    'text' => $Question->getDescription(),
                    'jurist' => [
                        'jurist__active' => ($Question->getAnswersId()->getAuthUsersId()->getDisabled() == self::DISABLED_VALUE_ON) ? !self::DISABLED_VALUE_ON : self::DISABLED_VALUE_ON,
                        'jurist__first_name' => $Question->getAnswersId()->getAuthUsersId()->getName(),
                        'jurist__last_name' => $Question->getAnswersId()->getAuthUsersId()->getSecondName(),
                        'jurist__link' => self::JURIST . $Question->getAnswersId()->getAuthUsersId()->getId() . self::REDIRECT . 'html/',
                        'jurist__img' => [$this->fetchAvatar($Question->getAnswersId()->getAuthUsersId(), $Question)],
                        'jurist__rate' => [
                            'jurist__rate__reply' => $Question->getAnswersId()->getRating(),
                            'jurist__rate__author' => $this->receiveAnOverallRating($Question->getAnswersId()->getAuthUsersId()->getAnswers()->toArray())//$total_rating
                        ]
                    ],
                    'questions__item_complete' => 0,
                ];

                foreach($this->result['questions_list'] as &$val){

                    /**
                     * Если первый ключ равен оплаченому юристу self::NAME_PAY_JURIST, то выставляем визабилити,
                     * если нет, то сносим.
                     *
                     */
                    if( !empty($val['mods'][0]) && $val['mods'][0] === self::NAME_PAY_JURIST ) {
                        $val['visibility'] = [//true если mods = highlighted
                            'visibility__state' => 'visible'
                        ];
                    } else if(isset($val['mods'][0]) && $val['mods'][0] === '') {
                        unset($val['mods'][0]);
                    }
                    if( isset($val['mods'][1]) && $val['mods'][1] === '') unset($val['mods'][1] );
                    if( !empty($val['mods']) &&  count($val['mods']) > 0 ) {
                        $val['mods__length'] = count($val['mods']);
                    } else {
                        unset($val['mods']);
                    }

                    if(!empty($val['mods']))$val['mods'] = array_values($val['mods']);//потому что тупой мусташ считает [1 => 'cart'] массивом, хотя, явно это не указанно

                    /**
                     * Работа с тегами и рубриками
                     */


                    $this->generateFirstLast($val['rubrics']);

                    $this->generateFirstLast($val['tags']);

                    $val['tags__length'] = count($val['tags']);

                    /**
                     * Работаем с хранилищем аватарок для юристов
                     */
                    if(count($val['jurist']['jurist__img']) > 0){
                        $val['jurist']['jurist__img__length'] = count($val['jurist']['jurist__img']);
                    }
                }
                unset($val);
            }
        }
    }

    protected function bibliotechkaRand()
    {
        $bibliotechkaRand = [
            [
                'bibliotechka__issue__array' => [
                    'bibliotechka__issue' => [
                        'bibliotechka__issue__number' => 7,
                        'bibliotechka__issue__year' => 2016
                    ]
                ],
                'book' => [
                    'book__img' => [
                        'book__img__type_medium' => 1,
                        'book__img__file' => '//bibliotechka.rg.ru/upload/resize_cache/iblock/f67/450_450_16a9cdfeb475445909b854c588a1af844/f67c80f7bc8a03d3e89bace046f45ee1.jpg',
                        'book__img__title' => 'Садоводы, дачники и их объединения: защита прав и интересов',
                        'book__img__width' => 107,
                        'book__img__height' => 151,
                    ],
                    'book__img__length' => 1,
                    /*'book__mods' => [
                        'book__mods__value' => 'new',
                    ],
                    'book__mods__length' => 1,*/
                    'book__title' => 'Садоводы, дачники и их объединения: защита прав и интересов',
                    'book__annotation' => 'Книга поможет найти ответ практически на любой вопрос, связанный с деятельностью садоводческих и дачных некоммерческих объединений, поскольку ее автор является практикующим адвокатом, непосредственно занимающимся проблемами садоводов более 15 лет.',
                    'book__download' => [
                        'book__download__link' => '//bibliotechka.rg.ru/upload/iblock/e3d/e3d4d386a6fe115b2a87cca8b628ac0e.pdf',
                        'book__download__size' => '46,1 Кб'
                    ],
                    'book__price' => '265 руб.',
                    'book__purchase_link' => '//bibliotechka.rg.ru/products/?action=ADD2BASKET&id=494&SECTION_ID=35&ELEMENT_ID=494',
                ],
            ],
            [
                'bibliotechka__issue__array' => [
                    'bibliotechka__issue' => [
                        'bibliotechka__issue__number' => 9,
                        'bibliotechka__issue__year' => 2016
                    ]
                ],
                'book' => [
                    'book__img' => [
                        'book__img__type_medium' => 1,
                        'book__img__file' => '//bibliotechka.rg.ru/upload/resize_cache/iblock/161/450_450_16a9cdfeb475445909b854c588a1af844/1617ad5befed7d8fd286e03094a61664.jpg',
                        'book__img__title' => 'Жизнь без конфликтов: добрососедство и закон',
                        'book__img__width' => 107,
                        'book__img__height' => 151,
                    ],
                    'book__img__length' => 1,
                    'book__mods' => [
                        'book__mods__value' => 'Новинка',
                    ],
                    'book__mods__length' => 1,
                    'book__title' => 'Жизнь без конфликтов: добрососедство и закон',
                    'book__annotation' => 'Книга посвящена вопросам, связанным с предупреждением и разрешением конфликтов, возникающих между жителями многоквартирных домов. В первой части анализируются наиболее частые конфликтные ситуации, во второй ¬– виды и причины конфликтов, а также пути их предотвращения.',
                    'book__download' => [
                        'book__download__link' => '//bibliotechka.rg.ru/upload/iblock/048/048e0eb426e7855816af3ccbc54df816.pdf',
                        'book__download__size' => '43,8 Кб'
                    ],
                    'book__price' => '265 руб.',
                    'book__purchase_link' => '//bibliotechka.rg.ru/products/?action=ADD2BASKET&id=498&SECTION_ID=35&ELEMENT_ID=498',
                ],
            ],
            [
                'bibliotechka__issue__array' => [
                    'bibliotechka__issue' => [
                        'bibliotechka__issue__number' => 10,
                        'bibliotechka__issue__year' => 2016
                    ]
                ],
                'book' => [
                    'book__img' => [
                        'book__img__type_medium' => 1,
                        'book__img__file' => '//bibliotechka.rg.ru/upload/resize_cache/iblock/77c/450_450_16a9cdfeb475445909b854c588a1af844/77ce9c5979bad764e704bde2f7cdf3ea.jpg',
                        'book__img__title' => 'Многоквартирный дом: как эффективно управлять своим домом и решать возникающие проблемы',
                        'book__img__width' => 107,
                        'book__img__height' => 151,
                    ],
                    'book__img__length' => 1,
                    /*'book__mods' => [
                        'book__mods__value' => 'new',
                    ],
                    'book__mods__length' => 1,*/
                    'book__title' => 'Многоквартирный дом: как эффективно управлять своим домом и решать возникающие проблемы',
                    'book__annotation' => 'Книга состоит из ответов на вопросы, касающиеся управления многоквартирным домом, подготовки и проведения общего собрания и оформления его решений. В ней приводится типовой договор для взаимодействия с УК и формы документов для проведения общего собрания.',
                    'book__download' => [
                        'book__download__link' => '//bibliotechka.rg.ru//upload/iblock/96b/96b016c79f6b2fd916080da347925d35.pdf',
                        'book__download__size' => '40,6 Кб'
                    ],
                    'book__price' => '265 руб.',
                    'book__purchase_link' => '//bibliotechka.rg.ru/products/?action=ADD2BASKET&id=501&SECTION_ID=35&ELEMENT_ID=501',
                ],
            ],
            [
                'bibliotechka__issue__array' => [
                    'bibliotechka__issue' => [
                        'bibliotechka__issue__number' => 5,
                        'bibliotechka__issue__year' => 2016,
                    ]
                ],
                'book' => [
                    'book__img' => [
                        'book__img__type_medium' => 1,
                        'book__img__file' => '//bibliotechka.rg.ru/upload/resize_cache/iblock/1e8/450_450_16a9cdfeb475445909b854c588a1af844/1e8928981547eb20428ec45b172a1971.jpg',
                        'book__img__title' => 'Пенсионное обеспечение граждан: основные вопросы',
                        'book__img__width' => 107,
                        'book__img__height' => 151,
                    ],
                    'book__img__length' => 1,
                    'book__mods' => [
                        'book__mods__value' => 'Лидер продаж',
                    ],
                    'book__mods__length' => 1,
                    'book__title' => 'Пенсионное обеспечение граждан: основные вопросы',
                    'book__annotation' => 'В книге в доступной и интересной форме рассказывается об основных законах и правилах пенсионного обеспечения граждан в России в последние годы. Ее основная цель — помочь разобраться во всех нововведениях, разъяснить права тех, кто уже на пенсии, а также рассказать о возможностях, которые открываются перед будущими пенсионерами.',
                    'book__download' => [
                        'book__download__link' => '//bibliotechka.rg.ru/upload/iblock/4f4/4f46477f3232ff3f6fb2cfbfe2bf209c.pdf',
                        'book__download__size' => '3.5 Кб'
                    ],
                    'book__price' => '265 руб.',
                    'book__purchase_link' => '//bibliotechka.rg.ru/products/?SECTION_ID=35&ELEMENT_ID=490&sphrase_id=11577',
                ],
            ],
        ];

        $result_array = [];

        while (count($result_array) < 2) {

            $rand = rand(0, count($bibliotechkaRand)-1);

            if( !key_exists($rand, $result_array) ) {//проверяем, чтоб не было дублей
                $result_array[$rand] = $bibliotechkaRand[$rand];
            }
        }


        return array_values($result_array);//для мусташа, а иначе он не понимает ключи, т.е. порядок array(3 => 'ddd', 1 => 'bbb') ему не понятен, а так понятен array(0 => 'ddd', 1 => 'bbb')
    }
    protected function bibliotechka($data = null){

        $result = array(
            'bibliotechka__issue' => array(
                array(
                    'bibliotechka__issue__number' => 14,
                    'bibliotechka__issue__year' => 2016
                ),
            ),
            'book' => array(
                'book__img' => array(
                    array(
                        'book__img__type_medium' => 1,
                        'book__img__file' => '//rg.ru/res/images/custom/projects/juristical/lib-item.jpg',
                        'book__img__title' => 'Налог на имущество физических лиц',
                        'book__img__width' => '114',
                        'book__img__height' => '152',
                    )
                ),
            ),
            'book__img__length' => 1,
            'book__mods' => array(
                array('book__mods_value' => 'new'),
            ),
            'book__mods__length' => 1,
            'book__title' => 'Налог на имущество физических лиц',
            /*'book__annotation' => 'В России более 60 миллионов садоводов, а вместе с семьями это, можно считать, все население страны. И каждый садовод или дачник прежде всего хочет знать свои права. Именно правам, а не обязанностям садоводов и дачников в первую очередь посвящено издание: право на имущество; право на отдых; соседские права; право на участие в деятельности объединения; право получать отчеты по расходованию денежных средств; право на оспаривание решений; право на выход из некоммерческого объединения. Наличие прав подразумевает и необходимость исполнения определенных обязанностей, знать о которых не менее важно.
Книга поможет найти ответ практически на любой вопрос, связанный с деятельностью садоводческих и дачных некоммерческих объединений, поскольку ее автор является практикующим адвокатом, непосредственно занимающимся проблемами садоводов на протяжении более 15 лет. 
Издание предназначено для садоводов, огородников, дачников, тех, кто планирует ими стать, а также для представителей садоводческих и дачных некоммерческих объединений.',*/
            'book__download' => array(
                array(
                    'book__download__link' => '#',
                    'book__download__size' => '3.5 Мб'
                ),
            ),
            'book__price' => '265 руб.',
            'book__purchase_link' => 'https://bibliotechka.rg.ru/products/?SECTION_ID=31&ELEMENT_ID=409',
        );

        return $result;
    }

    public function SidebarAction (
        $format = self::FORMAT, $id = null, $where = null, $orderBy = null, $answers_limit = 4,
        $questions_latest_mods = 'latest', $jurists_feed_limit = 2, $jurists_latest_mods = 'feed',
        $jurists_top_mods = 'top', $jurists_top_week = 3
    )
    {

        //return new Response($format);
        if($format === 'json'){//app_dev.php/jurists/sidebar/json/

            $Rubrics = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Rubrics')
                ->findBy([], ['name' => 'ASC']);

            $Answers = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Answers')
                ->findBy(
                    [],
                    ['date' => 'DESC']//,
                //$answers_limit
                );

            $Jurists = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->findBy([], []);

            $questions_latest = array();

            $date = new \DateTime('now');//для jurists_top
            $date->modify('-1 week');
            $id_jurists_top = array();//выборк юристов для топа jurists_top

            foreach($Answers as $Answer){
                if($Answer->getDate() > $date && $Answer->getQuestion()->getStep() >= self::FINISHED_STEP){//выборк id юристов для топа у которых есть ответы за последнию неделю
                    $id_jurists_top[] = $Answer->getAuthUsersId()->getId();
                }

                if($Answer->getQuestion()->getStep() >= self::FINISHED_STEP){//выборка вопросов которые уже опубликованы
                    $rubrics = array();

                    foreach($Answer->getQuestion()->getRubrics()->toArray() as $rubric){//формируем рубрики
                        if(!empty($rubric->getName())){
                            $rubrics[] = array(
                                'rubrics__title' => htmlspecialchars($rubric->getName()),
                                'rubrics__link' =>  self::RUBRICS . self::FORMAT . '/' . $rubric->getId() . self::REDIRECT//self::RUBRICS . $rubric->getId() . self::REDIRECT,
                            );
                        }
                    }

                    $questions_latest[] = array(
                        'mods' => array($questions_latest_mods),
                        'rubrics' => $rubrics,
                        'title' => $Answer->getQuestion()->getTitle(),
                        'link' => self::RUBRICS . self::QUESTIONS . $Answer->getQuestion()->getId() . '/' . self::FORMAT.  self::REDIRECT,
                    );

                    foreach($questions_latest as $key_question_latest => &$question_latest){
                        if (count($question_latest['rubrics']) == 0) { unset($questions_latest[$key_question_latest]); }
                        $question_latest['mods__length'] = count($question_latest['mods']);
                        $question_latest['rubrics__length'] = count($question_latest['rubrics']);
                    }
                }
            }

            $Jurist_feed = array();

            $id_jurists_top = array_unique($id_jurists_top);
            $jurists_top = array();

            foreach($Jurists as $Jurist){

                /**
                 * todo jurists_top
                 *  перебираем id юристов у которых есть ответы за последнию неделю
                 */
                foreach ($id_jurists_top  as $id_jurist_top){
                    if($Jurist->getId() == $id_jurist_top){
                        $jurists_top[] = array(
                            'mods' => array($jurists_top_mods),
                            'jurist__img' => [$this->fetchAvatar($Jurist, $Jurist)],
                            'jurist__link' => self::JURIST . $Jurist->getId() . '/' . self::FORMAT . self::REDIRECT,
                            'jurist__first_name' => $Jurist->getName(),
                            'jurist__last_name' => $Jurist->getSecondName(),
                            'jurist__consultations' => $this->getCountConsultation($Jurist->getId()),
                            'jurist__rate__author' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()),//общий рейтинг
                        );
                    }
                }

                $rubrics = [];
                foreach($Jurist->getRubrics()->toArray() as $rubric){//формируем рубрики для юристов
                    $rubrics[] = [
                        'rubrics__title' => $rubric->getName(),
                        'rubrics__link' => self::RUBRICS . $rubric->getId() . '/' . self::FORMAT . self::REDIRECT,
                    ];
                }

                /**
                 * todo jurists_feed
                 */
                if($Jurist->getDateEndOfferServices() > new \DateTime('now') && $Jurist->getDisabled() === self::DISABLED_VALUE_ON){//проверка оплачености и активности
                    $Jurist_feed[] = array(
                        'mods' => array($jurists_latest_mods),
                        'jurist__img' => [$this->fetchAvatar($Jurist, $Jurist)],
                        'jurist__link' => self::JURIST . $Jurist->getId() . '/' . self::FORMAT . self::REDIRECT,
                        'jurist__education' => $Jurist->getGraduate(),
                        'rating' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()),
                        'jurist__first_name' => $Jurist->getName(),
                        'jurist__last_name' => $Jurist->getSecondName(),
                        'jurist__patronymic' => $Jurist->getPatronymic(),
                        'rubrics' => $rubrics
                    );
                }
            }

            /**
             * jurists_feed
             * сортируем юристов по рейтингу и затем обрезаем для заданного лимита
             */
            usort($Jurist_feed, function ($a, $b) {
                return strcmp($b['rating'], $a['rating']);
            });
            $Jurist_feed = array_splice($Jurist_feed, 0, $jurists_feed_limit);

            /**
             * jurists_top
             * сортируем юристов по рейтингу и затем обрезаем для заданного лимита
             */
            usort($jurists_top, function ($a, $b) {
                return strcmp($b['jurist__rate__author'], $a['jurist__rate__author']);
            });
            $jurists_top = array_splice($jurists_top, 0, $jurists_top_week);

            /**
             * questions_latest
             */
            $questions_latest = array_splice($questions_latest, 0, $answers_limit);

            foreach($jurists_top as &$val_jurists_top){//$jurists_top подсчет length && first/last
                $val_jurists_top['jurist__img__length'] = count($val_jurists_top['jurist__img']);
                $val_jurists_top['mods__length'] = count($val_jurists_top['mods']);
            }

            foreach($Jurist_feed as &$val_Jurist_feed){//jurists_feed подсчет length && first/last
                $val_Jurist_feed['jurist__img__length'] = count($val_Jurist_feed['jurist__img']);
                $val_Jurist_feed['mods__length'] = count($val_Jurist_feed['mods']);
                $val_Jurist_feed['rubrics__length'] = count($val_Jurist_feed['rubrics']);
                $this->generateFirstLast($val_Jurist_feed['rubrics']);
            }

            $this->result['sidebar'] = array(

                'bibliotechka' => $this->bibliotechkaRand()[0],//Ибо нужно только один

                'questions_latest' => $questions_latest,//последние вопросы

                'questions_latest__length' => count($questions_latest),

                'jurists_feed' => $Jurist_feed,

                'jurists_top' => $jurists_top,//юристы в топе за неделю
            );


            foreach($Rubrics as $Rubric){
                $this->result['sidebar']['categories']['rubrics'][] = array(
                    'rubrics__title' => $Rubric->getName(),
                    'rubrics__link' => self::RUBRIC . '1/html/0/' . $Rubric->getId() . self::REDIRECT,
                    'rubrics__active' => (!empty($id) && $id == $Rubric->getId()) ? true : false,
                );
            }

            return $this->result;

        } elseif ($format === 'html') {

            return new Response('Формат = ' . $format . " страница = " . $id);

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }
    }

    public function HeaderAction($active = null){

        $this->result['header'] = array(
            'tabs' => array(
                array(
                    'tabs__name' => 'Консультации',
                    'tabs__link' => self::MAIN_HEADER,
                    'tabs__active' => ($active == 'main') ? 1 : 0,
                ),
                array(
                    'tabs__name' => 'Юристы',
                    'tabs__link' => self::JURISTS_HEADER,
                    'tabs__active' => ($active == 'jurist') ? 1 : 0,
                ),
                array(
                    'tabs__name' => 'Правила',
                    'tabs__link' => self::RULES_HEADER,
                    'tabs__active' => ($active == 'rules') ? 1 : 0,
                ),
                array(
                    'tabs__name' => 'Теги',
                    'tabs__link' => self::TAGS_HEADER,
                    'tabs__active' => ($active == 'tags') ? 1 : 0,
                ),
                array(
                    'tabs__name' => 'Партнеры',
                    'tabs__link' => self::PARTNERS_HEADER,
                    'tabs__active' => ($active == 'partners') ? 1 : 0,
                ),
            ),
            'header__link' => self::MAIN_HEADER,
            'header__title' => self::MAIN_HEADER_TITLE
        );

        return $this->result;
    }

    protected function PaginationGenerateArrowAction ($number_page, $current_page, $link, $condition_id = '', $get_string)
    {
        static $arrow = [];

        if ( $number_page == $current_page-1 ) {//https://front.rg.ru/jurists/jurists/
            $arrow[] = [
                'arrow__prev' => true,
                'arrow__link' => $link."$number_page/html/" . (($number_page-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
            ];
        }

        if ( $number_page == $current_page+1 ) {
            $arrow[] = [
                'arrow__next' => true,
                'arrow__link' => $link."$number_page/html/" . (($number_page-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
            ];
        }
        
        return $arrow;
    }

    /*protected function PaginationGeneratePagesAction($firstPage, $totalPages, $link_action, $number_page, $current_page){//TODO описать
        static $numeric_page = [];

        $numeric_page[0] = [
            'number_page' => $firstPage,
            'link' => $link_action."$firstPage/html/0" . self::REDIRECT,
            'current' => false,
            'first' => true,
            'middle' => false,
            'last' => false,
        ];

        $numeric_page[self::PAGINATION_FOR_JURISTS] = [
            'number_page' => $totalPages,
            'link' => $link_action . "$number_page/html/" . (($totalPages-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . self::REDIRECT,
            'current' => false,
            'first' => false,
            'middle' => false,
            'last' => true,
        ];

        for($j = 1; $j <= self::PAGINATION_FOR_JURISTS-count($numeric_page); ++$j){
            $numeric_page[$j] = [
                'number_page' => $number_page,
                'link' => $link_action . "$j/html/" . (($number_page-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . self::REDIRECT,
                'current' => ($number_page == $current_page) ? true : false,
                'first' => ($number_page == $firstPage) ? true : false,
                'middle' => ($number_page != $firstPage && $number_page != $totalPages) ? true : false,
                'last' => ($number_page == $totalPages) ? true : false,
            ];
        }

        return $numeric_page;
    }*/

    protected function ProcessingRequestForPaginationAction ()
    {
        $value_get_pagination = '?';

        $request = Request::createFromGlobals();
        foreach ($request->query->all() as $keys_query_get => $values_query_get) {
            $value_get_pagination .= $keys_query_get . '=' . $values_query_get . '&';
        }
        if ($value_get_pagination[strlen($value_get_pagination)-1] === '&') {
            $value_get_pagination = substr($value_get_pagination, 0, strlen($value_get_pagination)-1);
        }
        
        return $value_get_pagination;
    }

    /**
     * @param array $query - select * по заданной выборки
     * @param $count_numeric_page - количество пагинация на странице
     * @param $count_records_on_page - количество записей на странице
     * @param $current_page - текущая страница
     * @param $link - ссылка роут
     * @param $firstPage - первая страница
     * @param $condition_id - костыли для таких категорий, как выборка по тегу или рубрики
     * @param $get_string - набор get запросов
     * @throws Exception
     */
    protected function PaginationAction (
        array $query, $count_numeric_page, $count_records_on_page, 
        $current_page, $link, $firstPage = 1, $condition_id = '',
        $get_string = ''
    )
    {
        if (!$current_page) throw new Exception("Не допустимое значение: id = $current_page");
        $count_records = count($query);
        $totalPages = ceil($count_records / $count_records_on_page);

        /**
         * start numeric_page
         *
         * logics:
         * We have for example 20 page with $count_numeric_page == 5
         *
         * 1,2,3,4,5,6,7,8,9,10,11,12,13,14,1516,17,18,19,20
         *
         * if $current_page == 1(first)
         * then we see 1(disabled),2,3,4...20
         *
         * else if $current_page == 20(last page)
         * then we see 1...17,18,19,20(disabled)
         *
         * else if $current_page == 1+1
         * then we see 1,2(disabled),3,4...20
         *
         * else if $current_page == 20-1(last page-1)
         * then we see 1...17,18,19(disabled),20
         *
         * else if $current_page == (example) 10
         * then we see 1...9,10(disabled),11...20
         *
         */
        for ($i = $firstPage; $i <= $totalPages; ++$i) {//TODO оптимизировать

            if ($current_page == $firstPage && $i <= $count_numeric_page) {//если на 1-ой
                if ($i < $count_numeric_page) {
                    $arrow = $this::PaginationGenerateArrowAction($i, $current_page, $link, $condition_id, $get_string);
                    //$numeric_page = $this->PaginationGeneratePagesAction($firstPage, $totalPages, 'https://front.rg.ru/jurists/jurists/', $i, $current_page);
                    
                    $numeric_page[] = [
                        'number_page' => $i,
                        'link' => $link . "$i/html/" . (($i-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
                        'current' => ($i == $current_page) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false,
                        /*'left_hellip' => false,
                        'left_hellip' => false,*/
                    ];
                } else {
                    $numeric_page[] = [
                        'number_page' => $totalPages,
                        'link' => $link . "$totalPages/html/" . (($totalPages-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                    ];
                }
            } elseif ($current_page == $totalPages && $i > $totalPages - $count_numeric_page) {//если на последний
                $numeric_page[] = [
                    'number_page' => $i,
                    'link' => $link . "$i/html/" . (($i-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
                    'current' => ($i == $current_page) ? true : false,
                    'first' => ($i == $firstPage) ? true : false,
                    'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                    'last' => ($i == $totalPages) ? true : false,
                ];
                $numeric_page[0] = [
                    'number_page' => $firstPage,
                    'link' => $link . "$firstPage/html/0" . $condition_id . self::REDIRECT . $get_string,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                ];
                $arrow = $this::PaginationGenerateArrowAction($i, $current_page, $link, $condition_id, $get_string);
            } elseif ($current_page == $firstPage + 1) {//если на 2-ой
                if($i < $count_numeric_page){
                    $numeric_page[] = [
                        'number_page' => $i,
                        'link' => $link . "$i/html/" . (($i-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
                        'current' => ($i == $current_page) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false,
                    ];
                } elseif ($i == $count_numeric_page) {
                    $numeric_page[] = [
                        'number_page' => $totalPages,
                        'link' => $link . "$i/html/" . (($totalPages-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                    ];
                }
                $arrow = $this::PaginationGenerateArrowAction($i, $current_page, $link, $condition_id, $get_string);
            } elseif ($current_page == $totalPages - 1 && $i > $totalPages - $count_numeric_page) {// предпоследний
                $numeric_page[] = [
                    'number_page' => $i,
                    'link' => $link . "$i/html/" . (($i-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
                    'current' => ($i == $current_page) ? true : false,
                    'first' => ($i == $firstPage) ? true : false,
                    'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                    'last' => ($i == $totalPages) ? true : false,
                ];
                $numeric_page[0] = [
                    'number_page' => $firstPage,
                    'link' => $link . "$firstPage/html/0" . $condition_id . self::REDIRECT . $get_string,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                ];
                $arrow = $this::PaginationGenerateArrowAction($i, $current_page, $link, $condition_id, $get_string);
            } elseif (
                ($current_page-2 < $i && $current_page+2 > $i)
                && $current_page != $firstPage && $current_page != $firstPage+1
                && $current_page != $totalPages && $current_page != $totalPages - 1
            ) {//в середине
                $numeric_page[0] = [
                    'number_page' => $firstPage,
                    'link' => $link . "$firstPage/html/0" . $condition_id . self::REDIRECT . $get_string,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                ];
                if ($current_page-2 < $i && count($numeric_page)){
                    $numeric_page[] = [
                        'number_page' => $i,
                        'link' => $link . "$i/html/" . (($i-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
                        'current' => ($i == $current_page) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false,
                    ];
                }
                if (count($numeric_page) == $count_numeric_page-1) {//если массив заполнился до нужного значения
                    $numeric_page[] = [
                        'number_page' => $totalPages,
                        'link' => $link . "$totalPages/html/" . (($totalPages-1)*self::COUNT_RECORDS_ON_PAGE_JURISTS) . $condition_id . self::REDIRECT . $get_string,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                    ];
                }
                $arrow = $this::PaginationGenerateArrowAction($i, $current_page, $link, $condition_id, $get_string);
            }
        }

        /**
         * end numeric_page
         */

        if (!$numeric_page) throw new Exception("Не определена логика вывода страниц пагинации");

        if ($totalPages > 0) {
            $this->result['pagination'] = [
                'total__pages' => $totalPages,
                'limit__pages' => ($totalPages > self::PAGINATION_FOR_JURISTS) ? true : false,//для многоточия в мусташе
                'range' => $count_records_on_page,
                'numeric_page' => $count_numeric_page,
                'total__records' => $count_records,
                'all__pages' => $numeric_page,
                'arrow' => $arrow
            ];

            //если больше 5 страниц, то у нас есть точки
            if($this->result['pagination']['total__pages'] > 5)
            {
                $this->result['pagination']['all__pages'][0]['__FIRST__'] = true;
                $this->result['pagination']['all__pages'][count($this->result['pagination']['all__pages'])-1]['__LAST__'] = true;
            }
            dump($this->result['pagination']);die;
        }

    }
}