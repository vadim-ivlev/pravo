module.exports = {
    name: "head",
    blocks: [
        {
            name: "crosspageMetaCharset",
            opt: {
                tag: "meta",
                attrs: {
                    charset: "utf-8"
                }
            }
        },
		{
            name: "crosspageOgSiteName",
            opt: {
                tag: "meta",
                attrs: {
                    property: "og:site_name",
					content: "Российская газета"
                }
            }
        },
        {
            name: "crosspageMetaViewport",
            opt: {
                tag: "meta",
                attrs: {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=no"
                }
            }
        },
        {
            name: "crosspageMetaFavicon",
            opt: {
                tag: "link",
                attrs: {
                    rel: "shortcut icon",
                    href: "favicon.ico"
                }
            }
        },
        {
            name: "crosspageGoogleFontsNotoSansFont",
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "//fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&subset=latin,cyrillic"
                }
            }
        },
        {
            name: "crosspageGoogleFontsNotoSerifFont",
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "//fonts.googleapis.com/css?family=Noto+Serif:400,700,400italic,700italic&subset=latin,cyrillic"
                }
            }
        },
		{
            name: "crosspageRgSila",
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "/res/styles/custom/projects/sila/lib.css"
                }
            }
        },
        {
            name: "crosspageRgSila",
            opt: {
                tag: "link",
                attrs: {
                    rel: "stylesheet",
                    href: "/res/styles/custom/projects/sila/global.css"
                }
            }
        },
        {
            name: "crosspageJquery",
            opt: {
                contents: [
                    { data: "<script src=\"//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js\"></script>" }
                ]
            }
        },
		{
            name: "crosspageShare",
            opt: {
                contents: [
                    { data: "{{^ preview}}<script src=\"//yandex.st/share/share.js\"></script>{{/ preview}}" }
                ]
            }
        },
        {
            name: "crosspageLib",
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/lib.js\"></script>" }
                ]
            }
        },
        {
            name: "crosspageGlobal",
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/global.js\"></script>" }
                ]
            }
        },
		{
            name: "crosspageLib",
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/custom/projects/sila/lib.js\"></script>" }
                ]
            }
        },
		{
            name: "crosspageScript",
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/custom/projects/sila/script.js\"></script>" }
                ]
            }
        },
		{
            name: "crosspageScriptArticle",
            opt: {
                contents: [
                    { data: "<script src=\"/res/scripts/custom/projects/sila/script_article.js\"></script>" }
                ]
            }
        },
		{
            name: "crosspageGetTime",
            opt: {
                contents: [
                    { data: "<script>var _sf_startpt=(new Date()).getTime()</script>" }
                ]
            }
        },
		{
            name: "crosspageJqueryCookie",
            opt: {
                contents: [
                    { data: "<script src=\"//yandex.st/jquery/cookie/1.0/jquery.cookie.min.js\"></script>" }
                ]
            }
        },
		{
            name: "crosspageVkShare",
            opt: {
                contents: [
                    { data: "{{^ preview}}<script src=\"//vkontakte.ru/js/api/share.js?10\"></script>{{/ preview}}" }
                ]
            }
        },
		{
            name: "crosspageLessIe8",
            opt: {
                contents: [
                    { data: "<script type=\"text/javascript\">var lessIe8 = false;</script>" }
                ]
            }
        },
		{
            name: "crosspageLessIe8",
            opt: {
                contents: [
                    { data: "<!--[if lt IE 8]><script type=\"text/javascript\">lessIe8 = true;</script><![endif]-->  " }
                ]
            }
        },
		{
            name: "crosspageRelap",
            opt: {
                contents: [
                    { data: "{{^ preview}}<script asyn src=\"//relap.io/api/v6/head.js?token=G2Mb6m7qfYB93XRx\" type=\"text/javascript\"></script>{{/ preview}}" }
                ]
            }
        },
		{
            name: "crosspageProjectVar",
            opt: {
                contents: [
                    { data: "<script type=\"text/javascript\">var project_url = '//sila.rg.ru';var project_id_str = 'sila';</script>" }
                ]
            }
        },
    ]
};