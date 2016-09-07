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

                            answerBlock: RGB('answer', '#answer'), // блок с ответом

                            bibliotechkaAdvert: RGB('bibliotechka-advert, mobile tablet tabletLandscape'), // блок библиотечки обычный

                            bibliotechkaAdvertAnswer: RGB('bibliotechka-advert:answer'), // блок библиотечки на странице ответа

                            form: RGB('form'), // форма отправки вопроса

                            articleRules: RGB('article:rules'), // текстовый блок с правилами

                            articlePartners: RGB('article:partners'), // текстовый блок с информацией о партнёрах

                            usersSelection: RGB('users-selection'), // выборка юристов по специализации

                            juristsList: RGB('jurists:list'), // список юристов

                            juristsProfile: RGB('jurists:profile'), // профиль юриста

                            materialHead: RGB('material-head'), // заголовок материала

                            categoriesMain: RGB('categories:main'), // меню рубрик в основном контенте

                            categoriesSidebar: RGB('categories:sidebar, mobile'), // меню рубрик в сайдбаре

                            tags: RGB('tags'), // список актуальных тегов

                            juristsFeed: RGB('jurists:feed, mobile:active'), // лента юристов, предлагающих услуги (в сайдбаре)

                            juristsTop: RGB('jurists:top, mobile'), // список лучших юристов (в сайдбаре)

                            adsSidebarRight: RGB('ads:sidebar-right, mobile'), // рекламный баннер из правого сайдбара

                            // newsRubric: RGB('news-rubric:pravo') // блок на главной РГ (убрать после вывода на РГ)

                        },

                        sortBlocks: {

                            // 'default': "breadcrumbs questionsList pagination adsSidebarRight",

                            index: "breadcrumbsMain categoriesSidebar questionsList pagination bibliotechkaAdvert adsSidebarRight juristsFeed juristsTop",

                            rubric_questions: "breadcrumbsRubric categoriesSidebar questionsList pagination",

                            tag_questions: "breadcrumbsTag questionsList pagination",

                            answer: "breadcrumbsAnswer categoriesSidebar questionsItem answerBlock questionsLatest bibliotechkaAdvertAnswer adsSidebarRight",

                            ask: "form questionsLatest",

                            rules: "articleRules juristsFeed adsSidebarRight",

                            users: "usersSelection juristsList pagination adsSidebarRight juristsFeed juristsTop",

                            rubrics: "materialHead categoriesMain tags juristsFeed adsSidebarRight",

                            rubric_tags: "materialHead categoriesMain tags juristsFeed adsSidebarRight",

                            lawer: "juristsProfile questionsList pagination juristsFeed adsSidebarRight questionsLatest",

                            partners: "articlePartners"
                        }

                    }
                }
            ]
        }

    }

};