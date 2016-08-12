module.exports = {

	toMerge: {


		/*
		 * Кастомная метаинформация для шаблона типа article
		 *
		 */

		head: {
			name: "head",
			 blocks: [

				RGT('article.meta'), // метаинформация
				
				RGT('article.ads'), // метаинформация для рекламы
				
                {
                    opt: {
                        tag: "meta",
                        attrs: {
                            name: "rg-data",
                            property: "env",
                            content: "{{env}}"
                        }
                    }
                },

				{
		            opt: {
		                contents: [
		                    { data: "<script src=\"/res/scripts/material.js\"></script>" }
		                ]
		            }
		        },

			]

    	},


		/*
		 * Основной блок контента
		 *
		 */

		main: {
			name: "main",

			/*
			 * Элементы основного контента
			 *
			 */

		    blocks: [

		        {
            		name: "articleMetaTop",
            		opt: {
                		contents: [
                			{
                            	path: pathMap.src.blocks + "/custom/projects/kino/main/article-main__vote-soc/article-main__vote-soc.ihtml"
                        	}
                        ]
                    }
		        },

		        {
            		name: "articleHeading",
            		opt: {
                		contents: [
                			{
                            	path: pathMap.src.blocks + "/custom/projects/kino/main/article-main__heading/article-main__heading.ihtml"
                        	}
                        ]
                    }
		        },

		        {
            		name: "articleMainWrapper",
            		opt: {
                		contents: [
                			{
                            	path: pathMap.src.blocks + "/custom/projects/kino/main/article-main-wrapper/article-main-wrapper.ihtml"
                        	}
                        ]
                    }
		        },

				RGB('ads:under-materials'), // баннер

				RGB('yadirect:under-materials'), // Яндекс-директ

		        {
            		name: "articleMetaBottom",
            		opt: {
                		contents: [
                			{
                            	path: pathMap.src.blocks + "/custom/projects/kino/main/article-main__vote-soc/article-main__vote-soc.ihtml"
                        	}
                        ]
                    }
		        }

		    ]
		    // Элементы основного контента @main

		},
		// Основной блок контента

		/*
		 * Метаинформация
		 *
		 */

		_meta: {
			// Обозначаем URI
			uri: "kino.article"
		}
	},


	toMap: {}

};