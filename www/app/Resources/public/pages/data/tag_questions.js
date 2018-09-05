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
                                data: "{{#seo.seo__length}}{{ seo.seo__title }}{{/seo.seo__length}}{{^seo.seo__length}}{{ current_tag }} &mdash; Юридическая консультация{{/seo.seo__length}}"
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
                            { data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/pravo/rubrics/\">" }, // Для подключения рекламы
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
                    name: "infiniteLoadingScript",
                    opt: {
                        contents: [
                            { data: "<script src=\"/bundles/jurist/js/list.js\"></script>" }
                        ]
                    }
                },

                {
                    opt: {
                        contents: [
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

                RGB('main:tag_questions') // основной контент

            ]

        },

        /*
         * Левый сайдбар
         *
         */

        sidebarLeft: {

            blocks: [

                RGB('sidebar-left:tag_questions', '#sidebar')

            ]
        },

        /*
         * Правый сайдбар
         *
         */

        sidebarRight: {

            blocks: [

                RGB('sidebar-right:tag_questions', '#sidebar')

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