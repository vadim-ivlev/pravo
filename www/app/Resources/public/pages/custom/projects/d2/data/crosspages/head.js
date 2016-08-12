module.exports = {

    blocks: [

        /*
         * Шрифты
         *
         */

        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "http://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&subset=latin,cyrillic-ext"
                }
            }
        },
        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "http://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic"
                }
            }
        },

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
		{
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "/res/styles/custom/projects/d2/index.css"
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
                    { data: "<script src=\"/res/scripts/custom/projects/d2/global.js\"></script>" }
                ]
            }
        }
    ]

};