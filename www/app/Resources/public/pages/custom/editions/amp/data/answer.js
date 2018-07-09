module.exports = {

    toMerge: {

        meta: {

            blocks: [

				{
					name: "metaCharset",
					opt: {
						tag: "meta",
						attrs: {
							charset: "utf-8"
						}
					}
                },

				{
					name: "metaViewport",
					opt: {
						tag: "meta",
						attrs: {
							name: "viewport",
							content: "width=device-width, minimum-scale=1, initial-scale=1"
						}
					}
                },

                {
                    name: "linkCanonical",
                    opt: {
                        tag: "link",
                        attrs: {
                            rel: "canonical",
                            href: "{{ routes.current__uri }}" // TODO: Replace with **real** canonical link
                        }
                    }
                },

                {
					name: "linkFavicon",
					opt: {
						tag: "link",
						attrs: {
							rel: "icon",
							href: "/favicon.ico"
						}
					}
                },

        		{
        		    name: "linkFont",
        		    opt: {
        		        contents: [
        		            {
        		                data: "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i|Noto+Serif:400,400i,700,700i&amp;subset=cyrillic,cyrillic-ext'>"
                    		}
                		]
            		}
                },

                {
                    name: "indexTitle",
                    opt: {
                        tag: "title",
                        contents: [
                            {
                                data: "{{# questions_item }}{{ title_seo }}{{/ questions_item }} — Юридическая консультация"
                            }
                        ]
                    }
                },

                {
                    name: "indexDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            name: "description",
                            content: "{{# questions_item }}{{ description_seo }}{{/ questions_item }}"
                        }
                    }
                },

                {
                    name: "indexKeywords",
                    opt: {
                        contents: [
                            {
                                data: "{{# questions_item }}{{# keywords }}<meta name='keywords' content='{{ keywords }}'>{{/ keywords }}{{/ questions_item }}"
                            }
                        ]
                    }
                },

                {
                    name: "rubricId",
                    opt: {
                        tag: "meta",
                        attrs: {
                            data: "rg-data",
                            property: "rubric:id",
                            content: "{{# questions_item.rubrics }}{{ rubrics__id }}{{/ questions_item.rubrics }}"
                        }
                    }
                },

        		{
        		    name: "ampScript",
        		    opt: {
        		        contents: [
        		            {
        		                data: "<script async src='https://cdn.ampproject.org/v0.js'></script>"
        		            }
        		        ]
        		    }
                },

                // RGB('editions.amp.style'),

                {
                    name: "ampStyles",
                    opt: {
                        contents: [
                            {
                                styleInline: {
                                    attrs: {
                                        'amp-custom': null
                                    }
                                }
                            }
                        ]
                    }
                },

                {
                    name: "crosspageOgTitle",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:title",
                            content: "{{# questions_item }}{{ title_seo }}{{/ questions_item }} — Юридическая консультация"
                        }
                    }
                },

                {
                    name: "crosspageOgDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:description",
                            content: "{{# questions_item }}{{ description_seo }}{{/ questions_item }}"
                        }
                    }
                },

                {
                    name: "crosspageOgUrl",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:url",
                            content: "{{ routes.current__uri }}"
                        }
                    }
                },

            	{
            		name: "ampBoilerplate",
            		opt: {
            		    contents: [
            		        {
            		            data: "<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>"
                    		}
                		]
            		}
        		},
            ]

        },

        main: {

            blocks: [

                RGB('editions.amp.rg'),
                // RGB('editions.amp.main:answer')

            ]

        },

        _meta: {
            uri: "juristical"
        }
    }

};