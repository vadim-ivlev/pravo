var paths = require('../config').paths,

    likes = {
        1: false,
        2: false
    },

    likePath = new RegExp(`${paths.likeComment}(\\d+)`);

$.mockjax({
    url: `${paths.getComments}1`,
    responseText: 
        [
            {
                id: 1,
                content: '<div>Воздействие на потребителя деятельно допускает креативный рекламный блок.</div>',
                likes: 34,
                date: '2015-08-12T10:26:08+00:00',
                user: {
                    id: 1,
                    firstName: 'Татьяна',
                    lastName: 'Бурьянова'
                },
                isLiked: false,
                answers: [
                    {
                        id: 6,
                        content: '<div>Воздействие на потребителя деятельно допускает креативный рекламный блок.</div>',
                        date: '2015-09-03T09:26:08+00:00',
                        user: {
                            id: 2,
                            firstName: 'Колян',
                            lastName: 'Пропанов'
                        },
                    },
                    {
                        id: 7,
                        content: '<div>Воздействие на потребителя деятельно допускает креативный рекламный блок.</div>',
                        date: '2015-10-29T11:26:08+00:00',
                        user: {
                            id: 1,
                            firstName: 'Татьяна',
                            lastName: 'Бурьянова'
                        },
                    }
                ]
            },
            {
                id: 2,
                content: '<div>Воздействие на потребителя деятельно допускает креативный рекламный блок.</div>',
                likes: 34,
                date: '2015-10-04T03:26:08+00:00',
                user: {
                    id: 3,
                    firstName: 'Евгений',
                    lastName: 'Штольц'
                },
                isLiked: false,
                answers: [
                    {
                        id: 3,
                        content: '<div>Воздействие на потребителя деятельно допускает креативный рекламный блок.</div>',
                        date: '2015-11-04T12:26:08+00:00',
                        user: {
                            id: 4,
                            firstName: 'Борька',
                            lastName: 'Степной'
                        },
                    },
                    {
                        id: 4,
                        content: '<div><i class="b-comment__quote" id="comment-quote-735">потребителя деятельно допускает креативный рекламны</i><b class="b-comment__mention-quote" id="comment-mention-5">@СтепанБорода</b></div><div>Воздействие на потребителя деятельно допускает креативный рекламный блок.</div>',
                        date: '2015-11-04T12:45:08+00:00',
                        user: {
                            id: 5,
                            firstName: 'Степан',
                            lastName: 'Борода'
                        },
                    }
                ]
            }
        ]
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
});