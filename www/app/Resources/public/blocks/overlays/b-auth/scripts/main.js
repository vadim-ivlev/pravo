/**
 * Created by esolovyev on 06.10.2015.
 */

/**,
 * Подключение вспомогательный модулей
 */
var Router = require('./helpers/Router'),
    Ajax = require('./helpers/Ajax'),

    /**
     * Подулючение компонентов
     */
    Auth = require('./Auth'),
    CodeForm = require('./CodeForm'),
    SignupForm = require('./SignupForm'),
    UserExistForm = require('./UserExistForm'),
    RegisterForm= require('./RegisterForm'),
    LoginForm = require('./LoginForm'),

    /**
     * Сокращённые названия
     */
    publish = RG.events.publish,
    registerList = RG.events.registerList,

    error = RG.logger.error,
    debug = RG.logger.debug,
    warn = RG.logger.warn,
    info = RG.logger.info,

    /**
     * Приватные переменные
     */
    auth = null,
    step = null,
    userId = null,
    userData = null,
    tabs = {
        registration: 'signup',
        enter: 'login',
    },

/**************************************************************************************
 ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
 *************************************************************************************/

    /**
     * Вызывается в случае ошибки
     * @param topic
     * @param type
     * @param data
     */
    authError = (topic, type, data) => {

        info(topic);

        switch(type) {
            case 'email':
            case 'confirmCode':
            case 'mergCode':
            case 'user':
                RG.logger.warn(data);
                step.notValid();
                break;
        }
    },

    /**
     * Включает спиннер
     */
    authLoading = (topic) => {
        info(topic);
        step.loading();
    },


/**************************************************************************************
 МЕТОДЫ СОБЫТИЙ
 *************************************************************************************/

    socialDisconnect = (topic, name) => {

        RG.logger.info(topic);

        Ajax.socialDisconnect(name).then(data => {

            RG.events.publish('auth.social.disconnected', name);
        });
    },

    ////////////////////ФОРМА ВХОДА////////////////////

    /**
     * Окно авторизации
     */
    authRun = (topic, type) => {

        type = type || 'login';

        auth = new Auth({data: {type}});
    },

    authRegistration = topic => {

        RG.events.publish('account.tabs.show', 0);

        switch(tabs.registration) {

            case 'signup':
                publish('auth.signup', {tab: 'registration'});
                break;
            case 'exists':
                publish('auth.user.form', {tab: 'registration'});
                break;
            case 'code':
                publish('auth.expect.code', {tab: 'registration'});
                break;
        }
    },

    authEnter = topic => {

        RG.events.publish('account.tabs.show', 1);

        switch(tabs.enter) {

            case 'signup':
                publish('auth.signup', {tab: 'enter'});
                break;
            case 'login':
                publish('auth.login', {tab: 'enter'});
                break;
            case 'code':
                publish('auth.expect.code', {tab: 'enter'});
                break;
            case 'exists':
                publish('auth.user.form', {tab: 'enter'});
                break;
        }
    },

    /**
     * Вызывается при запуске формы входа
     */
    authLogin = (topic, data) => {

        var email = data.email || RG.storage.get('auth').email;

        info(topic);

        if(data.tab) {

            tabs[data.tab] = 'login';
        }

        step = new LoginForm();

        if(email) {
            step.set('email', email);
        }

        /*RG.events.publish('scroll.init', $('.b-auth__login'));*/

        publish('overlay.resize');
    },

    /**
     * Вызывается при выходе
     */
    logout = (topic) => {

        info(topic);

        Ajax.logOut().then(() => {

            publish('auth.check');
        });
    },

    ////////////////////ФОРМА EMAIL////////////////////
    /**
     * Вызывается при отправке адреса электронной почты
     * @param topic
     * @param email
     */
    authSendEmail = (topic, email) => {

        info(topic);
        publish('auth.loading');

        Ajax.sendEmail(email).then(() => {

            publish('auth.expect.code', {merge: false, tab: 'enter'}); // письмо с кодом отправленно
        }, response => {

            switch(response.status) {
                case 423: // письмо отрпавленно 3 минуты назад
                    publish('auth.email.sended');
                    break;
                case 400: // ошибка при отправке
                    publish('auth.error','email');
                    break;
                case 418: // требуется регистрация
                    publish('auth.register.offer', email);
                    break;
            }
        });
    },

    /**
     * Вызывается в случае отправки кода подтверждения на почту
     * @param social
     */
    authExpectCode = (topic, data) => {

        info(topic);

        if(data.tab) {

            tabs[data.tab] = 'code';
        }

        step = new CodeForm();
        step.set('merge', data.merge);

        publish('overlay.resize');

        document.location.hash = '#code';
    },

    /**
     * Вызывается в случае, когда письмо уже было отправленно
     */
    authEmailSended = (topic) => {

        info(topic);
        step.codeSend();
    },

    /**
     * Вызывается когда необходимо спросить пользователя хочет ли он зарегестрироваться
     */
