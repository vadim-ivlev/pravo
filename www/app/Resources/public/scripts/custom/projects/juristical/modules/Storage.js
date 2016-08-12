/**
 * Created by esolovyev on 12.11.2015.
 */

/**
 * TODO
 * Add cookie storage if local is not supported
 */
var Storage = {

    get(name) {

        return Lockr.get(name);
    },

    set(name, value) {

        Lockr.set(name, value);

        return Lockr.get(name);
    },

    add() {

        Lockr.sadd(name, value);

        return Lockr.get(name);
    },

    all() {

        return Lockr.getAll();
    }
};

    

module.exports = Storage;