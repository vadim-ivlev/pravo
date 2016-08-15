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

                            tags: RGB('tags'), // список актуальных тегов

                            juristsFeed: RGB('jurists:feed, mobile:active'), // лента юристов, предлагающих услуги (в сайдбаре)

                            juristsTop: RGB('jurists:top, mobile:active') // список лучших юристов (в сайдбаре)

                        },

                        sortBlocks: {

                            // 'default': "breadcrumbs questionsList pagination adsSidebarRight",

                            index: "breadcrumbsMain questionsList pagination bibliotechkaAdvert",

                            rubric_questions: "breadcrumbsRubric questionsList pagination",

                            tag_questions: "breadcrumbsTag questionsList pagination",

                            answer: "breadcrumbsAnswer questionsItem answerBlock bibliotechkaAdvertAnswer",

                            ask: "form",

                            rules: "articleRules",

                            users: "usersSelection juristsList pagination",

                            rubrics: "materialHead categoriesMain tags",

                            rubric_tags: "materialHead categoriesMain tags",

                            lawer: "juristsProfile questionsList pagination",

                            partners: "articlePartners"
                        }

                    }
                }
            ]
        }

    }

};