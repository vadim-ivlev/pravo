/**
 * Created by esolovyev on 29.02.2016.
 */

var Input = require('../../b-input/scripts/Input'),
    Name = Input.extend({

        data() {
            return {
                name: 'name',
                type: 'text',
                placeholder: 'Имя',
                format: 'name'
            };
        },
    });

module.exports = Name;
