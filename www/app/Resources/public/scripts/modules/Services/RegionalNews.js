/**
 * Created by esolovyev on 11.02.2016.
 */

var currentRegion = null,
    news = [],
    template = null,
    components = [],

    init = () => {

        /**
         * TODO Все колбэки в одно место
         **/
        RG.BlocksShifter.setCallback([
            {
                blockId: 'rgb_feed_last-news',
                screenType: 'mobile',
                callback: ($target, $active) => {

                    RG.events.publish('regional.render');
                    RG.events.publish('scroll.init', $('.b-feed__list_scrolled'));
                }
            },
            {
                blockId: 'rgb_feed_last-news',
                screenType: 'tablet tabletLandscape desktop desktopFull',
                callback: ($target, $active) => {

                    RG.events.publish('regional.render');
                    RG.events.publish('scroll.init', $('.b-feed__list_scrolled'));
                }
            }
        ]);

        RG.events.registerList({

            'regional.run': run,
            'regional.template.get': getTemplate,
            'regional.news.get': getNews,
            'regional.render': renderComponent,
            'geolocation.region.changed': (topic, region) => {

                RG.logger.info(topic);

                if(region) {

                    currentRegion = region;

                    RG.events.publish('regional.news.get');
                }
            },
            'geolocation.list': (topic) => {

                RG.events.publish('regional.run');
            },
        });

        RG.events.publish('regional.run');
    },

    run = (topic) => {

        RG.logger.info(topic);

        currentRegion = RG.session.getUserRegion();

        $('.b-feed__list_reg').hide();
    },


    getTemplate = (topic) => {

        RG.logger.info(topic);

        $.get(RG.config.paths.tmpl.bFeed).then(html => {

            template = html;
            RG.events.publish('regional.news.get');
        });
    },

    getNews = (topic) => {

        RG.logger.info(topic);

        if(currentRegion.rgId) {

            $.get(`${RG.config.paths.lastNews}region-${currentRegion.rgId}.json`).then(response => {

                news = response.result;
                RG.events.publish('regional.render');
            });
        }
    },

    initEvents = () => {

        if(!_.isEmpty(currentRegion) && _.isString(currentRegion.rubricPrepositionalName)) {

            $('.b-feed__name_reg-link, .b-feed__name_com').off('click');

            $('.b-feed__name_reg-link').attr('href', currentRegion.link).text(`в ${currentRegion.rubricPrepositionalName}`).on('click', function(event) {

                if($(this).parent().hasClass('is-active')) {

                    window.location = currentRegion.link;
                }

                $('.b-feed__list_com').hide();
                $('.b-feed__list_reg').show();

                $(this).parent().addClass('is-active');
                $('.b-feed__name_com-link').parent().removeClass('is-active');

                event.preventDefault();
            });

            $('.b-feed__name_com-link').on('click', event => {

                $('.b-feed__list_com').show();
                $('.b-feed__list_reg').hide();

                $('.b-feed__name_reg-link').parent().removeClass('is-active');
                $('.b-feed__name_com-link').parent().addClass('is-active');

                event.preventDefault();
            });
        }
    },

    renderComponent = () => {

        if(template) {

            initEvents();

            $('.b-feed__list_reg').each(function(i, element) {

                var id = $(this).attr('data-id');

                if(id) {

                    components[id].set('items', news);
                } else {

                    id = Math.random().toString(36).substring(6);

                    components[id] = new Ractive({

                        el: element,
                        template: `{{#items}}${template}{{/items}}`,
                        data() {
                            return {
                                items: news,
                                dateFormat: RG.datetime.parseVmDate
                            }
                        }
                    });

                    $(this).attr('data-id', id);
                }
            });
        } else {

            RG.events.publish('regional.template.get');
        }
    };


module.exports = {

    init // 13.02.16 Max: до разбирательства, отправляет кучу запросов
};