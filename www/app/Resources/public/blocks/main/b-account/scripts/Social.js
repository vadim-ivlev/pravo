/**
 * Created by esolovyev on 09.12.2015.
 */

var template = require('../social.ihtml'), // подкючение шаблона

    Social = Ractive.extend({

        template,

        data() {
            return {
                socials: [
                    {
                        name: 'fb',
                        title: 'facebook'
                    },
                    {
                        name: 'goo',
                        title: 'google'
                    },
                    {
                        name: 'tw',
                        title: 'twitter'
                    },
                    {
                        name: 'vk',
                        title: 'vkontakte'
                    },
                    {
                        name: 'ok',
                        title: 'odnoklassniki'
                    }
                ]
            };
        },

        oninit() {

            RG.logger.debug('Social');

            /**
             * Локалные события
             */
            this.on({
                'disconnect': this.disconnect.bind(this)
            });

            /**
             * Глобальные события
             *
             */
            RG.events.registerList({

                'account.profile.social': this.setSocial.bind(this),
                'auth.social.disconnected': this.disconnected.bind(this)
            });

        },

        setSocial(topic, data) {

            RG.logger.info(topic);

            let socials = this.get('socials');

            data.forEach(n => {

                socials.forEach((o, i) => {

                    if(o.name[0] === n.name[0]) {

                        let social = {
                            merged: true,
                            fullName: n.fullName,
                            name: o.name,
                            id: n.uid,
                            title: o.title
                        };

                        this.set(`socials.${i}`, social);
                    }
                });
            });
        },

        disconnect(event, social) {

            RG.events.publish('auth.social.dsiconnect', social.title);
        },

        disconnected(topic, name) {

            let socials = this.get('socials'),
                index = _.findIndex(socials, {title: name});

            this.set(`socials.${index}.merged`, false);
        }
    });

module.exports = Social;