/**
 * Created by esolovyev on 22.11.2015.
 */

var Query = {

/*    get() {

        let data = new QueryData();
        return data;
    },*/

/*    set(data) {
        
        let query = $.param(data);
        
        if (history.pushState) {
            var newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${query}`;
            window.history.pushState({path:newurl},'',newurl);
        } else {

            document.location = `?${query}`;
        }
    },*/

    set(parameters) {
        
        var queryString = _.reduce(
            parameters,
            (components, value, key) => {
                if(value) {
                    components.push(key + '=' + encodeURIComponent(value));
                }
                return components;
            },
            []
        ).join('&');
        
        if(queryString.length > 0) {

            queryString = '?' + queryString;
        }

        if (history.pushState) {

            let newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryString}`;
            window.history.pushState({path:newurl},'',newurl);
        } else {

            document.location = queryString;
        }
        return queryString;
    },
    
    get(queryString) {

        var queryString = queryString || (window.location.search || null);

        if(queryString) {

            return _.reduce(
                queryString
                    .replace('?', '')
                    .split('&'),
                (parameters, parameter) => {
                    
                    if(parameter.length > 0) {
                        _.extend(
                            parameters,
                            _.object([_.map(parameter.split('='),
                                        decodeURIComponent)]));
                    }
                
                    return parameters;
                }, {});
        }
    }
    ///
};

module.exports = Query;