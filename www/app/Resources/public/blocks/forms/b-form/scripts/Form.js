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

        let components = [];

        if(!_.isEmpty(this.options.tmpl)) {

            this.template = this._getTemplate(this.options.tmpl);
        }

        if(!_.isEmpty(this.template)) {

            return this.renderForm();
        } else {

            components = RG.parser.findComponents(this.el);

            this.registerEvents(components);
            this.fields = this.renderComponents(components);
        }
    }

    updateFormData(topic, value) {

        RG.logger.info(topic);

        let name = topic.split('.').pop();

        this.formData[name] = value;
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

    renderForm() {

        this.form = new Ractive({
            data: this.options,
            el: this.el,
            template: this.template
        });

        let components = this.form.findAllComponents();

        this.fields = _.filter(components, component => {

            return component.form === this.name;
        });

        RG.forms[this.options.name] = this;

        return this.form;
    }

    renderComponents(items) {

        let fields = [];

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

    _getTemplate(url) {

        let template = '';

        $.ajax({
            url,
            success: tmpl => {

                template = tmpl;
            },
            async: false
        });

        return template;
    }

    _submit(topic, context) {

        RG.logger.info(topic);

        $('.js-ask-submit').addClass('disabled');

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

