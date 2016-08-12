module.exports = {

    blocks: [

        RGInclude('modules/Fonts', 'scripts inline'),

        RGB('projects.lada.builder:project'),

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
                    href: "/res/styles/custom/projects/lada/index.css"
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
                    { data: "<script src=\"/res/scripts/project.js\"></script>" }
                ]
            }
        },
		{
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/custom/projects/lada/global.js\"></script>" }
                ]
            }
        }
    ]

};