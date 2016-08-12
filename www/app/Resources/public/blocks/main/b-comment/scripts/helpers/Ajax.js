/**
 * Created by esolovyev on 26.10.2015.
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
     * Отправка комментария на сервер
     * @param post
     * @returns {*}
     */
    sendComment = post => {
        return $.post(paths.sendComment, post);
    },

    likeComment = id => {
        return $.get(`${paths.likeComment}${id}`);
    },

    getComments = materialId => {
        return $.get(`${paths.getComments}${materialId}`);
    }

module.exports = {
    sendComment,
    likeComment,
    getComments
};