/**
 * Created by esolovyev on 28.11.2015.
 */

var SujetMaterials = require('../../b-sujet-materials/scripts/SujetMaterials'),
    template = require('../b-followed.ihtml'),

    Followed = Ractive.extend({

        el: 'followed',

        components: {
            'sujet-materials':  SujetMaterials
        },

        data() {

            return {
                materials: null,
                activeItemId: null // Для добавления класса active
            }
        },

        template,

        oninit() {
            
            RG.logger.debug('Followed');

            this.on({

                // Клик по ссылке из отслеживаемых материалов
                'materials': (event, sujet) => {

                    // Заголовок для левой колонки
                    this.set('sujetTitle', sujet.title);

                    // Отправляем событие получения материалов сюжета
                    RG.events.publish('subscribe.sujet.get', sujet.id);

                    // Добавляем в activeItemId выбранный сюжет
                    this.set('activeItemId', sujet.id);

                    // удаляем дефолтное событие ссылки
                    event.original.preventDefault();
                },

                // Переход на все отслеживаемые сюжеты (на мобиле)
                'sujets': (event, id) => {

                    // Очищаем все материалы
                    this.set('materials', null);

                    // Скрываем блок с материалами
                    this.set('showMaterials', false);

                    // удаляем дефолтное событие ссылки
                    event.original.preventDefault();
                }
            });
            
            // Подписка на события
            RG.events.registerList({
                'subscribe.sujet.set': (topic, materials) => {

                    RG.logger.info(topic);

                    // Вставляем материалы в колонку для материалов
                    this.set('materials', materials);

                    // Показываем колонку для материалов
                    this.set('showMaterials', true);                    

                    RG.events.publish('overlay.resize');
                    RG.events.publish('scroll.init', $('#sujetList'));
                },

                // Неведомый функционал
                'subscribe.sujet.get': (topic, id) => {

                    // Считываем индекс сюжета по id
                    var index = _.findIndex(this.get('sujets'), {id});

                    // Очищаем сюжет от материалов по индексу
                    this.set(`sujets.${index}.materials`, null);
                }
            });
        },

        onrender() {

            RG.events.publish('overlay.resize');
        }
});

module.exports = Followed;