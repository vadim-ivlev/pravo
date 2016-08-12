/**
 * Created by esolovyev on 29.02.2016.
 */

var Input = require('../../b-input/scripts/Input'),
    Url = Input.extend({

        data() {
            return {
                name: 'name',
                type: 'text',
                placeholder: 'Ссылка',
                format: 'url'
            };
        },
    });

module.exports = Url;
