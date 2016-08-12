/**
 * Created by esolovyev on 06.10.2015.
 */

/*if(RG.config.env === 'dev') {

    require('../test/Ajax-mock');
}*/

// Выключили из-за настроек сервера
/*$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});*/

var paths = require('../config').paths,

    /**
     * Отправка email на сервер
     * @param email
     * @returns {*}
     */
    sendEmail = email => {
        return $.post(paths.email, {email});
    },

    /**
     * Отправка кода подтверждения на сервер
     * @param code
     * @returns {*|V}
     */
    sendConfirmCode = (code) => {
        return $.get(`${paths.code}${code}`);
    },

    /**
     * Получение данных на подтверждение
     * @param user
     * @returns {*|V}
     */
    getAuthData = () => {
        return $.get(`${paths.getAuthData}`);
    },

    /**
     * Отправка данных на подтверждение
     * @param user
     * @returns {*|V}
     */
    saveUser = user => {
        return $.post(`${paths.saveUser}`, user);
    },

    /**
     * Получение данных существующего пользователя
     * @param id
     * @returns {*|V}
     */
    getUserData = id => {
        return $.post(`${paths.getUserData}${id}`);
    },

    /**
     * Подвердить объеденение
     * @param id
     * @returns {*}
     */
    mergeUser = id => {
        return $.get(`${paths.mergeUser}${id}`);
    },

    /**
     * Объеденение профайлов
     * @param userId
     * @returns {*|V}
     */
    sendMergeCode = (id) => {
        return $.get(`${paths.mergeCode}${id}`);
    },

    /**
     * Выход
     * @returns {*|V}
     */
    logOut = () => {
        return $.get(`${paths.logout}`);
    },

    /**
     * Отвязать соц сеть
     */
    socialDisconnect = (name) => {
        return $.get(`${paths.disconnect}${name}`)
    };

module.exports = {
    sendEmail,
    sendConfirmCode,
    getAuthData,
    saveUser,
    getUserData,
    sendMergeCode,
    mergeUser,
    logOut,
    socialDisconnect
};