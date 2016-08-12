/**
 * Created by esolovyev on 25.02.2016.
 */

var Input = require('../../b-input/scripts/Input'),
    Email = Input.extend({

        data() {
            return {
                name: 'email',
                type: 'email',
                placeholder: 'e-mail',
                format: 'email',
                label: ''
            }
        }
    });

module.exports = Email;
