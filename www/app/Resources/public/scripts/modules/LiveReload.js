/**
 * Created by esolovyev on 11.02.2016.
 */

var LiveReload = require('../../blocks/main/b-live-reload/scripts/LiveReload'),

    blocks = [],
    liveReloads = {},
    templates = {},
    partials = {},
    data = {},
    intervals = {},
    requested = {},

    init = () => {

        getBlocks();
    },

    getBlocks = () => {

        blocks = [];

        $('.liveReload').each((i, el) => {

            $(el).attr('id', `live_reload_${Math.random().toString(36).substring(10)}`);
            let block = _.extend(RG.parser.getAttributes(el), {el: el});

            _.each(block, (value, key) => {

                let newKey = key.replace('data-', '');
                block[newKey] = value;
            })

            blocks.push(block);
        });
    },

    run = () => {

        RG.logger.trace(blocks);

        _.each(blocks, (block) => {

            setStart(block);
        });
    },

    setStart = (block) => {

        setTimeout(() => {

            if(!requested[block.tmpl]) {

                getTemplate(block);
                requested[block.tmpl] = true;

            } else if(!requested[block.json]) {

                getData(block);
                requested[block.json] = true;
            }
        }, block.delay)
    },

    getTemplate = (block) => {

        var tmplUrl = block.tmpl,
            iterator = block.iterator,
            template = '';

        $.get(tmplUrl).then(response => {

            if (iterator) {

                template = `{{#${iterator}}}{{>part}}{{/${iterator}}}`;
                partials[block.tmpl] = response;
            } else {
                template = response;
            }

            templates[tmplUrl] = template;

            if(!requested[block.json]) {

                getData(block);
                requested[block.json] = true;
            }
        });
    },

    getData = (block) => {

        if(block.request === 'jsonp') {

            $.ajax({
                url: block.json,
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'callback',
            }).then(response => {

                data[block.json] = response;
                renderComponent(block);
            });
        } else {

            $.get(block.json).then(response => {

                data[block.json] = response;
                renderComponent(block);
            });
        }
    },

    renderComponent = (parrent) => {

        RG.logger.trace(_(blocks).where({json: parrent.json}));

        _.chain(blocks).where({json: parrent.json}).each(block => {

            if (liveReloads[block.id]) {

                if (_.isArray(data[block.json])) {

                    liveReloads[block.id].reset(data[block.json]);
                } else {

                    try {

                        liveReloads[block.id].set(data[block.json]);
                    } catch (e) {

                        RG.logger.log('LiveReload object is updated');
                    }
                }

            } else {

                liveReloads[block.id] = new LiveReload({
                    template: templates[block.tmpl],
                    data: data[block.json],// Ractive ругается!
                    /*data() {
                        var data = {};

                        _.each(block.json, function(el){
                            data
                        });

                        return data;
                    },*/
                    el: block.el,
                    magic: true,
                    partials: {
                        part: partials[block.tmpl]
                    }
                });
            }

            RG.events.publish('livereload.init', block);
        });

        updateInterval(parrent);
    },

    updateInterval = (block) => {

        var id = block.json,
            blockData = data[block] || {},
            interval = parseInt(blockData.interval) || 60000;

        if(id in intervals) {

            clearInterval(intervals[id].intervalId);
            delete intervals[id];

            if(interval === 0) {
                return false;
            }
        }

        interval = interval > 20000 ? interval : 20000;

        intervals[id] = {
            intervalId: setInterval(() => {

                getData(block);
            }, interval),
            intervalTime: interval
        };
    };

module.exports = {
    init,
    run
};