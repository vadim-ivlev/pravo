/**
 * Created by esolovyev on 06.10.2015.
 */

/**
 * Осноыной JSON конфигурации
 * @type {{paths: {root: string}, env: string, formats: {email: RegExp, conformAtionCode: RegExp}}}
 */
var root = '//front.rg.ru/',
    outer = '//outer.rg.ru/',

    config = {
        // основные пути
        paths: {

            // путь до Api
            //root: 'https://front.rg.ru/app_dev.php/',
            root: root,

            // путь до свежего выпуска,
            // после, параметры и оканчивается на gazeta.json
            fresh: '/json/gazeta',

            // путь до последних материалов
            // после, параметры common, region-ID, common+region-ID

            accountInclude: '/include/tmpl-b-feed/is-announce/num-3/index.json',

            popularMaterials: `${outer}plain/popular/`,
            popularCommentMaterials: `${root}comments/top_list`,
            // путь до списка спецвыпусков
            // используется в шаблоне fascicles-index
            // после, параметры
            //    {path}/
            //      year-{YYYY} - фильтр по году
            //      after-fascicle-{ID} - если догружаем выпуски
            //      {type} || common - либо по типу, либо все сразу
            fascicles: '/json/fascicles',

            // путь до супершпигелей
            // после, параметры региона (если есть) region-ID и даты yyyy-mm-dd
            supersp: '/json/supersp',

            lastNews: '/json/last_news/',

            broadcastSport: `${outer}plain/sport_translations/api/sport.php?id=`,
            broadcastOnline: `${outer}plain/online_translations/api/online.php?id=`,

            // Путь до партнерок
            // название файла от 1 до 10, генерим рандомом
            partners: 'api/partners/',

            // Пути до шаблонов в public
            tmpl: {

                // Блок b-news
                bFeed: '/res/templates/b-feed.html',
                bNewsInner: '/res/templates/b-news-inner.html',
                bNewsInner_doc: '/res/templates/b-news-inner_doc.html',
                bNews: '/res/templates/b-news.html',
                bNews_broadsides: '/res/templates/b-news_broadsides.html',
                broadcastOnline: '/res/templates/b-broadcast-online.html',
                broadcastSport: '/res/templates/b-broadcast-sport.html',
                bPartners: '/res/templates/b-partners.html'
            },
        },

        regions: null,

        env: 'dev', // установка окружения
        formats: {
            email: /\S+@\S+\.\S+/, // паттерн email
            conformAtionCode: /\b\d{6}\b/g, // паттерн кода подтверждения
            name: /^[а-яА-ЯёЁa-zA-Z ,.'-]+$/ // паттерн кода подтверждения
        },

        messages: {

            inputNotValid: 'Не верный формат',
            emailNotValid: 'Неверный формат адреса электронной почты',
            nameNotValid: 'Неверный формат имени',
            codeIsSent: 'Код уже отправлен, попробуйте позднее',
            codeNotValid: 'Неверный код',

    }
};

module.exports = config;