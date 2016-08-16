module.exports = {

    toMerge: {

        meta: {

            blocks: [

                RGT('meta'), // метаинформация

                /*
                 * Кастомная метаинформация
                 *
                 */
                {
                    name: "indexTitle",
                    opt: {
                        tag: "title",
                        contents: [
                            {
                                data: "Российская газета"
                            }
                        ]
                    }
                },
                {
                    name: "indexDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            name: "description",
                            content: "Российская газета - издание Правительства Российской Федерации, официальный публикатор документов"
                        }
                    }
                },
                {
                    name: "indexYandexVerification",
                    opt: {
                        tag: "meta",
                        attrs: {
                            name: "yandex-verification",
                            content: "68d57ae756ac44ad"
                        }
                    }
                },
                {
                    name: "rgAds",
                    opt: {
                        contents: [
                            { data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/static/juristical/ind\">" } // Для подключения рекламы
                        ]
                    }
                }

            ]

        },

        /*
         * Шапка
         *
         */

        head: {

            blocks: [

                //RGInclude('/custom/projects/juristical/global', 'styles'), // стили

                //RGInclude('/custom/projects/juristical/global', 'scripts') // скрипты

                {
                    opt: {
                        contents: [
                            { data: "<script src=\"/bundles/jurist/js/rubric_questions.js\"></script>" },
                            { data: "<script src=\"/bundles/jurist/js/pagination.js\"></script>" }
                        ]
                    }
                }

            ]
        },


        /*
         * Основной блок контента
         *
         */

        main: {

            blocks: [

                RGB('header'), // шапка сайта

                RGB('main:rubric_questions') // основной контент

            ]

        },

        /*
         * Левый сайдбар
         *
         */

        sidebarLeft: {

            blocks: [

                RGB('sidebar-left:rubric_questions', '#sidebar')

            ]
        },

        /*
         * Правый сайдбар
         *
         */

        sidebarRight: {

            blocks: [

                RGB('sidebar-right:rubric_questions', '#sidebar')

            ]
        },


        /*
         * Метаинформация
         *
         */

        _meta: {
            uri: "juristical"
        }
    }

};