/*    authRegister = (topic, email) => {

        info(topic);
        step = new RegisterForm();
        step.set('email', email);

        publish('overlay.resize');
    },*/

    authRegisterOffer = (topic, email) => {

        step.emailNotFound();
        info(topic);
    },

    ////////////////////ФОРМА CODE/////////////////////
    /**
     * Вызывается при отправке кода подтверждения email
     */
    authSendConfirmCode = (topic, code) => {

        info(topic);

        publish('auth.loading');

        Ajax.sendConfirmCode(code).then(() => {

            document.location.hash = '';
            publish('auth.check');
        }, () => {

            publish('auth.error','confirmCode');
        });
    },

    /**
     * Вызывается при отправке кода подтверждения объеденнения
     */
    authSendMergeCode = (topic, code) => {

        info(topic);

        publish('auth.loading');

        Ajax.sendMergeCode(code).then(data => {

            publish('auth.check');
        }, response => {

            publish('auth.error','mergCode');
        });
    },

    /**
     * Вызывается, если код подтверждения валидный
     */
    authCheck = (topic) => {

        info(topic);
        publish('session.check');
    },

    ////////////////////ФОРМА РЕГИСТРАЦИИ///////////////
    /**
     * Вызывается если требуется регистрация
     * @param topic
     * @param user
     */
    authSignup = (topic, data) => {

        let user = data.user || {
            first_name: RG.storage.get('auth').firstName,
            last_name: RG.storage.get('auth').lastName,
            email: RG.storage.get('auth').email,
        };

        info(topic);

        if(data.tab) {

            tabs[data.tab] = 'signup';
        }

        step = new SignupForm();
        step.set(user);
        step.set('social', data.social);

        publish('overlay.resize');
    },

    /**
     * Вызывается после редиректа от с социальной сети,
     * проверяет наличе email пользователя
     */
    confirmRequired = (topic) => {

        info(topic);

        if(Router.confirmingData()) {

            Ajax.getAuthData().then(user => {

                publish('auth.signup', {
                    user,
                    social: true,
                    tab: 'enter'
                }); // требуется регистрация

            }, response => {

                switch(response.status) {
                    case 423:
                        publish('auth.user.exists', {
                            id: response.responseJSON.uid,
                            user: {}
                        }); // пользователь с таким email уже существует
                        break;
                    case 400:
                        publish('auth.error','data'); // ошибка получения данных
                        break;
                }

            });
        }
    },

    /**
     * Отправка данных пользователя на сервер
     * @param data
     */
    authUserSave = (topic, data) => {

        let user = data.user;

        info(topic);

        publish('auth.loading');

        Ajax.saveUser(user).then(() => {

            publish('auth.expect.code', { merge: data.social, tab: 'enter'});
        }, response => {

            switch(response.status) {
                case 423:

                    publish('auth.user.exists', {
                        id: response.responseJSON.uid,
                        user
                    }); // пользователь с таким email уже существует

                    break;
                case 400:
                    publish('auth.error','user'); // ошибка получения данных
                    break;
            }
        });
    },

    ////////////////////ФОРМА ЭТО ВЫ////////////////////

    /**
     * Вызывается если пользователь уже существует
     * @param id
     */
    authUserExists = (topic, data) => {

        info(topic);

        Ajax.getUserData(data.id).then(response => {

            let auth = RG.storage.get('auth');

            auth.email = response.email;
            auth.lastName = response.lastName;
            auth.firstName = response.firstName;

            RG.storage.set('auth', auth);

            publish('auth.user.form', { tab: 'registration', user: response, data: data.user, id: data.id });
        }, () => {

            publish('auth.error','getUser'); // ошибка получения пользователя
        });
    },

    /**
     * Вызывается при запуске формы входа
     * @param id
     */
    authUserForm = (topic, data) => {

        info(topic);

        var user = data.user || RG.storage.get('auth');

        if(data.tab) {

            tabs[data.tab] = 'exists';
        }

        step = new UserExistForm();

        step.set(data.user);
        step.set('user', data.data);
        step.set('id', data.id);

        publish('overlay.resize');
    },

    /**
     * Подтвержить объеденение
     * @param id
     */
    authUserMerge = (topic, id) => {

        info(topic);

        Ajax.mergeUser(id).then(() => {
            publish('auth.expect.code', {merge: true, tab: 'enter'});
        }, () => {

            publish('auth.error','getUser'); // ошибка получения пользователя
        });
    },

