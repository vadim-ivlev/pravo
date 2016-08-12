var paths = require('../config').paths;

    //likePath = new RegExp(`${paths.likeComment}(\\d+)`);

$.mockjax({
    url: paths.getServices,
    responseText: [
        {
            id: 1,
            isSujet: true,
            title: 'Алкоголь и табак',
            url: '/sujet/3295/',
            img: '/img/content/coll/0/32/95/magaz_300x200_300x200.jpg',
            materials: [
                {
                    url: '/2015/10/14/alkogol2-anons.html',
                    title: 'Правительство рассмотрит вопрос о запрете продажи алкоголя до 21 года',
                    published: '14.12.2015'
                },
                {
                    url: '/2015/10/14/alkogol2-anons.html',
                    title: 'Правительство рассмотрит вопрос о запрете продажи алкоголя до 21 года',
                    published: '15.12.2015'
                },
            ]
        },

        {
            id: 2,
            isComments: true,
            title: 'Кто воевал в тылу Красной армии, освобождавшей Европу от фашизма',
            url: '/2015/02/26/dokumenti-site.html',
            count: 23,
            comments: [
                {
                    date: '2015-09-03T09:26:08+00:00',
                    content: 'Необъяснимые дела, голубчики!',
                    user: {
                        firstName: 'Сеня',
                        lastName: 'Ступин',
                        avatar: ''
                    }
                }
            ]
        },

        {
            id: 3,
            isSaved: true,
            title: 'Кто воевал в тылу Красной армии, освобождавшей Европу от фашизма',
            published: '12.12.2015',
            announce: '61 документ из 70 увидит свет впервые. Публикация приурочена к первому марта, когда Польша отмечает День памяти "Проклятых солдат". В свою очередь «Нафтогаз Украины» заявлял о прекращении закупки российского газа из-за отсутствия договоренностей по его цене.'
        }
    ]
});

$.mockjax({
    url: paths.getProfile,
    responseText: {
        firstName: 'Иван',
        lastName: 'Путров',
        email: 'ipetro@ten.ton',
        avatar: '/img/content/0/00/05/kichin-2.jpg',
        
    }
});
