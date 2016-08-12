/**
 * Created by esolovyev on 08.11.2015.
 */

var MenuUser = require('../../b-menu-user/scripts/MenuUser'),

    template = require('../services.ihtml'),

    Services = Ractive.extend({

        template,

        data: () => {
            return {
                isOpen: false,
                viewedActive: false,
                followedActive: false,
                user: {},
                isAuthorized: false,
                showList: false
            };
        },

        components: {
            'menu-user': MenuUser
        },

        oninit() {
            RG.logger.debug('Services');

            if(RG.session.isAuthorized()) {

                let user = RG.session.getUserData();

                if(user) {

                    this.set('user', user);
                }

                this.set('isAuthorized', true);
            }


            this.on({
                'choose': event => {

                    RG.events.publish('region.overlay.show');
                    event.original.preventDefault();
                },

                'search': event => {

                    RG.events.publish('search.overlay.show');
                    event.original.preventDefault();
                },

                'viewed': event => {

                    RG.events.publish('viewed.show');

                    this.set('viewedActive', true);

                    event.original.preventDefault();
                },

                'followed': event => {

                    RG.events.publish('followed.show');

                    this.set('followedActive', true);
                    event.original.preventDefault();
                }
            });


            RG.events.registerList({

                'menu.user.show': topic => {

                    RG.logger.info(topic);

                    this.set('isOpen', true);
                },

                'menu.user.hide': topic => {

                    RG.logger.info(topic);

                    this.set('isOpen', false);
                },

                'colorbox.closed': topic => {

                    this.set('viewedActive', false);
                    this.set('followedActive', false);
                },

                'session.user.authorized': topic => {

                    RG.logger.info(topic);

                    let user = RG.session.getUserData();

                    this.set('user', user);
                    this.set('isAuthorized', true);
                },

                'session.user.logedout': topic => {

                    RG.logger.info(topic);

                    this.set('isAuthorized', false);
                    this.set('user', {});
                },
            });
        },

        onrender() {
            RG.logger.log(this);
        }
    });

module.exports = Services;