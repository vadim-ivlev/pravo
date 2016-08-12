/**
 * Created by esolovyev on 12.02.2016.
 */

var components = [],

    init = () => {

        components = [];

        components = findComponents('html');
    },

    findComponents = (parent) => {

        let foundComponents = [];

        _.each(_.keys(Ractive.components), component => {

            $(parent).find(component).each(function(i, el) {

                var tag = this.tagName.toLowerCase();

                if(Ractive.components[tag]) {

                    RG.logger.warn(`Parser found ${tag} component`);

                    let data = getAttributes(el);

                    foundComponents.push({
                        tag,
                        el,
                        data
                    });
                }
            });
        });

        return _.sortBy(foundComponents, item => {
            return item.data.sort;
        });
    },

    /**
     * Возвращает атрибуты элемента в виде объекта
     **/
    getAttributes = (el) => {  

        var attributes = {};

        if(_.isObject(el) && el.attributes) {

            attributes = _.object(_.map(Array.prototype.slice.call(el.attributes), item => {

                let value = item.value,
                    itemValue = $(el).attr(item.name).toString();

                try {

                    if(/^[\[\{].*?[\]\}]/.test(itemValue)) {

                        value = JSON.parse(itemValue);
                    } else {

                        throw false;
                    }
                } catch (e) {

                    if(itemValue.match(/'(.+)'$/)) {

                        value = itemValue.replace(/['"]+/g, '');
/*                    } else if(!isNaN(itemValue)) {

                        value = parseFloat(itemValue);
                        RG.logger.trace('NUMBER');*/
                    } else if(itemValue === "true" || itemValue === "false") {

                        value = (itemValue === "true");
                    } else if(item.name === 'class') {

                        value = itemValue.split(' ');
                    } else {
                        
                        value = itemValue;
                    }
                }



                return [item.name, value];
            }));
        }

        attributes.content = $(el).text();

        return attributes;
    },

    getComponents = (component) => {

        return _.where(components, {tag: component});
    },

    render = (component, options) => {

        let foundComponents = [],
            instances = []; 

        if(!_.isEmpty(component)) {

            foundComponents = _.where(components, {tag: component});

            if(foundComponents.length) {

                _.each(foundComponents, item => {

                    var data = item.data;

                    // if(options && options.data) {

                    //     data = _.extend(data, options.data);
                    //     delete options.data;
                    // }

                    let settings = _.extend({
                            el: item.el,
                            data: item.data
                            // data: () => {
                            //     return data;
                            // }
                        }, options || {}),

                        instance = new Ractive.components[component](settings);

                    instances.push(instance);
                });
            }
        }

        return instances;
    };

module.exports = {
    init,
    render,
    getAttributes,
    getComponents,
    findComponents
};