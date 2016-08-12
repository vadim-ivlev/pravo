module.exports = {
    name: "head",
    blocks: [
        /*
		 * Шапка сайта
		 * 
		 */
		
		{
			name: "header",
			opt: {
				tag: "div",
				contents: [
					{
						path: pathMap.src.blocks + "/custom/projects/kino/header/page_layout_header/page_layout_header.ihtml"
					}
				]
			}
		},
		// Шапка сайта
    ]
};