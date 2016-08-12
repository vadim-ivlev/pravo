/**
 * Created by esolovyev on 26.10.2015.
 */

/**
 * Конфигурационный
 * @type {string}
 */
var rootPath = RG.config.paths.root,
    comment = `${rootPath}comments`,
    Config = {

        /**
         * Пути запроса к api
         */
        paths: {
            sendComment: `${comment}/add`, // отправка кода подтверджения
            likeComment: `${comment}/like/`, // отправка кода подтверджения
            getComments: `${comment}/list/`, // отправка кода подтверджения
        },

        materialId: RG.meta.getMaterial(),

        /**
         * Сообщения и оповещения
         */
        messages: {
        }
    };

module.exports = Config;