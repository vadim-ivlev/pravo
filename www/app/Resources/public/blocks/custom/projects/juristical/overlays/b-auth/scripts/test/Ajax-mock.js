var paths = require('../config').paths,
    getData = new RegExp(`${paths.code}(\\d+)`),
    codePath = new RegExp(`${paths.code}(\\d+)`),
    mergePath = new RegExp(`${paths.mergeUser}(\\d+)`),
    mergeCodePath = new RegExp(`${paths.mergeCode}(\\d+)`);


/*    sendEmail = email => {
        return $.post(paths.email, {email});
    },


    sendConfirmCode = (code) => {
        return $.get(`${paths.code}${code}`);
    },


    getAuthData = () => {
        return $.get(`${paths.getAuthData}`);
    },


    saveUser = user => {
        return $.post(`${paths.saveUser}`, user);
    },

    getUserData = id => {
        return $.post(`${paths.getUserData}${id}`);
    },


    mergeUser = id => {
        return $.get(`${paths.mergeUser}${id}`);
    },

    sendMergeCode = (id) => {
        return $.get(`${paths.mergeCode}${id}`);
    };*/

$.mockjax({
    url: paths.email,
    //status: 418,
    responseText: {

    }
});

$.mockjax({
    url: paths.saveUser,
    status: 423,
    responseText: {
        uid: 1
    }
});

$.mockjax({
    url: `${paths.getUserData}1`,
    //status: 423,
    responseText: {
        first_name: 'Test',
        last_name: 'Testov',
        email: 'test@testov.ru',
    }
});

$.mockjax({
    url: codePath,
    response: settings => {

        Cookies.set('rg_user_hash', '45ctw9n6w9c75t978iyf58');
    }
});

$.mockjax({
    url: mergePath,
    response: settings => {
    }
});

$.mockjax({
    url: mergeCodePath,
    response: settings => {
        Cookies.set('rg_user_hash', '45ctw9n6w9c75t978iyf58');
    }
});

/*$.mockjax({
    url: `${paths.code}123123`,
    response: settings => {

        Cookies.set('rg_user_hash', '45ctw9n6w9c75t978iyf58');
    }
});*/
/*
$.mockjax({
    url: paths.sendComment,
    responseText: {

    }
});

$.mockjax({
    url: paths.sendComment,
    responseText: {

    }
});

$.mockjax({
    url: paths.sendComment,
    responseText: {

    }
});

$.mockjax({
    url: likePath,
    urlParams: ['commentId'],
    response: function(settings) {
        // Investigate the `settings` to determine the response...
        let commentId = settings.urlParams.commentId,
            data = {
                status: 'success',
                method: 'like',
                newCount: 35
            };

        if(likes[commentId]) {
            data.method = 'dislike';

            data.newCount = 34;
        }

        this.responseText = data;

        likes[commentId] = !likes[commentId];
    }
});*/