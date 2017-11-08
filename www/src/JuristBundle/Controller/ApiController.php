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

use JuristBundle\Entity\QuestionsRepository;

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use JuristBundle\Controller\Sphinx\SphinxManager;
use JuristBundle\Controller\Sphinx\SearchSphinxManager;
use JuristBundle\Controller\Sphinx\FabricSphinx;
use JuristBundle\Controller\Sphinx\SearchExSphinxManager;

use Exception;

class ApiController extends Controller implements ContainerAwareInterface
{
    /**
     * Шаги вопросов
     * */
    const NEW_STEP = 1; //Новый вопрос, находящийся в песочнице модераторов

    const PUBLIC_STEP = 2; //В паблике (песочнице)
    const JURIST_STEP = 3; //У юриста
    const COMPANY_STEP = 4; //у комании, тут видет модер компании, если в auth_user его company_id = company которой отдан вопрос

    const DEADLINE_STEP = 5; //Прошел deadline проекта
    const CHECK_STEP = 6; //Проверка после ответа юристом
    const DELETE_STEP = 7; //Вопрос, который удалили

    /**
     * Закомиченно 28.06.17 Glushenkov Yuri, чтоб не вводить в заблуждение т.к. не нигде не используется, хотя, первоночально
     * планировалось использование.
     */
//    const WITHDRAWN_BEFORE_STEP = 11; //Отозванный вопрос до публикации
//    const WITHDRAWN_AFTER_STEP = 12; //Отозванный вопрос после публикации

    const RETURN_STEP = 14; //Вопрос, (отложенный)
    const FINISHED_STEP = 15; //Шаг, когда у вопроса есть ответ и он прошел модерацию

    /**
     * Лимиты для пагинации
     * */
    const LIMIT_FOR_JURIST = 5;

    /**
     * Значение для ВКЛЮЧЕННОГО юзера
     * 0 = false
     */
    const VALUE_ACTIVE_USER = 0;

    /**
     * Константы ссылок
     * */
    const JURISTS = '/'; //Главная роут на бандел
    const RUBRICS = self::JURISTS . 'rubrics/';
    const RUBRIC = self::JURISTS . 'rubric/';
    const QUESTIONS = 'question/'; //Для формирование страницы ответа нужна без jurist
    const TAGS = self::JURISTS . 'tags/';
    const TAG = self::JURISTS . 'tag/';
    const JURIST = self::JURISTS . 'jurist/';
    const QUESTION = self::JURISTS . 'question/';
    const COMPANIES = self::JURISTS . 'companies/';
    //const ANSWER = self::JURISTS . 'answer/';
    const ANSWER = self::RUBRICS . 'question/';

    const REDIRECT = '/'; //Окончание ссылок для редиректа

    const FORMAT = 'html'; //Константы параметров методов

    const LIST_FOR_HIDE_CITY_AND_FIO = [ //Список для скрытия городов и ФИО у указанных в этом массиве рубрик
        'Статьи'
    ];

    const LIST_RUBRIC_FOR_SORT_AND_DOWN_IN_LEFT_SIDEBAR = [ //Рубрики которые надо опустить вниз в сайдбаре не выделяя цветом
        'Другое'
    ];

    /**
     * Данный геттер возвращает выборку для сортировки вниз
     * и в случае необходимости ее выделения
     */
    private function getDownCategoryForSort() {
        $tmpListRubricsForSortAndDownInLeftSidebar = [];
        foreach (self::LIST_RUBRIC_FOR_SORT_AND_DOWN_IN_LEFT_SIDEBAR as $itemWithoutSelectRubric)
            $tmpListRubricsForSortAndDownInLeftSidebar[$itemWithoutSelectRubric] = [];
        foreach (self::LIST_FOR_HIDE_CITY_AND_FIO as $itemWithSelectRubric)
            $tmpListRubricsForSortAndDownInLeftSidebar[$itemWithSelectRubric] = [
                'select_rubric' => true
            ];
        return $tmpListRubricsForSortAndDownInLeftSidebar;
    }

    public $filtersForJurists = [
        'alphabet' => 'По алфавиту',
        'rating' => 'По рейтингу',
        'company' => 'По компании',
    ];

    protected function fetchFormat()
    {
        $request = Request::createFromGlobals();
        $format = $request->query->get('format');
        if (empty($format)) $format = self::FORMAT;

        return $format;

    }

    const ID_USER_WITHOUT_AVATARS = 6; //todo id workspace->user у которого берется картинка, если нет еще у юзера авы

    const NAME_PAY_JURIST = 'highlighted'; // Оплаченный юрист
    const TYPE_CARD = 'card'; // Является ли ответ карточкой?

    const MESSAGE_FROM_RUBRIC_THAT_DOES_NOT_HAVE_TAGS = 'Для этой рубрики теги еще не добавлены.'; //Тайтл для рубрик у которых пустой тег

    const NAME_BD = 'jurist';

    const DISABLED_VALUE_ON = false; //Значение, когда АКТИВЕН юзер

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
     * START Пагниация
     */
    const PAGINATION_FOR_JURISTS = 5;
    const COUNT_RECORDS_ON_PAGE_JURISTS = 7;
    /**
     * END Пагниация
     */

