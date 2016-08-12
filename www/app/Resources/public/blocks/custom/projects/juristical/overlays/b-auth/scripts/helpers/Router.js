/**
 * Created by esolovyev on 12.10.2015.
 */

/**
 * Путь для подтверждения данных полученных из социальных сетей
 * @returns {boolean}
 */
var confirmingData = () => {

        return window.location.hash === '#social_redirect';
    },

    expectCode = () => {
        return window.location.hash === '#code'
    };

module.exports = {
    confirmingData
}
