module.exports = {

    blocks: [

        RGInclude('modules/Fonts', 'scripts inline'), // подключение шрифтов

        RGB('projects.hockey.builder:2016'),

        /*
         * Стили
         *
         */

        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "/res/styles/lib.css"
                }
            }
        },

        /*
         * Scripts
         *
         */

        {
            opt: {
                contents: [
                    { data: "<script src=\"//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>" }
                ]
            }
        },
        {
            opt: {
                contents: [
                    { data: "<script src=\"//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js\"></script>" }
                ]
            }
        },
		{
            opt: {
                contents: [
                    { data: "<script src=\"//yastatic.net/share2/share.js\"></script>" }
                ]
            }
        },
        {
            opt: {
                contents: [
                    { data: "<script src=\"//jwpsrv.com/library/kTh4+rSrEeOAlSIACi0I_Q.js\"></script>" }
                ]
            }
        },
        {
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/lib.js\"></script>" }
                ]
            }
        },
        {
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/global.js\"></script>" }
                ]
            }
        },
        {
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/custom/projects/hockey/global.js\"></script>" }
                ]
            }
        }
    ]

};