    /**
     * START HEADER
     */
    const MAIN_HEADER_TITLE = 'юридическая консультация';
    const MAIN_HEADER = self::JURISTS . '';
    const JURISTS_HEADER = self::JURISTS . 'jurists/1/';
    const RULES_HEADER = self::JURISTS . 'rules/';
    const TAGS_HEADER = self::JURISTS . 'rubrics/0/';
    const PARTNERS_HEADER = self::JURISTS . 'partners/';
    /**
     * END HEADER
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

        $this->redis = $redis = $this->container->get('snc_redis.default');
    }

    public function Sphinx($type = 'search', $request = '')
    {

        $SM = new FabricSphinx($type, $request);

        $SM_fabric = $SM->getSearchType();

        return $SM_fabric->prepareResponse([]);
    }

    protected function generateOffsetPagination ($id)
    {
        return ($id - 1)  * static::COUNT_RECORDS_ON_PAGE_JURISTS;
    }

    public function hideTargetCityAndFIO(array $arrayRubrics)
    {//скрывает у рубрики СТАТЬИ город и ФИО
        foreach (self::LIST_FOR_HIDE_CITY_AND_FIO as $rubric) {
            foreach ($arrayRubrics as $rubricName) {
                if ($rubric === $rubricName->getName())
                    return false;
            }
        }

        return true;
    }

    public function hideTargetCityAndFIOoDBAL(array $arrayRubrics)
    {//скрывает у рубрики СТАТЬИ город и ФИО
        foreach (self::LIST_FOR_HIDE_CITY_AND_FIO as $rubric) {
            foreach ($arrayRubrics as $rubricName) {
                if ($rubric === $rubricName['r_name'])
                    return false;
            }
        }

        return true;
    }

    private function getData()
    {
        $request = Request::createFromGlobals();
        $this->result['routes'] = [
            'ask__route' => '/ask/',
            'bread__crumbs' => [
                'bread__crumbs__main' => '/',
            ],
            'current__uri' => $request->getUri(),
        ];
        return $this->result['routes'];
    }

    public function getDate()
    {
        $this->result['copyright__info'] = '© 1998&ndash;' .date('Y'). ' &nbsp; ФГБУ <b>«Редакция «Российской газеты»</b>';
        $this->getData();//подставляется тут крч
        return $this->result;
    }

    protected function generateFirstLast(&$element)
    {
        $type = (!empty($element[0]) && stristr(key($element[0]), 'tags')) ? 'tags' : 'rubrics';
        if (count($element) >= 2) {
            $element[0][$type . '__FIRST__'] = 1;
            $element[count($element) -1][$type . '__LAST__'] = 1;
        } else if (count($element) === 1) {
            $element[0][$type . '__FIRST__'] = 1;
            $element[0][$type . '__LAST__'] = 1;
        }
        return $element;
    }

    protected function formedTagsAndRubrics($data)
    {
        if (!empty($data)) {
            $result = [];
            foreach ($data as $data_val) {
                /** Не выводить скрытые отключенные теги*/
                if (method_exists($data_val, 'getDisabled') && (boolean)$data_val->getDisabled() === false)
                    continue;
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
                        ? self::TAG . '1/' . $data_val->getId() . self::REDIRECT
                        : self::RUBRIC . $data_val->getCPUName() . self::REDIRECT,
                    (stristr((string)key($data_val), 'Tags'))
                        ? 'tags__id'
                        : 'rubrics__id'
                    =>
                        $data_val->getId()/*,
                    (stristr((string)key($data_val), 'Tags'))
                        ? 'tags__disabled'
                        : 'rubrics__disabled'
                    =>
                        (stristr((string)key($data_val), 'Tags'))
                            ? $data_val->getDisabled()
                            : '',*/
                ];
            }
            return $result;
        }
    }

    protected function formedTagsAndRubricsoDBAL($data)
    {
        if (!empty($data)) {
            $result = [];
            foreach ($data as $data_val) {
                if (isset($data_val['t_disabled']) && (boolean)$data_val['t_disabled'] === false)
                    continue;

                /**
                 * эти проверки ключей нужны для мусташа, так как в случае ошибки ключа, он будет искать
                 * key с аналогичным именим и может возникнуть путаница
                 **/
                $result[] = [
                    (stristr((string)key($data_val), 't_'))
                        ? 'tags__title'
                        : 'rubrics__title'
                    =>
                        (stristr((string)key($data_val), 't_'))
                            ? $data_val['t_name']
                            : $data_val['r_name'],

                    (stristr((string)key($data_val), 't_'))
                        ? 'tags__link'
                        : 'rubrics__link'
                    =>
                        (stristr((string)key($data_val), 't_'))
                            ? self::TAG . '1/' . $data_val['t_id'] . self::REDIRECT
                            : self::RUBRICS . $data_val['r_id'] . self::REDIRECT,
                    (stristr((string)key($data_val), 't_'))
                        ? 'tags__id'
                        : 'rubrics__id'
                    =>
                        (stristr((string)key($data_val), 't_'))
                            ? $data_val['t_id']
                            : $data_val['r_id']
                ];
            }
            return $result;
        }
    }

    /**
     * @param $idJurist
     * @param null $conditionsDate - нужно для сортировки юристов с условием за неделю
     * @return int
     */
    protected function getCountConsultation($idJurist, $conditionsDate = null)
    {
        if (gettype($idJurist) == 'object') $idJurist = $idJurist->getId();

        if ($conditionsDate) {
            $CountConsultationJurist = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Questions')
                ->createQueryBuilder('q')
                ->innerJoin('q.answersId', 'a', 'WITH', 'q.id = a.question')
                ->where('q.AuthUsersId = :AuthUsersId')
                ->andWhere('q.step = :step')
                ->andWhere('a.date > :date')
                ->setParameters([
                    'AuthUsersId' => $idJurist,
                    'step' => self::FINISHED_STEP,
                    'date' => $conditionsDate
                ])
                ->getQuery()
                ->execute();

        } else {
            $CountConsultationJurist = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Questions')
                ->findBy(['AuthUsersId' => $idJurist, 'step' => self::FINISHED_STEP]);
        }

        return count($CountConsultationJurist);
    }

    protected function fetchAvatar($avatar, $question)
    {
        if (!empty($avatar->getFileName())) {
            $imageMedium = [
                'jurist__img__type_medium' => 1,
                'jurist__img__file' => $avatar->getDirectory() . $avatar->getFilename(),
                'jurist__img__title' => (method_exists($question, 'getAnswersId')) ? //Проверка нужна для того, какой параметр получается. Question как на main и answers или как на Jurists
                    $question->getAnswersId()->getAuthUsersId()->getName() . ' ' .
                    $question->getAnswersId()->getAuthUsersId()->getSecondName()
                    :
                    $question->getName() . ' ' .
                    $question->getSecondName(),
                'jurist__img__width' => 100,
                'jurist__img__height' => 100,
            ];
        } else {
            $userNotHaveAvatar = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->findOneById(self::ID_USER_WITHOUT_AVATARS);

            $imageMedium = [
                'jurist__img__type_medium' => 1,
                'jurist__img__file' => $userNotHaveAvatar->getDirectory().$userNotHaveAvatar->getFilename(),
                'jurist__img__title' => $userNotHaveAvatar->getName() . ' ' . $userNotHaveAvatar->getSecondName(),
                'jurist__img__width' => $userNotHaveAvatar->getWidth(),
                'jurist__img__height' => $userNotHaveAvatar->getHeight(),
            ];
        }

        return $imageMedium;
    }

    protected function fetchAvataroDBAl($question)
    {
        if (!empty($question['au_filename'])) {
            $imageMedium = [
                'jurist__img__type_medium' => 1,
                'jurist__img__file' => $question['au_directory'] . $question['au_filename'],
                'jurist__img__title' => $question['au_name'] . ' ' . $question['au_second_name'],
//                'jurist__img__title' => (method_exists($question, 'getAnswersId')) ? //Проверка нужна для того, какой параметр получается. Question как на main и answers или как на Jurists
//                    $question->getAnswersId()->getAuthUsersId()->getName() . ' ' .
//                    $question->getAnswersId()->getAuthUsersId()->getSecondName()
//                    :
//                    $question->getName() . ' ' .
//                    $question->getSecondName(),
                'jurist__img__width' => 100,
                'jurist__img__height' => 100,
            ];
        } else {
            $userNotHaveAvatar = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->findOneById(self::ID_USER_WITHOUT_AVATARS);

            $imageMedium = [
                'jurist__img__type_medium' => 1,
                'jurist__img__file' => $userNotHaveAvatar->getDirectory().$userNotHaveAvatar->getFilename(),
                'jurist__img__title' => $userNotHaveAvatar->getName() . ' ' . $userNotHaveAvatar->getSecondName(),
                'jurist__img__width' => $userNotHaveAvatar->getWidth(),
                'jurist__img__height' => $userNotHaveAvatar->getHeight(),
            ];
        }

        return $imageMedium;
    }

    protected function receiveAnOverallRating($ratings) //СТАРЫЙ! Пееренесен в репозиторий Questions
    {
        $totalRating = 0; //Рейтинг юриста считается по вытаскиванию его рейтинга из всех вопросов и его суммирования
        foreach ($ratings as $rating) {
            if ($rating->getQuestion()->getStep() >= self::FINISHED_STEP) {
                $totalRating += $rating->getRating();
            }
        }
        return $totalRating;
    }

    /**
     * @param $dataForCheck - данные для проверки, в случае которых будет кинут экспешин
     * @param string $message - сообщение, кооторое будет видно в app_dev.php в случае экспешена
     */
    protected function pageNotFound ($dataForCheck, $message = '404: Page Not Found')
    {
        if ($dataForCheck)
            throw $this->createNotFoundException($message);
    }

    protected function formedJurists ($Jurists)
    {

        foreach ($Jurists as $Jurist) {
            if ($Jurist->getDisabled() === self::DISABLED_VALUE_ON) {
                $rubrics = [];

                foreach ($Jurist->getRubrics()->toArray() as $rubric) {
                    $rubrics[] = [
                        'rubrics__title' => $rubric->getName(),
                        'rubrics__link' => self::RUBRICS . $rubric->getId() . self::REDIRECT,
                    ];
                }

                $this->result['jurists_list'][] =
                    [
                        'mods' => 'list',
                        'jurist__img' => [$this->fetchAvatar($Jurist, $Jurist)],
                        'jurist__first_name' => $Jurist->getName(),
                        'jurist__link' => self::JURIST . $Jurist->getId() . self::REDIRECT,
                        'jurist__last_name' => $Jurist->getSecondName(),
                        'jurist__patronymic' => $Jurist->getPatronymic(),
                        'jurist__education' => $Jurist->getGraduate(),
                        'rubrics' => $rubrics,
                        'jurist__company' => (!empty($Jurist->getCompaniesId())) ? $Jurist->getCompaniesId()->getName() : '',
                        'jurist__rate' => [
                            'jurist__rate__author' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()), //Общий рейтинг
                        ],
                        'jurist__consultations' => $this->getCountConsultation($Jurist->getId()),
                        'jurist__id' => $Jurist->getId(),
                    ];

                $pagination[] = $Jurist->getId();
            }
        }


        foreach ($this->result['jurists_list'] as &$val) {
            $val['jurist__education__length'] =  (strlen($val['jurist__education']) > 0) ? 1 : 0;
            $val['jurist__company__length'] =  (strlen($val['jurist__company']) > 0) ? 1 : 0;
            $val['mods__length'] = count($val['mods']);
            $val['rubrics__length'] = count($val['rubrics']);
            $this->generateFirstLast($val['rubrics']);
        }
        unset($val);

    }

    protected function formedJuristsoDBAL($Jurists)
    {

        foreach ($Jurists as $Jurist) {

            if ((boolean)$Jurist['au_disabled'] === self::DISABLED_VALUE_ON) {
                $rubrics = [];

                foreach (json_decode($Jurist['rubric']) as $rubric) {
                    $rubrics[] = [
                        'rubrics__title' => $rubric->r_name,
                        'rubrics__link' => self::RUBRICS . $rubric->r_id . self::REDIRECT,
                    ];
                }

                $this->result['jurists_list'][] =
                    [
                        'mods' => 'list',
                        'jurist__img' => [$this->fetchAvataroDBAL($Jurist)],
                        'jurist__first_name' => $Jurist['au_name'],
                        'jurist__link' => self::JURIST . $Jurist['au_id'] . self::REDIRECT,
                        'jurist__last_name' => $Jurist['au_second_name'],
                        'jurist__patronymic' => $Jurist['au_patronymic'],
                        'jurist__education' => $Jurist['au_graduate'],
                        'rubrics' => $rubrics,
                        'jurist__company' => (!empty($Jurist['c_id'])) ? $Jurist['c_name'] : '',
                        'jurist__rate' => [
                            'jurist__rate__author' => $Jurist['au_total_rating'], //Общий рейтинг
                        ],
                        'jurist__consultations' => $Jurist['a_count'],
                        'jurist__id' => $Jurist['au_id'],
                    ];

                $pagination[] = $Jurist['au_id'];
            }
        }

        $this->pageNotFound(!isset($this->result['jurists_list']));

        foreach ($this->result['jurists_list'] as &$val) {
            $val['jurist__education__length'] =  (strlen($val['jurist__education']) > 0) ? 1 : 0;
            $val['jurist__company__length'] =  (strlen($val['jurist__company']) > 0) ? 1 : 0;
            $val['mods__length'] = count($val['mods']);
            $val['rubrics__length'] = count($val['rubrics']);
            $this->generateFirstLast($val['rubrics']);
        }
        unset($val);

    }

    protected function formedQuestions ($questions)
    {

        foreach ($questions as $questionKey => $question) {

            /**
             * Проверка что есть ответ. Потому что нельзя сделать сразу выборку по ассоциативным полям answersId
             */
            if (!empty($question->getAnswersId()) && $question->getStep() >= self::FINISHED_STEP) {

                /**
                 * генерация mods
                 *
                 * */
                $this->result['questions_list'][] = [
                    'mods' => [
                        ($question->getAnswersId()->getAuthUsersId()->getDateEndPay() > new \DateTime('now'))
                            ? self::NAME_PAY_JURIST
                            : '', //Оплачен ли юрист

                        ($question->getAnswersId()->getTypeCards() === 'card')
                            ? 'card'
                            : '', //Является ли вопрос карточкой
                    ],

                    /**
                     * генерация автора
                     *
                     * */
                    'questions__head' =>
                        [
                            'questions__head__author' =>
                                [
                                    [
                                        'questions__head__author__name' => $question->getAuthorId()->getName(),
                                        'questions__head__author__location' => $question->getAuthorId()->getCity()
                                    ]
                                ],
                            'questions__head__author__active' => $this->hideTargetCityAndFIO($question->getRubrics()->toArray())

                        ]
                    ,
                    'questions_list__bibliotechka' => ($questionKey == 2) ? true : false,
                    'tags' => $this->formedTagsAndRubrics($question->getTags()->toArray()), //tags_result,
                    'link' => self::RUBRICS . self::QUESTIONS . $question->getId() .  self::REDIRECT,
                    'rubrics' => $this->formedTagsAndRubrics($question->getRubrics()->toArray()),
                    'title' => $question->getTitle(),
                    //'title' => (!empty($question->getTitleSeo()) ? $question->getTitleSeo() : $question->getTitle()),
                    'text' => $question->getDescription(),
                    //'text' => (!empty($question->getDescriptionSeo()) ? $question->getDescriptionSeo() : $question->getDescription()),
                    'jurist' => [
                        'jurist__active' => ($question->getAnswersId()->getAuthUsersId()->getDisabled() == self::DISABLED_VALUE_ON) ? !self::DISABLED_VALUE_ON : self::DISABLED_VALUE_ON,
                        'jurist__first_name' => $question->getAnswersId()->getAuthUsersId()->getName(),
                        'jurist__last_name' => $question->getAnswersId()->getAuthUsersId()->getSecondName(),
                        'jurist__link' => self::JURIST . $question->getAnswersId()->getAuthUsersId()->getId() . self::REDIRECT,
                        'jurist__img' => [$this->fetchAvatar($question->getAnswersId()->getAuthUsersId(), $question)],
                        'jurist__rate' => [
                            'jurist__rate__reply' => $question->getAnswersId()->getRating(),
                            'jurist__rate__author' => $this->receiveAnOverallRating($question->getAnswersId()->getAuthUsersId()->getAnswers()->toArray()) //total_rating
                        ]
                    ],
                    'questions__item_complete' => 0,
                ];


                if ($questionKey == 3) {
                    $this->result['questions_list'][] = [
                        'mods' => [
                            'bibliotechka'
                        ]
                    ];
                }

                foreach ($this->result['questions_list'] as &$val) {

                    /**
                     * Если первый ключ равен оплаченому юристу self::NAME_PAY_JURIST, то выставляем визабилити,
                     * если нет, то сносим.
                     */
                    if (!empty($val['mods'][0]) && $val['mods'][0] === self::NAME_PAY_JURIST) {
                        $val['visibility'] = [//true если mods = highlighted
                            'visibility__state' => 'visible'
                        ];
                    } else if (isset($val['mods'][0]) && $val['mods'][0] === '') {
                        unset($val['mods'][0]);
                    }
                    if (isset($val['mods'][1]) && $val['mods'][1] === '') unset($val['mods'][1]);
                    if (!empty($val['mods']) &&  count($val['mods']) > 0) {
                        $val['mods__length'] = count($val['mods']);
                    } else {
                        unset($val['mods']);
                    }

                    if (!empty($val['mods']))$val['mods'] = array_values($val['mods']); //Потому что тупой мусташ считает [1 => 'cart'] массивом, хотя, явно это не указанно

                    /**
                     * Работа с тегами и рубриками
                     */
                    $this->generateFirstLast($val['rubrics']);

                    $this->generateFirstLast($val['tags']);

                    $val['tags__length'] = count($val['tags']);

                    /**
                     * Работаем с хранилищем аватарок для юристов
                     */
                    if (isset($val['jurist']) && count($val['jurist']['jurist__img']) > 0) {
                        $val['jurist']['jurist__img__length'] = count($val['jurist']['jurist__img']);
                    }
                }
                unset($val);
            }
        }
    }

    /**
     * @param array $data
     * @param $keyNewManyToManyArray
     * @param array $field - ключ названия нового подмасива, где manyToMany. значение - массив с ключами, ключ должен соответствывать имени нужного поля
     * @return array
     */
    protected function hackManyToMany(array &$data, $keyNewManyToManyArray, array $field) {
        $result = [];

        foreach ($data as &$dataVal)
            foreach ($field as $newSubManyToMayName => $valueNewSubArray) {
                $resultSubArray = [];
                foreach ($valueNewSubArray as $key => $val) $resultSubArray[$val] = $dataVal[$val];

                if (array_key_exists($dataVal[$keyNewManyToManyArray], $result)) { //Если уже есть, то добавляем в существующий
                    $result[$dataVal[$keyNewManyToManyArray]][$newSubManyToMayName][] = $resultSubArray;
                    foreach ($result[$dataVal[$keyNewManyToManyArray]][$newSubManyToMayName] as $duplicateVal) //Чтоб не было дублей
                        if ($duplicateVal[key($duplicateVal)] === $resultSubArray[key($resultSubArray)]) continue 3;

                } else { //Если еще нет, то создаем
                    $dataVal[$newSubManyToMayName][] = $resultSubArray;
                    $result[$dataVal[$keyNewManyToManyArray]] = $dataVal;
                }
            }
        unset($dataVal);

        return $result;
    }

    protected function formedQuestionsoDBAL ($questions)
    { // Нормальная версия, используется в поиске
        foreach ($questions as &$question) {
            $question["tags"] = $this->formedTagsAndRubricsoDBAL(json_decode($question["tags"], true));
            $question["rubrics"] = $this->formedTagsAndRubricsoDBAL(
                [
                    [
                        "r_id" => $question["r_id"],
                        "r_name" => $question["r_name"]
                    ]
                ]
            );
        }
        unset($question);

        foreach ($questions as $questionKey => $question) {
            $this->result['questions_list'][] = [
                'mods' => [
                    ($question['au_dateEndPay'] > new \DateTime('now'))
                        ? self::NAME_PAY_JURIST
                        : '', //Оплачен ли юрист

                    ($question['a_typeCards'] === 'card')
                        ? 'card'
                        : '', //Является ли вопрос карточкой
                ],

                /**
                 * генерация автора
                 *
                 * */
                'questions__head' =>
                    [
                        'questions__head__author' =>
                            [
                                [
                                    'questions__head__author__name' => $question['author_name'],
                                    'questions__head__author__location' => $question['author_city']
                                ]
                            ],
                        'questions__head__author__active' => $this->hideTargetCityAndFIOoDBAL([
                            [
                                'r_name' => $question['r_name']
                            ]
                        ])

                    ]
                ,
                'questions_list__bibliotechka' => ($questionKey == 2) ? true : false,
                'tags' => $question['tags'], //tags_result,
                'link' => self::RUBRICS . self::QUESTIONS . $question['q_id'] .  self::REDIRECT,
                'rubrics' => $question['rubrics'],
                'title' => $question['q_title'],
                'text' => $question['q_description'],
                'jurist' => [
                    'jurist__active' => ($question['au_disabled'] == self::DISABLED_VALUE_ON) ? !self::DISABLED_VALUE_ON : self::DISABLED_VALUE_ON,
                    'jurist__first_name' => $question['au_name'],
                    'jurist__last_name' => $question['au_second_name'],
                    'jurist__link' => self::JURIST . $question['au_id'] . self::REDIRECT,
                    'jurist__img' => [$this->fetchAvataroDBAl($question)],
                    'jurist__rate' => [
                        'jurist__rate__reply' => $question['a_rating'],
                        'jurist__rate__author' => (empty($question['au_total_rating']) ? 0 : $question['au_total_rating']) //total_rating
                    ]
                ],
                'questions__item_complete' => 0,
            ];

            if ($questionKey == 3) {
                $this->result['questions_list'][] = [
                    'mods' => [
                        'bibliotechka'
                    ]
                ];
            }

            foreach ($this->result['questions_list'] as &$val) {

                /**
                 * Если первый ключ равен оплаченому юристу self::NAME_PAY_JURIST, то выставляем визабилити,
                 * если нет, то сносим.
                 */

                if (!empty($val['mods'][0]) && $val['mods'][0] === self::NAME_PAY_JURIST) {
                    $val['visibility'] = [//true если mods = highlighted
                        'visibility__state' => 'visible'
                    ];
                } else if (isset($val['mods'][0]) && $val['mods'][0] === '') {
                    unset($val['mods'][0]);
                }
                if (isset($val['mods'][1]) && $val['mods'][1] === '') unset($val['mods'][1]);
                if (!empty($val['mods']) &&  count($val['mods']) > 0) {
                    $val['mods__length'] = count($val['mods']);
                } else {
                    unset($val['mods']);
                }

                if (!empty($val['mods']))$val['mods'] = array_values($val['mods']); //Потому что тупой мусташ считает [1 => 'cart'] массивом, хотя, явно это не указанно

                /**
                 * Работа с тегами и рубриками
                 */
                $this->generateFirstLast($val['rubrics']);

                $this->generateFirstLast($val['tags']);

                $val['tags__length'] = count($val['tags']);

                /**
                 * Работаем с хранилищем аватарок для юристов
                 */
                if (isset($val['jurist']) && count($val['jurist']['jurist__img']) > 0) {
                    $val['jurist']['jurist__img__length'] = count($val['jurist']['jurist__img']);
                }
            }
            unset($val);

        }
    }

    protected function formedQuestionsDBAL ($questions)
    { // Кривая версия для бесконечной подгрузки, по-идее, когда ты будешь это читать, то она уже будет не нужна. Это должно перенестись на генератор SSI и JSON
        /*if ($_SERVER['REMOTE_ADDR'] == '212.69.111.131') { // Для дебага
        }*/
        $questions = $this->hackManyToMany($questions, 'q_id', [
            'tags' => ['t_id', 't_name', 't_disabled'],
            'rubrics' => ['r_id', 'r_name']
        ]);
        foreach ($questions as $questionKey => $question) {

            /**
             * Проверка что есть ответ. Потому что нельзя сделать сразу выборку по ассоциативным полям answersId
             */
            if (!empty($question['a_id']) && $question['q_step'] >= self::FINISHED_STEP) {

                /**
                 * генерация mods
                 *
                 * */

                $this->result['questions_list'][] = [
                    'mods' => [
                        ($question['au_dateEndPay'] > new \DateTime('now'))
                            ? self::NAME_PAY_JURIST
                            : '', //Оплачен ли юрист

                        ($question['a_typeCards'] === 'card')
                            ? 'card'
                            : '', //Является ли вопрос карточкой
                    ],

                    /**
                     * генерация автора
                     *
                     * */
                    'questions__head' =>
                        [
                            'questions__head__author' =>
                                [
                                    [
                                        'questions__head__author__name' => $question['author_name'],
                                        'questions__head__author__location' => $question['author_city']
                                    ]
                                ],
                            'questions__head__author__active' => $this->hideTargetCityAndFIOoDBAL($question['rubrics'])

                        ]
                    ,
                    'questions_list__bibliotechka' => ($questionKey == 2) ? true : false,
                    'tags' => $this->formedTagsAndRubricsoDBAL($question['tags']), //tags_result,
                    'link' => self::RUBRICS . self::QUESTIONS . $question['q_id'] .  self::REDIRECT,
                    'rubrics' => $this->formedTagsAndRubricsoDBAL($question['rubrics']),
                    'title' => $question['q_title'],
                    'text' => $question['q_description'],
                    'jurist' => [
                        'jurist__active' => ($question['au_disabled'] == self::DISABLED_VALUE_ON) ? !self::DISABLED_VALUE_ON : self::DISABLED_VALUE_ON,
                        'jurist__first_name' => $question['au_name'],
                        'jurist__last_name' => $question['au_second_name'],
                        'jurist__link' => self::JURIST . $question['au_id'] . self::REDIRECT,
                        'jurist__img' => [$this->fetchAvataroDBAl($question)],
                        'jurist__rate' => [
                            'jurist__rate__reply' => $question['a_rating'],
                            'jurist__rate__author' => (empty($question['au_total_rating']) ? 0 : $question['au_total_rating']) //total_rating
                        ]
                    ],
                    'questions__item_complete' => 0,
                ];


                if ($questionKey == 3) {
                    $this->result['questions_list'][] = [
                        'mods' => [
                            'bibliotechka'
                        ]
                    ];
                }

                foreach ($this->result['questions_list'] as &$val) {

                    /**
                     * Если первый ключ равен оплаченому юристу self::NAME_PAY_JURIST, то выставляем визабилити,
                     * если нет, то сносим.
                     */

                    if (!empty($val['mods'][0]) && $val['mods'][0] === self::NAME_PAY_JURIST) {
                        $val['visibility'] = [//true если mods = highlighted
                            'visibility__state' => 'visible'
                        ];
                    } else if (isset($val['mods'][0]) && $val['mods'][0] === '') {
                        unset($val['mods'][0]);
                    }
                    if (isset($val['mods'][1]) && $val['mods'][1] === '') unset($val['mods'][1]);
                    if (!empty($val['mods']) &&  count($val['mods']) > 0) {
                        $val['mods__length'] = count($val['mods']);
                    } else {
                        unset($val['mods']);
                    }

                    if (!empty($val['mods']))$val['mods'] = array_values($val['mods']); //Потому что тупой мусташ считает [1 => 'cart'] массивом, хотя, явно это не указанно

                    /**
                     * Работа с тегами и рубриками
                     */
                    $this->generateFirstLast($val['rubrics']);

                    $this->generateFirstLast($val['tags']);

                    $val['tags__length'] = count($val['tags']);

                    /**
                     * Работаем с хранилищем аватарок для юристов
                     */
                    if (isset($val['jurist']) && count($val['jurist']['jurist__img']) > 0) {
                        $val['jurist']['jurist__img__length'] = count($val['jurist']['jurist__img']);
                    }
                }
                unset($val);
            }
        }
    }

