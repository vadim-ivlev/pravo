module.exports = {

    toMerge: {

        meta: {

            blocks: [

                RGT('meta'), // метаинформация

                /*
                 * Кастомная метаинформация
                 *
                 */
                /*{
                    name: "crosspageOgTitle",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:title",
                            content: "Бесплатная юридическая консультация. Российская газета"
                        }
                    }
                },
                {
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
                    name: "canonicalLink",
                    opt: {
                        tag: "link",
                        attrs: {
                            rel: "canonical",
                            href: "{{ canonical }}"
                        }
                    }
                },
                /*{
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

                //RGInclude('/custom/projects/juristical/global', 'styles'), // стили

                //RGInclude('/custom/projects/juristical/global', 'scripts') // скрипты

            ]
        },


        /*
         * Основной блок контента
         *
         */

        main: {

            blocks: [

                RGB('header:rubric_tags'), // шапка сайта

                RGB('main:rubric_tags') // основной контент

            ]

        },

        /*
         * Левый сайдбар
         *
         */

        sidebarLeft: {

            blocks: [

                RGB('sidebar-left:rubric_tags', '#sidebar')

            ]
        },

        /*
         * Правый сайдбар
         *
         */

        sidebarRight: {

            blocks: [

                RGB('sidebar-right:rubric_tags', '#sidebar')

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