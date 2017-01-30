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
                            content: "Список юристов, которым вы можете задать вопрос бесплатно"
                        }
                    }
                },
                {
                    name: "crosspagesOgDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:description",
                            content: "Перечень всех юристов, оказывающих бесплатные юридические консультации. Среди них специалисты по наследственным, семейным, жилищным, налоговым, судебным и другим вопросам"
                        }
                    }
                },
                {
                    name: "canonicalLink",
                    opt: {
                        tag: "link",
                        attrs: {
                            rel: "canonical",
                            href: "{{ canonical }}"
                        }
                    }
                },
                {
                    name: "indexTitle",
                    opt: {
                        tag: "title",
                        contents: [
                            {
                                data: "Список юристов, которым вы можете задать вопрос бесплатно"
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
                            content: "Перечень всех юристов, оказывающих бесплатные юридические консультации. Среди них специалисты по наследственным, семейным, жилищным, налоговым, судебным и другим вопросам"
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

                //RGInclude('/custom/projects/juristical/global', 'styles'), // стили

                //RGInclude('/custom/projects/juristical/global', 'scripts') // скрипты

                {
                    opt: {
                        contents: [
                            { data: "<script src=\"/bundles/jurist/js/pagination.js\"></script>" },
                            { data: "<script src=\"/bundles/jurist/js/users.js\"></script>" }
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

                RGB('main:users') // основной контент

            ]

        },

        /*
         * Левый сайдбар
         *
         */

        sidebarLeft: {

            blocks: [

                RGB('sidebar-left:users', '#sidebar')

            ]
        },

        /*
         * Правый сайдбар
         *
         */

        sidebarRight: {

            blocks: [

                RGB('sidebar-right:users', '#sidebar')

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