//    protected function formedQuestionsDBAL ($questions)
//    {
//
//        foreach ($questions as $questionKey => $question) {
//
//            dump($question);die;
//            /**
//             * Проверка что есть ответ. Потому что нельзя сделать сразу выборку по ассоциативным полям answersId
//             */
//            if (!empty($question->getAnswersId()) && $question->getStep() >= self::FINISHED_STEP) {
//
//                /**
//                 * генерация mods
//                 *
//                 * */
//                $this->result['questions_list'][] = [
//                    'mods' => [
//                        ($question->getAnswersId()->getAuthUsersId()->getDateEndPay() > new \DateTime('now'))
//                            ? self::NAME_PAY_JURIST
//                            : '', //Оплачен ли юрист
//
//                        ($question->getAnswersId()->getTypeCards() === 'card')
//                            ? 'card'
//                            : '', //Является ли вопрос карточкой
//                    ],
//
//                    /**
//                     * генерация автора
//                     *
//                     * */
//                    'questions__head' =>
//                        ['questions__head__author' =>
//                            [
//                                [
//                                    'questions__head__author__name' => $question->getAuthorId()->getName(),
//                                    'questions__head__author__location' => $question->getAuthorId()->getCity(),
//                                ]
//                            ]
//                        ]
//                    ,
//                    'questions_list__bibliotechka' => ($questionKey == 2) ? true : false,
//                    'tags' => $this->formedTagsAndRubrics($question->getTags()->toArray()), //tags_result,
//                    'link' => self::RUBRICS . self::QUESTIONS . $question->getId() .  self::REDIRECT,
//                    'rubrics' => $this->formedTagsAndRubrics($question->getRubrics()->toArray()),
//                    'title' => $question->getTitle(),
//                    //'title' => (!empty($question->getTitleSeo()) ? $question->getTitleSeo() : $question->getTitle()),
//                    'text' => $question->getDescription(),
//                    //'text' => (!empty($question->getDescriptionSeo()) ? $question->getDescriptionSeo() : $question->getDescription()),
//                    'jurist' => [
//                        'jurist__active' => ($question->getAnswersId()->getAuthUsersId()->getDisabled() == self::DISABLED_VALUE_ON) ? !self::DISABLED_VALUE_ON : self::DISABLED_VALUE_ON,
//                        'jurist__first_name' => $question->getAnswersId()->getAuthUsersId()->getName(),
//                        'jurist__last_name' => $question->getAnswersId()->getAuthUsersId()->getSecondName(),
//                        'jurist__link' => self::JURIST . $question->getAnswersId()->getAuthUsersId()->getId() . self::REDIRECT,
//                        'jurist__img' => [$this->fetchAvatar($question->getAnswersId()->getAuthUsersId(), $question)],
//                        'jurist__rate' => [
//                            'jurist__rate__reply' => $question->getAnswersId()->getRating(),
//                            'jurist__rate__author' => $this->receiveAnOverallRating($question->getAnswersId()->getAuthUsersId()->getAnswers()->toArray()) //total_rating
//                        ]
//                    ],
//                    'questions__item_complete' => 0,
//                ];
//
//
//                if ($questionKey == 3) {
//                    $this->result['questions_list'][] = [
//                        'mods' => [
//                            'bibliotechka'
//                        ]
//                    ];
//                }
//
//                foreach ($this->result['questions_list'] as &$val) {
//
//                    /**
//                     * Если первый ключ равен оплаченому юристу self::NAME_PAY_JURIST, то выставляем визабилити,
//                     * если нет, то сносим.
//                     */
//                    if (!empty($val['mods'][0]) && $val['mods'][0] === self::NAME_PAY_JURIST) {
//                        $val['visibility'] = [//true если mods = highlighted
//                            'visibility__state' => 'visible'
//                        ];
//                    } else if (isset($val['mods'][0]) && $val['mods'][0] === '') {
//                        unset($val['mods'][0]);
//                    }
//                    if (isset($val['mods'][1]) && $val['mods'][1] === '') unset($val['mods'][1]);
//                    if (!empty($val['mods']) &&  count($val['mods']) > 0) {
//                        $val['mods__length'] = count($val['mods']);
//                    } else {
//                        unset($val['mods']);
//                    }
//
//                    if (!empty($val['mods']))$val['mods'] = array_values($val['mods']); //Потому что тупой мусташ считает [1 => 'cart'] массивом, хотя, явно это не указанно
//
//                    /**
//                     * Работа с тегами и рубриками
//                     */
//                    $this->generateFirstLast($val['rubrics']);
//
//                    $this->generateFirstLast($val['tags']);
//
//                    $val['tags__length'] = count($val['tags']);
//
//                    /**
//                     * Работаем с хранилищем аватарок для юристов
//                     */
//                    if (isset($val['jurist']) && count($val['jurist']['jurist__img']) > 0) {
//                        $val['jurist']['jurist__img__length'] = count($val['jurist']['jurist__img']);
//                    }
//                }
//                unset($val);
//            }
//        }
//    }

    protected function bibliotechkaRand($cpu_name = null)
    {
        if (is_null($cpu_name))
            return $this->oldDeprecatedBiblioRand();
        try {
            $raw_rubric = $this->redis->get('biblio:' . $cpu_name);
            if (!$raw_rubric) return [];

            $rubric_array = unserialize($raw_rubric);

            $cap = count($rubric_array);
            if ($cap < 2) {
                return $rubric_array;
            }

            $result_raw = [];

            for ($i = 0; $i < $cap; $i++) {
                $rand_book = array_rand($rubric_array);

                if (!key_exists($rand_book, $result_raw)) { //Проверяем, чтоб не было дублей
                    $result_raw[$rand_book] = $rubric_array[$rand_book];
                }

                if (count($result_raw) == 2) break;
            }

            $result = array_values($result_raw);

            return $result;

        } catch (\Exception $e) {
//            return [];
            return $this->oldDeprecatedBiblioRand();
        }
    }

    private function oldDeprecatedBiblioRand()
    {
        // old school
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
                    'book__title' => 'Садоводы, дачники и их объединения: защита прав и интересов',
                    'book__annotation' => 'Книга поможет найти ответ практически на любой вопрос, связанный с деятельностью садоводческих и дачных некоммерческих объединений, поскольку ее автор является практикующим адвокатом, непосредственно занимающимся проблемами садоводов более 15 лет.',
                    'book__download' => [
                        'book__download__link' => '//bibliotechka.rg.ru/upload/iblock/e3d/e3d4d386a6fe115b2a87cca8b628ac0e.pdf',
                        'book__download__size' => '46,1 Кб'
                    ],
                    'book__price' => '295 руб.',
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
                    'book__price' => '295 руб.',
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
                    'book__title' => 'Многоквартирный дом: как эффективно управлять своим домом и решать возникающие проблемы',
                    'book__annotation' => 'Книга состоит из ответов на вопросы, касающиеся управления многоквартирным домом, подготовки и проведения общего собрания и оформления его решений. В ней приводится типовой договор для взаимодействия с УК и формы документов для проведения общего собрания.',
                    'book__download' => [
                        'book__download__link' => '//bibliotechka.rg.ru//upload/iblock/96b/96b016c79f6b2fd916080da347925d35.pdf',
                        'book__download__size' => '40,6 Кб'
                    ],
                    'book__price' => '295 руб.',
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
                    'book__price' => '295 руб.',
                    'book__purchase_link' => '//bibliotechka.rg.ru/products/?SECTION_ID=35&ELEMENT_ID=490&sphrase_id=11577',
                ],
            ],
        ];

        $result_array = [];

        while (count($result_array) < 2) {

            $rand = array_rand($bibliotechkaRand);

            if (!key_exists($rand, $result_array)) { //Проверяем, чтоб не было дублей
                $result_array[$rand] = $bibliotechkaRand[$rand];
            }
        }

        //Для мусташа, а иначе он не понимает ключи, т.е. порядок [3 => 'ddd', 1 => 'bbb'] ему не понятен, а так понятен [0 => 'ddd', 1 => 'bbb']
        $result = array_values($result_array);

        return $result;
    }

    public function SidebarAction(
        $format = self::FORMAT, $id = null, $where = null, $orderBy = null, $answers_limit = 4,
        $questionsLatestMods = 'latest', $juristsFeedLimit = 2, $juristsLatestMods = 'feed',
        $juristsTopMods = 'top', $juristsTopWeek = 3
    )
    {

        if ($format === 'json') {

            $nameRedisNow = 'Pravo:Api:SidebarAction';

            $redisNow = $this->redis->get($nameRedisNow);

            $redisUnserialize = unserialize($redisNow); //Так надо из-за мусташа

            if ($redisNow) {

                //TODO Так сделано, потому что сайдбар можеть вызываться в середине или конце, и при явном  присвоение $this->result мы затрем результаты
                $this->result['sidebar'] =  $redisUnserialize['sidebar'];
                $this->result['questions_latest'] =  $redisUnserialize['questions_latest'];
                $this->result['questions_latest__length'] =  $redisUnserialize['questions_latest__length'];
                $this->result['jurists_feed'] =  $redisUnserialize['jurists_feed'];
                $this->result['jurists_top'] =  $redisUnserialize['jurists_top'];

                $cpu_name = $this->result['current_rubric']['current_rubric_cpu_name'] ?? null;
                $bibl = $this->bibliotechkaRand($cpu_name)[0];
                $this->result['sidebar']['bibliotechka'] = $bibl;

                return $this->result;
            }

            $RubricsQuery = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Rubrics')
                ->findBy([], ['name' => 'ASC']);

            $Answers = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:Answers')
                ->createQueryBuilder('a')
                //->select('a.id')
                ->innerJoin('a.question', 'q', 'WITH', 'q.id = a.question')
                ->where('q.step = :step')
                ->setParameters(['step' => self::FINISHED_STEP])
                ->orderBy('a.date', 'DESC')
                ->getQuery()
                ->execute();

            $Jurists = $this->connect_to_Jurists_bd
                ->getRepository('JuristBundle:AuthUsers')
                ->findBy([], []);

            $questionsLatest = [];

            $date = new \DateTime('now'); //Для jurists_top
            $expires = '-1 week';
            $date->modify($expires);
            $idJuristsTop = []; //Выборк юристов для топа jurists_top

            $dataByAnswerId = $this->connect_to_Jurists_bd->getRepository('JuristBundle:Questions')->fetchDataByAnswerId($Answers, self::FINISHED_STEP);

            foreach ($Answers as $Answer) {

                /**
                 * Выборка вопросов которые уже опубликованы
                 */
                $rubrics = [];

                if ($Answer->getDate() > $date && $Answer->getAuthUsersId()->getDisabled() == self::DISABLED_VALUE_ON) { //Выборк id юристов для топа у которых есть ответы за последнию неделю
                    $idJuristsTop[] = $Answer->getAuthUsersId()->getId();
                }

                $rubrics[] = [
                    'rubrics__title' => htmlspecialchars($dataByAnswerId[$Answer->getId()]['r_name']),
                    'rubrics__link' =>  self::RUBRIC . $dataByAnswerId[$Answer->getId()]['r_CPU_name'] . self::REDIRECT
                ];

                $questionsLatest[] = [
                    'mods' => [$questionsLatestMods],
                    'rubrics' => $rubrics,
                    'title' => $dataByAnswerId[$Answer->getId()]['q_title'],
                    'link' => self::RUBRICS . self::QUESTIONS . $dataByAnswerId[$Answer->getId()]['q_id'] .  self::REDIRECT,
                ];

                foreach ($questionsLatest as $keyQuestionLatest => &$questionLatest) {

                    if (count($questionLatest['rubrics']) == 0)
                        unset($questionsLatest[$keyQuestionLatest]);

                    $questionLatest['mods__length'] = count($questionLatest['mods']);
                    $questionLatest['rubrics__length'] = count($questionLatest['rubrics']);
                }

                unset($questionLatest);

            }

            $juristFeed = [];

            $idJuristsTop = array_unique($idJuristsTop);
            $juristsTop = [];


            /** Получаем из РЕПЫ рубрики по массиву id юристов **/
            $dataByJuristRubric = $this->connect_to_Jurists_bd->getRepository('JuristBundle:Questions')->fetchDataByJurist($Jurists);
            $totalRatingJurist = $this->connect_to_Jurists_bd->getRepository('JuristBundle:Questions')->fetchTotalRatingJurist($Jurists, self::FINISHED_STEP);
            $totalCountConsultation = $this->connect_to_Jurists_bd->getRepository('JuristBundle:Questions')->totalCountConsultation($Jurists, date('Y-m-d H:i:s', strtotime($expires)));

            foreach($Jurists as $Jurist) {

                /**
                 * todo jurists_top
                 *  перебираем id юристов у которых есть ответы за последнию неделю
                 */

                foreach ($idJuristsTop  as $idJuristTop)
                    if ($Jurist->getId() == $idJuristTop)
                        $juristsTop[] = [
                            'mods' => [$juristsTopMods],
                            'jurist__img' => [$this->fetchAvatar($Jurist, $Jurist)],
                            'jurist__link' => self::JURIST . $Jurist->getId() . self::REDIRECT,
                            'jurist__first_name' => $Jurist->getName(),
                            'jurist__last_name' => $Jurist->getSecondName(),
                            'jurist__consultations' => ((isset($totalCountConsultation['result_date'][$Jurist->getId()]['total_count'])) ? $totalCountConsultation['result_date'][$Jurist->getId()]['total_count'] : 0),
                            //'jurist__rate__author' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()), //Общий рейтинг Старый способ
                            'jurist__rate__author' => $totalRatingJurist[$Jurist->getId()]['total_rating'], //Общий рейтинг
                        ];


                $rubrics = [];
                if(isset($dataByJuristRubric[$Jurist->getId()]))
                    foreach ($dataByJuristRubric[$Jurist->getId()] as $rubricVal)  //Формируем рубрики для юристов
                        $rubrics[] = [
                            'rubrics__title' => $rubricVal['r_name'],
                            'rubrics__link' => self::RUBRICS . $rubricVal['r_id'] . self::REDIRECT,
                        ];

                /**
                 * todo jurists_feed
                 */
                if ($Jurist->getDateEndOfferServices() > new \DateTime('now') && $Jurist->getDisabled() === self::DISABLED_VALUE_ON) //Проверка оплачености и активности
                    $juristFeed[] = [
                        'mods' => [$juristsLatestMods],
                        'jurist__img' => [$this->fetchAvatar($Jurist, $Jurist)],
                        'jurist__link' => self::JURIST . $Jurist->getId() . self::REDIRECT,
                        'jurist__education' => $Jurist->getGraduate(),
                        'jurist__education__length' => ($Jurist->getGraduate() == '') ? false : true,
                        'rating' => $this->receiveAnOverallRating($Jurist->getAnswers()->toArray()),
                        'jurist__first_name' => $Jurist->getName(),
                        'jurist__last_name' => $Jurist->getSecondName(),
                        'jurist__patronymic' => $Jurist->getPatronymic(),
                        'rubrics' => $rubrics
                    ];

            }

            /**
             * jurists_feed
             * сортируем юристов по рейтингу и затем обрезаем для заданного лимита
             */
            usort($juristFeed, function ($a, $b) {
                return strcmp($b['rating'], $a['rating']);
            });
            $juristFeed = array_splice($juristFeed, 0, $juristsFeedLimit);

            /**
             * jurists_top
             * сортируем юристов по рейтингу и затем обрезаем для заданного лимита
             */
            usort($juristsTop, function ($a, $b) {
                return strcmp($b['jurist__consultations'], $a['jurist__consultations']);
            });
            $juristsTop = array_splice($juristsTop, 0, $juristsTopWeek);

            /**
             * questions_latest
             */
            $questionsLatest = array_splice($questionsLatest, 0, $answers_limit);

            foreach($juristsTop as &$valJuristsTop) { //juristsTop подсчет length && first/last
                $valJuristsTop['jurist__img__length'] = count($valJuristsTop['jurist__img']);
                $valJuristsTop['mods__length'] = count($valJuristsTop['mods']);
            }
            unset($valJuristsTop);

            foreach($juristFeed as &$valJuristFeed) { //jurists_feed подсчет length && first/last
                $valJuristFeed['jurist__img__length'] = count($valJuristFeed['jurist__img']);
                $valJuristFeed['mods__length'] = count($valJuristFeed['mods']);
                $valJuristFeed['rubrics__length'] = count($valJuristFeed['rubrics']);
                $this->generateFirstLast($valJuristFeed['rubrics']);
            }
            unset($valJuristFeed);


            $this->result['questions_latest'] = $questionsLatest; // Последние вопросы

            $this->result['questions_latest__length'] = count($questionsLatest);

            $this->result['abyrvalg'] = 'glavryba';

            $this->result['jurists_feed'] = $juristFeed;

            $this->result['jurists_top'] = $juristsTop; // Юристы в топе за неделю

            $this->result['sidebar'] = [];
            foreach($RubricsQuery as $rubricValue)
                $this->result['sidebar']['categories']['rubrics'][] = [
                    'rubrics__title' => $rubricValue->getName(),
                    'rubrics__link' => self::RUBRIC . $rubricValue->getCPUName() . self::REDIRECT,
                    //'rubrics__active' => (!empty($id) && $id == $rubricValue->getId()) ? true : false,
                ];

            $cpu_name = $this->result['current_rubric']['current_rubric_cpu_name'] ?? null;
            $bibl = $this->bibliotechkaRand($cpu_name)[0];
            $this->result['sidebar']['bibliotechka'] = $bibl;

            foreach ($this->getDownCategoryForSort() as $key => $allRubricForDown) {

                usort($this->result['sidebar']['categories']['rubrics'], function($firstVal, $twoVal) use ($key) {

                    if($firstVal['rubrics__title'] === $key) // Помещаем указанное слово вниз, поп росьбе сео и проект менеджера
                        return 1;

                });

                foreach ($this->result['sidebar']['categories']['rubrics'] as &$rubricItem)
                    $rubricItem['select_rubric'] = (
                        empty($rubricItem['select_rubric']) ? (
                            $rubricItem['rubrics__title'] === $key ? @$allRubricForDown['select_rubric'] : false // Lel. I`m know about this error :p
                        ) : $rubricItem['select_rubric']
                    );
                unset($rubricItem);

            }

            $this->redis->setEx($nameRedisNow, (60 * 120), serialize($this->result)); //Expires на 2 часа


            return $this->result;

        } elseif ($format === 'html') {

            return new Response('Формат = ' . $format . " страница = " . $id);

        } else {

            throw $this->createAccessDeniedException("Incorrect format!!! " . PHP_EOL . " Use next structure: /jurists/page/{name page}/{format == html || json}!");

        }

    }

    public function HeaderAction($active = null)
    {

        $this->result['header'] = [
            'tabs' => [
                [
                    'tabs__name' => 'Консультации',
                    'tabs__link' => self::MAIN_HEADER,
                    'tabs__active' => ($active == 'main') ? 1 : 0,
                ],
                [
                    'tabs__name' => 'Юристы',
                    'tabs__link' => self::JURISTS_HEADER,
                    'tabs__active' => ($active == 'jurist') ? 1 : 0,
                ],
                [
                    'tabs__name' => 'Правила',
                    'tabs__link' => self::RULES_HEADER,
                    'tabs__active' => ($active == 'rules') ? 1 : 0,
                ],
                [
                    'tabs__name' => 'Теги',
                    'tabs__link' => self::TAGS_HEADER,
                    'tabs__active' => ($active == 'tags') ? 1 : 0,
                ],
                [
                    'tabs__name' => 'Партнеры',
                    'tabs__link' => self::PARTNERS_HEADER,
                    'tabs__active' => ($active == 'partners') ? 1 : 0,
                ],
            ],
            'header__link' => self::MAIN_HEADER,
            'header__title' => self::MAIN_HEADER_TITLE
        ];

        return $this->result;

    }

    protected function PaginationGenerateArrowAction ($numberPage, $currentPage, $link, $conditionId = '', $getString)
    {
        static $arrow = [];

        if ($numberPage == $currentPage-1) {
            $arrow[] = [
                'arrow__prev' => true,
                'arrow__link' => ($link. $numberPage . $conditionId . self::REDIRECT . $getString !== '/main/1/') ? $link. $numberPage . $conditionId . self::REDIRECT . $getString : '/' . $getString,
            ];
        }

        if ($numberPage == $currentPage+1) {
            $arrow[] = [
                'arrow__next' => true,
                'arrow__link' => $link . $numberPage . $conditionId . self::REDIRECT . $getString,
            ];
        }

        return $arrow;
    }

    protected function ProcessingRequestForPaginationAction()
    { //Зават get запросов

        $valueGetPagination = '?';

        $request = Request::createFromGlobals();
        foreach ($request->query->all() as $keysQueryGet => $valuesQueryGet) {
            $valueGetPagination .= $keysQueryGet . '=' . $valuesQueryGet . '&';
        }

        if ($valueGetPagination[strlen($valueGetPagination)-1] === '&') {
            $valueGetPagination = substr($valueGetPagination, 0, strlen($valueGetPagination)-1);
        }

        if ($valueGetPagination === '?') $valueGetPagination = '';

        return $valueGetPagination;

    }

    /**
     * @param $query - select * по заданной выборки
     * @param $countNumericPage - количество пагинация на странице
     * @param $countRecordsOnPage - количество записей на странице
     * @param $currentPage - текущая страница
     * @param $link - ссылка роут
     * @param int $firstPage - первая страница
     * @param string $conditionId - костыли для таких категорий, как выборка по тегу или рубрики
     * @param string $getString - набор get запросов
     * @return bool
     * @throws Exception
     */
    protected function PaginationAction (
        $query, $countNumericPage, $countRecordsOnPage, $currentPage,
        $link, $firstPage = 1, $conditionId = '', $getString = ''
    )
    {
        if (!$currentPage) {
            if ($this->get('kernel')->getEnvironment() != 'dev') {
                $this->pageNotFound(true);
            }
            throw new Exception("Не допустимое значение: id = $currentPage");
        }
        $countRecords = (gettype($query) === 'string') ? $query : count($query);

        if ($countRecords < $countRecordsOnPage) {
            $totalPages = ceil($countRecords / $countRecordsOnPage);
        } else {
            $totalPages = floor($countRecords / $countRecordsOnPage);
        }

        /**
         * start numeric_page
         *
         * logic:
         * We have for example 20 page with $countNumericPage == 5
         *
         * 1,2,3,4,5,6,7,8,9,10,11,12,13,14,1516,17,18,19,20
         *
         * if $currentPage == 1(first)
         * then we see 1(disabled),2,3,4...20
         *
         * else if $currentPage == 20(last page)
         * then we see 1...17,18,19,20(disabled)
         *
         * else if $currentPage == 1+1
         * then we see 1,2(disabled),3,4...20
         *
         * else if $currentPage == 20-1(last page-1)
         * then we see 1...17,18,19(disabled),20
         *
         * else if $currentPage == (example) 10
         * then we see 1...9,10(disabled),11...20
         *
         */

        if ($totalPages <= 1) return false; //Если 1 страница всего

        foreach (range($firstPage, $totalPages) as $i) {

            if ($currentPage == $firstPage && $i <= $countNumericPage) { //TODO на первой странице
                if ($i < $countNumericPage) {
                    $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);

                    $numericPage[] = [
                        'number_page' => $i,
                        'link' => ($link . $i . $conditionId . self::REDIRECT !== '/main/1/') ? $link . $i . $conditionId . self::REDIRECT . $getString : '/' . $getString,
                        'current' => ($i == $currentPage) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false
                    ];
                } else {
                    $numericPage[] = [
                        'number_page' => $totalPages,
                        'link' => ($link . $i . $conditionId . self::REDIRECT !== '/main/1/') ? $link . $totalPages . $conditionId . self::REDIRECT . $getString : '/' . $getString,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                        'right_three_dots' => ($totalPages > $countNumericPage+1) ? true : false, //Чтоб не было точек если 2-е стр и между ними точки
                    ];
                }
            } elseif ($currentPage == $totalPages && $i > $totalPages - $countNumericPage) { //TODO последний
                $numericPage[] = [
                    'number_page' => $i,
                    'link' => $link . $i . $conditionId . self::REDIRECT . $getString,
                    'current' => ($i == $currentPage) ? true : false,
                    'first' => ($i == $firstPage) ? true : false,
                    'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                    'last' => ($i == $totalPages) ? true : false,
                ];
                $numericPage[0] = [
                    'number_page' => $firstPage,
                    'link' => ($link . $firstPage . $conditionId . self::REDIRECT . $getString !== '/main/1/') ? $link . $firstPage . $conditionId . self::REDIRECT . $getString : '/' . $getString,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                    'left_three_dots' => ($totalPages > $countNumericPage+1) ? true : false, //Чтоб не было точек если 2-е стр и между ними точки
                ];
                $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);
            } elseif ($currentPage == $firstPage + 1) { //TODO на 2-ой странице
                if ($i < $countNumericPage) {
                    $numericPage[] = [
                        'number_page' => $i,
                        'link' => ($link . $i . $conditionId . self::REDIRECT . $getString !== '/main/1/') ? $link . $i . $conditionId . self::REDIRECT . $getString : '/' . $getString,
                        'current' => ($i == $currentPage) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false,
                    ];
                } elseif ($i == $countNumericPage) {
                    $numericPage[] = [
                        'number_page' => $totalPages,
                        'link' => ($link . $i . $conditionId . self::REDIRECT . $getString !== '/main/1/') ? $link . $totalPages . $conditionId . self::REDIRECT . $getString : '' . $getString,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                        'right_three_dots' => ($totalPages > $countNumericPage) ? true : false,
                    ];
                }
                $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);
            } elseif ($currentPage == $totalPages - 1 && $i > $totalPages - $countNumericPage) { //TODO на предпоследний странице

                $numericPage[] = [
                    'number_page' => $i,
                    'link' => $link . $i . $conditionId . self::REDIRECT . $getString,
                    'current' => ($i == $currentPage) ? true : false,
                    'first' => ($i == $firstPage) ? true : false,
                    'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                    'last' => ($i == $totalPages) ? true : false,
                ];
                $numericPage[0] = [
                    'number_page' => $firstPage,
                    'link' => ($link . $i . $conditionId . self::REDIRECT . $getString !== '/main/1/') ? '/' . $getString : $link . $i . $conditionId . self::REDIRECT . $getString,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                    'left_three_dots' => ($currentPage != 3 && ($totalPages > $countNumericPage)) ? true : false, //Чтоб не было точек между 1-ой и 2-ой, и если всего 5, а мы на 4, чтоб тоже не было
                ];

                $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);
            } elseif (
                ($currentPage-2 < $i && $currentPage+2 > $i)
                && $currentPage != $firstPage && $currentPage != $firstPage+1
                && $currentPage != $totalPages && $currentPage != $totalPages - 1
            ) { //TODO в середине
                $numericPage[0] = [
                    'number_page' => $firstPage,
                    'link' => ($link . $firstPage . $conditionId . self::REDIRECT . $getString !== '/main/1/') ? $link . $firstPage . $conditionId . self::REDIRECT . $getString : '/' . $getString,
                    'current' => false,
                    'first' => true,
                    'middle' => false,
                    'last' => false,
                    'left_three_dots' => ($currentPage != 3) ? true : false, //Чтоб не было точек между 1-ой и 2-ой
                ];
                if ($currentPage-2 < $i && count($numericPage)){
                    $numericPage[] = [
                        'number_page' => $i,
                        'link' => ($link . $i . $conditionId . self::REDIRECT . $getString !== '/main/1/') ? $link . $i . $conditionId . self::REDIRECT . $getString : '/' . $getString,
                        'current' => ($i == $currentPage) ? true : false,
                        'first' => ($i == $firstPage) ? true : false,
                        'middle' => ($i != $firstPage && $i != $totalPages) ? true : false,
                        'last' => ($i == $totalPages) ? true : false,
                    ];
                }
                if (count($numericPage) == $countNumericPage-1) { //Если массив заполнился до нужного значения
                    $numericPage[] = [
                        'number_page' => $totalPages,
                        'link' => ($link . $totalPages . $conditionId . self::REDIRECT . $getString !== '/main/1/') ? $link . $totalPages . $conditionId . self::REDIRECT . $getString : '/' . $getString,
                        'current' => false,
                        'first' => false,
                        'middle' => false,
                        'last' => true,
                        'right_three_dots' => ($currentPage != $totalPages - 2) ? true : false, //Чтоб не было точек между последний и предпоследний,
                    ];
                }
                $arrow = $this::PaginationGenerateArrowAction($i, $currentPage, $link, $conditionId, $getString);
            }
        }
        /**
         * End numeric_page
         **/

        /**
         * (!$numericPage && $this->get('kernel')->getEnvironment() != 'dev') Перехват ошибки на проде, если вбита огромная пагинация 100500, то он не сможет ее обработать и провалится на следующию строку вернув 500, а нам надо 404
         */
        if(!$numericPage && $this->get('kernel')->getEnvironment() != 'dev') $this->pageNotFound(true);
        if (!$numericPage) throw new Exception("Не определена логика вывода страниц пагинации");


        if ($totalPages > 0) {
            $this->result['pagination'] = [
                'total__pages' => $totalPages,
                'limit__pages' => ($totalPages > self::PAGINATION_FOR_JURISTS) ? true : false, //Для многоточия в мусташе
                'range' => $countRecordsOnPage,
                'numeric_page' => $countNumericPage,
                'total__records' => $countRecords,
                'all__pages' => $numericPage,
                'arrow' => $arrow
            ];

            /**
             * Если больше 5 страниц, то у нас есть точки
             **/
            if ($this->result['pagination']['total__pages'] > 5) {
                $this->result['pagination']['all__pages'][0]['__FIRST__'] = true;
                $this->result['pagination']['all__pages'][count($this->result['pagination']['all__pages'])-1]['__LAST__'] = true;
            }
        }

    }
}
