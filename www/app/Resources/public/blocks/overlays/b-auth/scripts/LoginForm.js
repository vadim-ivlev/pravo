/**
 * Created by esolovyev on 05.10.2015.
 */

var SocialForm = require('./SocialForm'), // подключение компонента кнопок социальных сетей
    EmailForm = require('./EmailForm'), // подключение компонента кнопок социальных сетей

    template = require('../login-form.ihtml'), // подкючение шаблона

    LoginForm = Ractive.extend({

        el: 'authContent',

        template,

        data: {
            email: '',

        },

        components: {
            'social-form': SocialForm, // Передача компонента кнопок социальных сетей
            'email-form': EmailForm // Передача компонента кнопок социальных сетей
        },

        oninit() {

            RG.logger.debug('SigninForm');
        },

        onrender() {

            if(RG.ScreenViewer.getScreenInfo().type === 'mobile') {

                $('.b-auth__scroll').css('height', window.innerHeight - 60);
                RG.events.publish('scroll.init', $('.b-auth__scroll'));
            }
        },

        loading() {

            this.findComponent('email-form').loading();
        },

        codeSend() {

            this.findComponent('email-form').codeSend();
        },

        emailNotFound() {
            this.findComponent('email-form').emailNotFound();
        }
    });

module.exports = LoginForm;