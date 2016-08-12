/**
 * Created by esolovyev on 27.02.2016.
 */

class Form {

    constructor(options) {

        RG.logger.debug('Form');

        this.el = options.el;
        this.options = options.data || {};
        this.template = options.data.template;
        this.formData = {};

        if(!_.isEmpty(this.options.tmpl)) {

            this._getTemplate();
        } else {

            let components = RG.parser.findComponents(this.el);
            this.setAllComponents(components);
        }
    }

    setAllComponents(components) {

        this.registerEvents(components);
        this.fields = this.renderComponents(components);
    }

    updateFormData(topic, value) {

        RG.logger.info(topic);

        let name = topic.split('.').pop();

        this.formData[name] = value;

        RG.logger.log('name: ' + name + ' - ' + this.formData[name]);
    }

    setFormData(data) {

        if(!_.isEmpty(data) && this.fields.length) {

            _.each(data, (value, name) => {

                RG.events.publish(`form.${this.options.name}.set.${name}`, value);
            });
        }
    }

    getFormData() {

        let data = {};

        if(this.fields.length) {

            _.each(this.fields, field => {

                let name = field.get('name'),
                    value = field.get('value');

                if(!_.isEmpty(name) && value) {

                    data[name] = value;
                }
            });
        }

        data.form_id = parseInt(this.options.id);
        data.article_id = RG.meta.getMaterial() || 0;
        data.user_id = RG.session.getUserData().id || 0;

        return data;
    }

    renderForm(template) {

        $(this.el).html(template);

        let components = RG.parser.findComponents(this.el);
        this.setAllComponents(components);
    }

    renderComponents(items) {

        let fields = [];

        RG.parser.init();

        if(items.length) {

            _.each(items, component => {

                let instances = RG.parser.render(component.tag);
                fields = fields.concat(instances);
            });
        }

        return fields;
    }

    registerEvents(items) {

        RG.events.subscribe(`form.${this.options.name}.submit`, this._submit.bind(this));

        _.each(items, item => {

            RG.events.subscribe(`form.${this.options.name}.update.${item.data.name}`, this.updateFormData.bind(this));
        });
    }

    validate() {

        var fields = this.fields,
            length = this.fields.length,
            valid = true;

        if(length) {

            for(let i = 0; i < length; i++) {

                if(_.isFunction(fields[i].validate)) {

                    if(!fields[i].validate(valid)) {
                        valid = false;
                    }
                }
            }
        }

        return valid;
    }

    _getTemplate() {

        $.get(this.options.tmpl).then(template => {

            $(this.el).html(template);

            let components = RG.parser.findComponents(this.el);

            this.setAllComponents(components);
        });
    }

    _submit(topic, context) {

        RG.logger.info(topic);

        if(context.form === this.options.name) {

            if(this.validate()) {

                let method = this.options.method;

                this.formData = this.getFormData(this.options.id);

                RG.logger.trace(this.formData);

                if(method === 'get' || method === 'post') {

                    $[method](this.options.action, this.formData).then(response => {

                        if(this.options.empty) {

                            RG.events.publish(`form.${this.options.name}.empty`);
                        }

                        RG.logger.log(response);

                        RG.events.publish(`form.${this.options.name}.message.show`, response);

                        _.each(this.fields, item => {

                            if (_.isFunction(item.resetField)) {
                                item.resetField();
                            }

                        });

                    });

                }
            }


        }
    }
}

module.exports = Form;