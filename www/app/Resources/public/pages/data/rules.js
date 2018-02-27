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
                            content: "Правила оказания бесплатных юридических консультаций"
                        }
                    }
                },
                {
                    name: "crosspagesOgDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:description",
                            content: "Вы можете бесплатно задать вопрос юристам по любым правовым вопросам, заполнив форму на сайте. Обязательно ознакомьтесь с правилами оказания консультаций специалистами"
                        }
                    }
                },
                {
                    name: "indexTitle",
                    opt: {
                        tag: "title",
                        contents: [
                            {
                                data: "Правила оказания бесплатных юридических консультаций"
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
                            content: "Вы можете бесплатно задать вопрос юристам по любым правовым вопросам, заполнив форму на сайте. Обязательно ознакомьтесь с правилами оказания консультаций специалистами"
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

                // RGInclude('global', 'styles'), // стили

                // RGInclude('global', 'scripts') // скрипты

            ]
        },


        main: {

            blocks: [

                RGB('header'), // шапка сайта

                RGB('main:rules') // основной контент

            ]

        },

        /*
         * Левый сайдбар
         *
         */

        sidebarLeft: {

            blocks: [

                RGB('sidebar-left:rules', '#sidebar')

            ]
        },

        /*
         * Правый сайдбар
         *
         */

        sidebarRight: {

            blocks: [

                RGB('sidebar-right:rules', '#sidebar')

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