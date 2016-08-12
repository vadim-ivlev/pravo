/**
 * Created by esolovyev on 06.10.2015.
 */

/**
 * Конфигурационный
 * @type {string}
 */
var rootPath = RG.config.paths.root,

    link = $('<a />')
        .addClass('b-link')
        .addClass('b-link_blue')
        .text('пройдите регистрацию')
        .attr('href', '#')
        .addClass('b-auth__registration-link'),
    registrationLink = $('<div/>').html(link).html(),
    linkCode = $('<a />')
        .addClass('b-link')
        .addClass('b-link_blue')
        .text('ссылке')
        .attr('href', '#')
        .addClass('b-auth__code-link'),
    codeLink = $('<div/>').html(linkCode).html(),
    auth = `${rootPath}auth`,
    Config = {

        /**
         * Пути запроса к api
         */
        paths: {
            email: `${auth}/send/code`, // отправка кода подтверджения
            social: `${auth}/connect/`, // вход через SN
            code: `${auth}/confirm/code/`, // подтверждение кода

            getAuthData: `${auth}/get_auth_data`, // получить данные из социальной сети
            getUserData: `${auth}/get_exists_user_data/`, // получение информации о пользователе

            mergeUser: `${auth}/send/merge/`, // отправка кода подтверджения слияния

            mergeCode: `${auth}/confirm/merge/`, // подтверждение слияния
            saveUser: `${auth}/save`, // сохранение пользователя
            logout: `${auth}/logout`, // выйти
            disconnect: `${auth}/disconnect/`
        },

        /**
         * Сообщения и оповещения
         */
        messages: {
            emailNotValid: 'Неверный формат адреса электронной почты',
            nameNotValid: 'Неверный формат имени',
            registrationOffer: `Введенный e-mail не зарегестрирован на сайте, попробуте ещё раз или ${registrationLink}`,
            codeIsSent: `Код уже отправлен. Введите его, кликнув по ${codeLink}. Чтобы получить новый код, попробуйте авторизоваться позднее.`,
            codeNotValid: 'Введен неверный код',
        }

    };

module.exports = Config;