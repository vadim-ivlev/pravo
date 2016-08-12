/**
 * Created by esolovyev on 20.10.2015.
 */

var pubsub = PubSub;

    pubsub.immediateExceptions = RG.config.env === 'dev';

    /**
     * Позволяет регестрировать список событий
     * @param list
     */
/*    pubsub.subscribe = function(topic, func) {

        lsbridge.subscribe(topic, func);
    };

    pubsub.publish = function(topic, func) {

        lsbridge.send(topic, func);
    };*/

    pubsub.registerList = function(list = null) {

        if(!_.isEmpty(list)) {

            _.each(list, (callback, event) => {
                if(_.isString(event) && _.isFunction(callback)){

                    this.subscribe(event, callback);
                }
            });
        }
    }.bind(pubsub);

module.exports = pubsub;