/**************************************************************************************
 ЭКСПОРТИРУЕМЫЕ МЕТОДЫ
 *************************************************************************************/

    /**
     * Инициализация событий модуля
     * @returns {*}
     */
    init = () => {

        /**
        * События
        */
        registerList({

            'auth.run' :authRun,

            /**
             * События tab
             */
            'auth.registration': authRegistration,
            'auth.enter': authEnter,

            /**
             * События форма входа
             */
            'auth.login': authLogin, // форма входа

            'logout': logout, // выйти

            /**
             * Редирект после социальной сети
              */
            'aurh.confirm.required': confirmRequired, // полученне данных

            /**
             * События формы входа на сайт
             */
            'auth.send.email': authSendEmail, // отправка email
            'auth.expect.code': authExpectCode, // требуется ввод кода подтверждения
            'auth.email.sended': authEmailSended, // email уже отправлен
            //'auth.register': authRegister, // если требуется регистрация
            'auth.register.offer': authRegisterOffer, // предлагается регистрация
            /**
             * События формы отправки кода
             */
            'auth.send.confirm.code': authSendConfirmCode, // отправка кода подтверждения email
            'auth.send.merge.code': authSendMergeCode, // отправка кода подтверждения объеденения
            'auth.check': authCheck, // если код валидный

            /**
             * События формы регистрации
             */
            'auth.signup': authSignup, // форма регистрации
            'auth.user.save': authUserSave, // отрпавка данных

            /**
             * Событя формы пользователь существует
             */
            'auth.user.exists': authUserExists, // пользователь существует
            'auth.user.form': authUserForm, // форма существующего пользователя
            'auth.user.merge': authUserMerge, // форма существующего пользователя

            /**
             * Вспомогательные события
             */
            'auth.error': authError, // ошибка
            'auth.loading': authLoading, // загрузка

            /**
             * Социальные сети
             *
             */

            'auth.social.dsiconnect': socialDisconnect
        });
    },

    /**
     * Запуск модуля
     */
    run = (type) => {

        type = type || 'login';

        RG.events.publish('auth.run', type);
    },

    /**
     * Отписаться от всех событий
     */
    destruct = () => {

        RG.events.unsubscribe('auth');
        step = null;
    };

module.exports = {
    init,
    run,
    destruct
};