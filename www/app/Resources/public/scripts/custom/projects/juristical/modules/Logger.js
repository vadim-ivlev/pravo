/**
 * Created by esolovyev on 06.10.2015.
 */

/**
 * Ставит время вызова функции
 * @returns {string}
 */
var time = () => {
        var d = new Date();
        return `${[d.getHours(),d.getMinutes(),d.getSeconds()].join(':')}.${d.getMilliseconds()}`;
    },

    /**
     * Проверяет окружение
     * @returns {boolean}
     */
    env = () => {
        return (RG.config.env === 'dev' || RG.config.env === 'test')
    },


    log = msg => {

        if(env()) console.log(time(), msg);
    },
    info = msg => {

        if(env()) console.info(time(),msg);
    },
    warn = msg => {

        if(env()) console.warn(time(),msg);
    },
    error = msg => {

        if(env()) console.error(time(),msg);
    },
    debug = msg => {

        if(env()) console.debug(time(),msg);
    },
    trace = msg => {

        if(env()) console.trace(time(),msg);
    };

/**
 * Экспорт функций
 * @type {{log: Function, info: Function, warn: Function, error: Function, debug: Function}}
 */
module.exports = {
    log,
    info,
    warn,
    error,
    debug,
    trace
}