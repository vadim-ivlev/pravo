module.exports = {
    name: "footer",
    blocks: [
        /*
		 * Подвал сайта
		 * 
		 */
		
		{
			name: "footer",
			opt: {
				tag: "div",
				contents: [
					{
						path: pathMap.src.blocks + "/custom/projects/kino/footer/page_layout_footer/page_layout_footer.ihtml"
					}
				]
			}
		},
		{
			name: "footerCounter",
			opt: {
				tag: "div",
				contents: [
					{
						//path: pathMap.src.blocks + "/custom/projects/sila/footer/b-counter/b-counter.ihtml"
					},
					{
						//path: pathMap.src.blocks + "/footer/b-counter/b-counter.ihtml"
					}
				]
			}
		},
		// Подвал сайта
    ]
};