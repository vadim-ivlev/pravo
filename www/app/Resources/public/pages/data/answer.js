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
                            content: "{{# questions_item }}{{ title_seo }}{{/ questions_item }} — Юридическая консультация"
                        }
                    }
                },
                {
                    name: "crosspagesOgDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:description",
                            content: "{{# questions_item }}{{ description_seo }}{{/ questions_item }}"
                        }
                    }
                },
                {
                    name: "indexTitle",
                    opt: {
                        tag: "title",
                        contents: [
                            {
                                data: "{{# questions_item }}{{ title_seo }}{{/ questions_item }} — Юридическая консультация"
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
                            content: "{{# questions_item }}{{ description_seo }}{{/ questions_item }}"
                        }
                    }
                },
                {
                    name: "indexKeywords",
                    opt: {
                        contents: [
                            { data: "{{# questions_item }}{{# keywords }}<meta name=\"keywords\" content=\"{{ keywords }}\">{{/ keywords }}{{/ questions_item }}" }
                        ]
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
                            { data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/pravo/rubrics/{{ current_rubric.current_rubric_id }}/\">" } // Для подключения рекламы
                        ]
                    }
                },
                {
                    name: "rubricID",
                    opt: {
                        contents: [
                            { data: "<meta name=\"rg-data\" property=\"rubric:id\" content=\"{{# questions_item.rubrics }}{{ rubrics__id }}{{/ questions_item.rubrics }}\">" }
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

                // RGInclude('http://new-www.rg.ru/custom/projects/juristical/global', 'scripts'), // скрипты

                //RGInclude('http://new-www.rg.ru/custom/projects/juristical/answer', 'scripts') // скрипт на странице ответа

                {
                    opt: {
                        contents: [
                            { data: "<script src=\"/bundles/jurist/js/answer.js\"></script>" },
                            { data: "<script src=\"/bundles/jurist/js/rubric_questions.js\"></script>" }
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

                RGB('main:answer') // основной контент

            ]

        },

        /*
         * Левый сайдбар
         *
         */

        sidebarLeft: {

            blocks: [

                RGB('sidebar-left:answer', '#sidebar')

            ]
        },

        /*
         * Правый сайдбар
         *
         */

        sidebarRight: {

            blocks: [

                RGB('sidebar-right:answer', '#sidebar')

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