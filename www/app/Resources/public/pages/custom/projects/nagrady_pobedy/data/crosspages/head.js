module.exports = {

    blocks: [

        RGInclude('modules/Fonts', 'scripts inline'),

        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "http://fonts.googleapis.com/css?family=Roboto:400,400italic,300,300italic,700,700italic&subset=latin,cyrillic"
                }
            }
        },
		{
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,300italic,400italic,700,700italic&subset=latin,cyrillic"
                }
            }
        },
        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "/res/styles/custom/projects/nagrady_pobedy/infograph.css"
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
                    { data: "<script src=\"/res/scripts/lib.js\"></script>" }
                ]
            }
        },
        {
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/custom/projects/nagrady_pobedy/global.js\"></script>" }
                ]
            }
        }
    ]

};