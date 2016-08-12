/**
 * Created by esolovyev on 11.01.2016.
 */

var template = require('../b-region.ihtml'),

    Followed = Ractive.extend({

        el: 'region',

        template,

        data() {
            return {
                regions: RG.config.regions,
                selectedRegion: RG.session.getUserRegion(),
                filterRegions: (regions) => {

                    var requiredRegions = [201, 146, 181, 130, 96, 223, 227, 176, 104];

                    regions = _.filter(regions, region => {

                        return _.indexOf(requiredRegions, region.id) !== -1;
                    });

                    return _.sortBy(regions, 'name');
                },
                searchRegions: [],
                searchingRegion: '',
                showRegions: false
            }
        },


        oninit() {

            RG.logger.debug('Region');

            this.set('selectedRegionOption', this.get('selectedRegion').id);

            this.observe('searchingRegion', (entered, current) => {

                var searchingRegions = [],
                    regions = this.get('regions');

                if(entered !== current) {

                    if(entered !== '') {

                        this.set('showRegions', true);

                        searchingRegions = _.filter(regions, region => {
                            return region.originName.toLowerCase().indexOf(entered.toLowerCase()) >= 0;
                        });

                        this.set('searchingRegions', searchingRegions);

                    } else {

                        this.set('showRegions', false);
                        this.set('searchingRegions', []);
                    }
                }
            });

            this.on({
                'setRegion': event => {

                    var regionId = this.get('selectedRegionOption'),
                        region = _.findWhere(this.get('regions'), {id: regionId});

                    RG.events.publish('geolocation.region.change', region);
                    event.original.preventDefault();
                },

                'switch': (event, region) => {

                    RG.events.publish('geolocation.region.change', region);

                    this.set('showRegions', false);
                    this.set('searchingRegions', []);
                    this.set('searchingRegion', '');

                    event.original.preventDefault();
                }
            });

            RG.events.registerList({

                'geolocation.region.changed': (topic, region) => {

                    this.set('selectedRegion', region);
                    this.set('selectedRegionOption', region.id);
                }
            });
        },

        onrender() {

            RG.events.publish('overlay.resize');
        }
    });

module.exports = Followed;