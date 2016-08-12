module.exports = {
    name: "head",
    blocks: [
        {
            opt: {
                tag: "meta",
                attrs: {
                    charset: "utf-8"
                }
            }
        },
		{
            opt: {
                tag: "meta",
                attrs: {
                    property: "og:site_name",
					content: "Российская газета"
                }
            }
        },
        {
            opt: {
                tag: "meta",
                attrs: {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=no"
                }
            }
        },
        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "shortcut icon",
                    href: "favicon.ico"
                }
            }
        },
        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "//fonts.googleapis.com/css?family=Roboto:300,400,500,700&subset=latin,cyrillic"
                }
            }
        },
        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.min.css"
                }
            }
        },
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
                    href: "/res/styles/custom/projects/kino/lib.css"
                }
            }
        },
        {
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "/res/styles/custom/projects/kino/global.css"
                }
            }
        },
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
                    { data: "{{^ preview}}<script src=\"//yastatic.net/share2/share.js\"></script>{{/ preview}}" }
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
                    { data: "<script src=\"/res/scripts/custom/projects/kino/lib.js\"></script>" }
                ]
            }
        },
        {
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/custom/projects/kino/kino.js\"></script>" }
                ]
            }
        }
    ]
};