/**
 * Created by esolovyev on 20.01.2016.
 */
var getTime = (date) => {

        var time = moment().format('HH:mm');

        if(date) {
            time = `${date.slice(-4, -2)}:${date.slice(-2)}`;
        }

        return time;
    },

    parseVmDate = (date) => {

        if(date) {
            var preparedDate = moment(date, 'YYYYMMDDhhmm');

            if(preparedDate.isSame(moment(), 'day')) {
                return preparedDate.format('HH:mm');
            }

            return preparedDate.format('DD.MM.YYYY');

        } else {

            return moment().format('HH:mm');
        }
    };

module.exports = {
    getTime,
    parseVmDate
};