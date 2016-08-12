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
		                blocks: [							
							
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
		                            		opt: {
			                            		contents: [
			                            			{
	                                                	path: pathMap.src.blocks + "/custom/projects/sila/main/b-main/b-main.ihtml"
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
			uri: "sila.article"
		}
	},

	
	toMap: {}

};