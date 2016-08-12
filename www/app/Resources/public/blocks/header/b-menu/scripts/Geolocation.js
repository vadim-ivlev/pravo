/**
 * Created by esolovyev on 08.11.2015.
 */

var template = require('../geolocation.ihtml'),

    Geolocation = Ractive.extend({

        template,

        data() {
            return {
                showRegion: true
            }
        },

        oninit() {

            RG.logger.debug('Geolocation');

            this.on({

                'choose': event => {

                    RG.events.publish('region.overlay.show');
                    event.original.preventDefault();
                },

                'swith': event => {

                    RG.events.publish('geolocation.region.change', this.get('newRegion'));

                    event.original.preventDefault();
                }
            });

            RG.events.registerList({
                'geolocation.region.change': topic => {

                    this.set('loading', true);
                },

                'geolocation.region.changed': topic => {

                    this.set('loading', false);

                    this.setRegions.call(this);
                },

                'menu.user.show': topic => {

                    this.set('showRegion', false);
                },

                'menu.user.hide': topic => {

                    this.set('showRegion', true);
                },

                'geolocation.list': topic => {
                    this.setRegions.call(this);
                }
            });

            this.setRegions();
        },

        setRegions() {

            let currentRegion = RG.session.getUserRegion(),
                newRegion = RG.session.getCurrentRegion(),
                different = !_.isEmpty(newRegion) ? (parseInt(currentRegion.id) !== parseInt(newRegion.id)) : false;

            if(!_.isEmpty(currentRegion)) {

                this.set({
                    currentRegion,
                    newRegion,
                    different
                });
            }

        }
    });

module.exports = Geolocation;