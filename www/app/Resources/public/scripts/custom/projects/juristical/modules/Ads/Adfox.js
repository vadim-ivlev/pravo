/*
 * Загрузчик баннеров AdFox
 * Основан на документации http://specs.adfox.ru/page/99/
 *
 * @Adfox.run - по событию загружаем и вставляем баннеры
 * 
 */

var

    // Префикс модуля
    _modulePrefix = 'Adfox',

    /*
     * Инициализация баннера
     *
     * @bannerPlaceId - id-аттрибут элемента, куда вставлять баннер
     * @requestSrc - ссылка запроса AdFox (можно получить из кода вставки)
     *
     */

    initAdFoxBanner = ($ads, banners) => {

        var tgNS = window.ADFOX.RELOAD_CODE,
            initData = null;

        $ads.html('');

        let iteratorGlobal = 0;

        _.each(banners, banner => {

            if(!_.isEmpty(banner['uri'])) {

                var adsId = 'adfox_' + Math.random().toString(36).substring(7),
                    $adsWrapper = null,
                    uri = banner['uri'],
                    scroll = banner['scroll'];

                $adsWrapper = $('<div />', {
                    'id': adsId,
                    'class': 'adfox_item'
                });

                // Получаем баннер
                // через метод AdFox - tgNS
                initData = tgNS.initBanner(adsId, uri);

                // Вставляем в элемент
                // контент баннера
                $ads.append($adsWrapper.append(initData.html));

                //tgNS.loadBanner(initData.pr1, banner['uri'], initData.sessionId);

                // Проверка на доскролл
                if (!!scroll) {

                    // Если это не фулскрин (костыль, потом убрать),
                    if ($ads.closest('.b-ads').hasClass('b-ads_fullscreen')) {

                        tgNS.loadBanner(initData.pr1, banner['uri'], initData.sessionId);

                    } else {

                        RG.logger.log('loadBanner with appear ' + adsId);

                        setAppear(adsId, {
                            tgNS,
                            initData,
                            uri
                        },
                        function(){
                            //checkBanner($adsWrapper);
                        });

                    }

                } else {

                    // Просто грузим баннер
                    tgNS.loadBanner(initData.pr1, banner['uri'], initData.sessionId);

                    // Проверяем, если баннер не пустой - показываем
                    //checkBanner($adsWrapper);
                }

                // МЕтод проверки
                function checkBanner($adsWrapper) {

                    var $adfoxSrcEl = null,
                        iterator = 0,
                        intervalId = null;

                    if (!!$adsWrapper.find('[id^="AdFox_banner"]').length) {

                        $adsWrapper.hide();
                        $adsWrapper.css('visibility', 'hidden');
                        $adsWrapper.addClass('animated');

                        intervalId = setInterval(function() {

                            if (!$adsWrapper.find('[id^="AdFox_banner"]').is(':empty') || iterator > 15) {
                                clearInterval(intervalId);

                                $adfoxSrcEl = $adsWrapper.find('[id^="AdFox_banner"]');

                                if (!$adfoxSrcEl.is(':empty')) {

                                    $adsWrapper.show(function(){

                                        $adsWrapper.addClass('fadeIn');
                                        $adsWrapper.css('visibility', 'visible');

                                        // Укастыливание из-за canary
                                        $adfoxSrcEl.css('height', $adfoxSrcEl.height() + '.001');
                                    });
                                }
                            }

                            iterator++;

                        }, 1000);

                    } else {

                        $adsWrapper.show(function() {
                            $adsWrapper.addClass('fadeIn');
                            $adsWrapper.css('visibility', 'visible');
                        });

                    }
                    
                }                

                // Мы сделали тут https://yadi.sk/i/plLlmaMoqGcHW
                // Как удалялку пустого баннера
                /*setTimeout(function(){

                    checkBannerFail($adsWrapper.find('iframe'), $adsWrapper.find('iframe')[0]);

                }, 5000);*/

                /*function checkBannerFail($iframe, iframe) {

                    RG.logger.log($iframe.attr('id'));
                    RG.logger.log(iframe.contentWindow);
                    RG.logger.log(iframe.contentWindow.adfoxBannerFail);
                    RG.logger.log('iframe.contentWindow.adfoxBannerFail ' + iframe.contentWindow.adfoxBannerFail);

                    //return iframe.contentDocument.adfoxBannerFail;
                }*/

            } else if (!_.isEmpty(banner['code'])) {

                $ads.append(banner['code']);
            }
        });

    },

    // Устанавливаем поведение по показу
    setAppear = (id, adfox, callb) => {

        // Вешаем плагин на элемент
        $(`#${id}`).appear();

        // Подписываем событие
        $(`#${id}`).one('appear', function(e, $all_appeared_elements) {

            // Загружаем баннер
            adfox.tgNS.loadBanner(adfox.initData.pr1, adfox.uri, adfox.initData.sessionId);

            callb();
        });

        // Принудительно загружаем, если в пределах экрана
        $.force_appear();

    },

    setPlaces = (topic, places) => {

        RG.logger.info(topic);

        for(let place in places) {

            let id = `#ads${place}`,
                $place = $(id);
            
            if($place.length) {

                initAdFoxBanner($place, places[place]);
            }
        };
    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {
        //RG.events.subscribe(`${_modulePrefix}.run`, initAdFox);
        RG.events.subscribe(`${_modulePrefix}.places.set`, setPlaces);
    };

// Add to global scope
module.exports = {
    _modulePrefix,
    init
};