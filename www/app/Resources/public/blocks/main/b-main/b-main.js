/*
 * Основной контент
 *
 */

module.exports = function(data){

    return {

        name: "bMain",
        opt: {
            contents: [
                {
                    param: {

                        blocks: {

                            breadcrumbsMain: RGB('breadcrumbs:main'), // хлебные крошки на главной

                            breadcrumbsRubric: RGB('breadcrumbs:rubric'), // хлебные крошки в выборке по рубрике

                            breadcrumbsTag: RGB('breadcrumbs:tag'), // хлебные крошки в выборке по тегу

                            breadcrumbsAnswer: RGB('breadcrumbs:answer'), // хлебные крошки на странице ответа

                            questionsList: RGB('questions:list'), // вопросы на главной

                            pagination: RGB('pagination'), // пагинация

                            adsSidebarRight: RGB('ads:sidebar-right, mobile'), // рекламный баннер

                            questionsItem: RGB('questions:item'), // блок с текстом вопроса

                            questionsLatest: RGB('questions:latest, mobile', '#questions_latest__length'), // Последние вопросы

                            similarQuestions: RGB('questions:similar, mobile', '#similar_questions__length'), // Похожие вопросы

                            answerBlock: RGB('answer', '#answer'), // блок с ответом

                            // bibliotechkaAdvert: RGB('bibliotechka-advert, mobile tablet tabletLandscape'), // блок библиотечки обычный

                            bibliotechkaAdvert: RGB('bibliotechka-advert, mobile tablet tabletLandscape'), // блок библиотечки на мобильных устройствах

                            bibliotechkaAdvertAnswer: RGB('bibliotechka-advert:answer'), // блок библиотечки на странице ответа

                            formAsk: RGB('form:ask'), // форма отправки вопроса

                            articleRules: RGB('article:rules'), // текстовый блок с правилами

                            articlePartners: RGB('article:partners'), // текстовый блок с информацией о партнёрах

                            articleError404: RGB('article:error404'), // текст 404-й ошибки

                            usersSelection: RGB('users-selection'), // выборка юристов по специализации

                            juristsList: RGB('jurists:list'), // список юристов

                            juristsProfile: RGB('jurists:profile'), // профиль юриста

                            materialHead: RGB('material-head'), // заголовок материала

                            categoriesMain: RGB('categories:main'), // меню рубрик в основном контенте

                            categoriesSidebar: RGB('categories:sidebar, mobile'), // меню рубрик в сайдбаре

                            tags: RGB('tags'), // список актуальных тегов

                            juristsFeed: RGB('jurists:feed, mobile:active', '#jurists_feed'), // лента юристов, предлагающих услуги (в сайдбаре)

                            juristsTop: RGB('jurists:top, mobile'), // список лучших юристов (в сайдбаре)

                            adsSidebarRight: RGB('ads:sidebar-right, mobile'), // рекламный баннер из правого сайдбара

                            adfox: RGB('adfox:media-3, desktop desktopFull:active'), // баннер - правый сайдбар

                            // newsRubric: RGB('news-rubric:pravo') // блок на главной РГ (убрать после вывода на РГ)

                            searchResults: RGB('search-results'), // блок результатов поиска

                            adfoxMainTop: RGB('adfox:media-4, desktop desktopFull:active'), // баннер в правом вернхем углу основного контента

                            loadChain: RGB('load-chain'), // блок бесконечной подгрузки

                            itemsListQuestions: RGB('items-list:questions'), // список вопросов

                            seoInfo: RGB('seo-info'), // блок с SEO-текстом под вопросами

                            yandexDirect: RGB('yadirect:main-mobile'), // Яндекс-директ

                            yandexDirectMain: RGB('yadirect:main'), // Яндекс-директ под основным контентом

                            pageTitle: RGB('page-title') // Заголовок страницы рубрики

                        },

                        sortBlocks: {

                            // 'default': "breadcrumbs questionsList pagination",

                            index: "breadcrumbsMain categoriesSidebar bibliotechkaAdvert itemsListQuestions loadChain seoInfo juristsFeed juristsTop",

                            rubric_questions: "breadcrumbsRubric categoriesSidebar pageTitle itemsListQuestions loadChain seoInfo",

                            tag_questions: "breadcrumbsTag itemsListQuestions loadChain seoInfo",

                            answer: "breadcrumbsAnswer categoriesSidebar questionsItem answerBlock bibliotechkaAdvertAnswer yandexDirect adfox questionsLatest similarQuestions yandexDirectMain",

                            ask: "formAsk questionsLatest similarQuestions",

                            rules: "articleRules juristsFeed",

                            users: "usersSelection juristsList pagination juristsFeed juristsTop",

                            tags: "materialHead tags juristsFeed",

                            rubric_tags: "materialHead categoriesMain tags juristsFeed",

                            lawer: "juristsProfile itemsListQuestions loadChain juristsFeed questionsLatest similarQuestions",

                            partners: "articlePartners",

                            search: "categoriesSidebar searchResults juristsFeed juristsTop",

                            error404: "articleError404"

                        }

                    }
                }
            ]
        }

    }

};