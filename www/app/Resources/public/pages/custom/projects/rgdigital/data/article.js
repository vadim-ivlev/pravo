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
		        }
				
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
		            name: "mainContent",
		            opt: {
		                tag: "div",
		                attrs: {
		                    "class": "l-main__content l-main-content"
		                },
		                blocks: [

		                    /*
							 * Левый сайтбар
							 * Элемент лейаут обертки
							 * 
							 */
							
		                    {
		                        name: "mainContentItemAside",
		                        opt: {
		                            tag: "div",
		                            attrs: {
		                                "class": "l-main-content__item l-aside is-desktop"
		                            },
		                            blocks: [

		                            	/*
										 * Элемент лейаут сайтбара
										 * 
										 */
										
		                                {
											name: "mainSidebarLeft",
											opt: {
												tag: "div",
												contents: [
													{
														path: pathMap.src.blocks + "/custom/projects/rgdigital/sidebar/b-sidebar-left/b-sidebar-left.ihtml",
													}
												]
											}
										},
		                            ]
		                        }
		                    },
		                    // Левый сайтбар
							
							/*
							 * Центральный блок
							 * 
							 */
							
		                    {
		                        name: "mainContentItemMain",
		                        opt: {
		                            tag: "div",
		                            blocks: [

		                            	{
		                            		name: "bFastAccess",
		                            		opt: {
			                            		contents: [
			                            			{
	                                                	path: pathMap.src.blocks + "/custom/projects/rgdigital/main/b-main/b-main.ihtml"
	                                            	}
	                                            ]
	                                        }
		                            	},
		                            ]
		                            // Контент центрального блока
		                        }
		                    },
		                    // Центральный блок
							
		                ]
		                // Основной контент @mainContent
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
			uri: "digital.article"
		}
	},

	
	toMap: {}

};