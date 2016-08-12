/*
 * Компонент
 *
 */

var

    // Шаблон
    template = require('../b-video-inner.ihtml'),

    Video = require('../../../main/b-video/scripts/Video'),

    // Компонент
    VideoInner = Ractive.extend({

        template,

        components: {
            'rg-video' : Video
        },

        data() {
            return {
                // Данные для модуля
                name: null,
                url: null,
                urlallfeed: null,
                titleallfeed: null,
                datauriparam: null,

                // Данные для видео
                video: null
            }
        },

        oninit() {
            RG.logger.debug('Video Inner from component init');
        },

        onrender() {

            // Получаем данные для видео
            this.getData();

        },

        /*
         * Методы
         *
         */
        getData() {

            $.get(`/include/obj-article/${this.get('datauriparam')}/show-videos/has-video/num-1/index.json`)
                .done(data => {

                    try {

                        var material = data[0],
                            video = data[0].videos[0];

                        // Устанавливаем данные для видео
                        this.set('video', {
                            file: video.video_file,
                            image: video.image_file,
                            title: video.title,
                            uannounce: video.text,
                            url: video.url,
                            ratio: video.aspect_ratio
                        });

                        // Устанавливаем ссылку на материал с видео
                        this.set('urlMaterial', material.uri);

                    } catch(error) {
                        throw new Error(error);
                    }

                })
                .fail(data => {
                    RG.logger.error(data);
                });

        }


    });

// Экспортируем
module.exports = VideoInner;