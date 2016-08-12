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

                            breadcrumbsMain: RGB('projects.juristical.breadcrumbs:main'), // хлебные крошки на главной

                            breadcrumbsRubric: RGB('projects.juristical.breadcrumbs:rubric'), // хлебные крошки в выборке по рубрике

                            breadcrumbsTag: RGB('projects.juristical.breadcrumbs:tag'), // хлебные крошки в выборке по тегу

                            breadcrumbsAnswer: RGB('projects.juristical.breadcrumbs:answer'), // хлебные крошки на странице ответа

                            questionsList: RGB('projects.juristical.questions:list'), // вопросы на главной

                            pagination: RGB('projects.juristical.pagination'), // пагинация

                            adsSidebarRight: RGB('projects.juristical.ads:sidebar-right, mobile'), // рекламный баннер

                            questionsItem: RGB('projects.juristical.questions:item'), // блок с текстом вопроса

                            answerBlock: RGB('projects.juristical.answer', '#answer'), // блок с ответом

                            bibliotechkaAdvert: RGB('projects.juristical.bibliotechka-advert, mobile tablet tabletLandscape'), // блок библиотечки обычный

                            bibliotechkaAdvertAnswer: RGB('projects.juristical.bibliotechka-advert:answer'), // блок библиотечки на странице ответа

                            form: RGB('projects.juristical.form'), // форма отправки вопроса

                            articleRules: RGB('projects.juristical.article:rules'), // текстовый блок с правилами

                            articlePartners: RGB('projects.juristical.article:partners'), // текстовый блок с информацией о партнёрах

                            usersSelection: RGB('projects.juristical.users-selection'), // выборка юристов по специализации

                            juristsList: RGB('projects.juristical.jurists:list'), // список юристов

                            juristsProfile: RGB('projects.juristical.jurists:profile'), // профиль юриста

                            materialHead: RGB('projects.juristical.material-head'), // заголовок материала

                            categoriesMain: RGB('projects.juristical.categories:main'), // меню рубрик в основном контенте

                            tags: RGB('projects.juristical.tags'), // список актуальных тегов

                            juristsFeed: RGB('projects.juristical.jurists:feed, mobile:active'), // лента юристов, предлагающих услуги (в сайдбаре)

                            juristsTop: RGB('projects.juristical.jurists:top, mobile:active') // список лучших юристов (в сайдбаре)

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