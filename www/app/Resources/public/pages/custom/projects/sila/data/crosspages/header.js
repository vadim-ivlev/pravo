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
						path: pathMap.src.blocks + "/custom/projects/sila/header/b-header/b-header.ihtml"
					}
				]
			}
		},
		// Шапка сайта
    ]
};