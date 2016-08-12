/**
 * Created by esolovyev on 09.10.2015.
 */
var fixData = obj => {

        if(!_.isEmpty(obj)) {
            return _.object(_.map(obj, (prop, key) => {

                let val = prop;

                if(_.isString(val)) {
                    val = val.replace(/\+/g, ' ');
                }

                return [key, val];
            }));
        }
    },

    cookie = Cookies,//require('cookies-js'),

    /**
     * Проверяет включенны ли куки
     * @returns {Function|enabled|ga.selectors.pseudos.enabled}
     */
    enabled = () => {

        return cookie.enabled;
    },

    /**
     * Возвращает хэш авторизованного пользователя
     * @returns {*}
     */
    isAuthorized = () => {

        return !!cookie.get('rg_user_hash');
    },

    /**
     * Возвращает регион пользователя
     * @returns {*}
     */
    getUserRegion = () => {

        var cookieCurrent = Cookies.get('rg_user_region');

        cookieCurrent = cookieCurrent ? fixData(JSON.parse(cookieCurrent) || null) : {};

        return cookieCurrent;
    },

    /**
     * Возвращает возвращает найленый регион
     * @returns {*}
     */
    getCurrentRegion = () => {

        var cookieNew = Cookies.get('rg_geo_data');

        cookieNew = cookieNew ? fixData(JSON.parse(cookieNew) || null) : {};

        return cookieNew;
    },

    /**
     * Возвращает хэш пользователя авторизиующегося через социальные сети
     * @returns {*}
     */
    confirmData = () => {

        return cookie.get('rg_thash');
    },

    check = topic => {

        RG.logger.info(topic);

        if(enabled()) {

            if(confirmData()) {

                RG.logger.warn('User avaitnig conformation');
                RG.events.publish('session.confirm.required');

            } else if(isAuthorized()) {

                RG.logger.warn('User is authorized');
                RG.events.publish('session.user.authorized');

            } else {

                RG.logger.warn('User is NOT authorized');
                RG.events.publish('session.user.logedout');
            }
        } else {

            RG.logger.error('Cookies disabled');
            RG.events.publish('session.cookie.disabled');
        }
    },

    getUserData = () => {

        let userData = {},
            user = {};

        try{

            userData = cookie.get('rg_user_info');

            if(userData) {

                user = JSON.parse(userData);
            }


        } catch (e) {

            RG.logger.error(`${e.toString()}`);
        }

        return user;
    },

    init = () => {

        //check();
        RG.events.subscribe('session.check', check);

        var interval = window.setInterval(() => {

            if(isAuthorized()) {
                window.clearInterval(interval);

                RG.events.publish('session.check');
            }
        }, 1000);
    };

module.exports = {
    enabled,
    isAuthorized,
    confirmData,
    init,
    getUserData,
    getUserRegion,
    getCurrentRegion
};