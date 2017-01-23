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
                    name: "crosspageOgTitle",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:title",
                            content: "Наши партнеры — Юридическая консультация"
                        }
                    }
                },
                /*{
                    name: "crosspagesOgDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:description",
                            content: "Правовая поддержка граждан: вы можете получить юридическую помощь бесплатно. Задайте вопрос опытному юристу"
                        }
                    }
                },*/
                {
                    name: "indexTitle",
                    opt: {
                        tag: "title",
                        contents: [
                            {
                                data: "Наши партнеры — Юридическая консультация"
                            }
                        ]
                    }
                },
                /*{
                    name: "indexDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            name: "description",
                            content: "Российская газета - издание Правительства Российской Федерации, официальный публикатор документов"
                        }
                    }
                },*/
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
                            { data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/pravo/rubrics/\">" } // Для подключения рекламы
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

                // RGInclude('global', 'styles'), // стили

                // RGInclude('global', 'scripts') // скрипты

            ]
        },


        main: {

            blocks: [

                RGB('header:partners'), // шапка сайта

                RGB('main:partners') // основной контент

            ]

        },

        /*
         * Левый сайдбар
         *
         */

        sidebarLeft: {

            blocks: [

                RGB('sidebar-left:partners', '#sidebar')

            ]
        },

        /*
         * Правый сайдбар
         *
         */

        sidebarRight: {

            blocks: [

                RGB('sidebar-right:partners', '#sidebar')

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