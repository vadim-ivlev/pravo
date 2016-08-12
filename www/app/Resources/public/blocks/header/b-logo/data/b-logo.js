module.exports = {
	org: {
		opt: {
			tag: "div",
			attrs: {
				"itemprop": "publisher"
			},
			
			blocks: [
				{
					opt: {
						tag: "div",
						attrs: {
							"itemscope": "",
							"itemtype": "http://schema.org/Organization"
						},

						blocks: [
							{
								opt: {
									tag: "a",
									attrs: {
										"class": "b-logo__image",
										"href": "/",
										"title": "Российская газета"
									}
								}
							},
							{
								opt: {
									tag: "meta",
									attrs: {
										"itemprop": "name",
										"content": "Российская газета"
									}
								}
							},
							{
								opt: {
									tag: "meta",
									attrs: {
										"itemprop": "telephone",
										"content": "+7 495 775-31-13"
									}
								}
							},
							{
								opt: {
									tag: "meta",
									attrs: {
										"itemprop": "faxNumber",
										"content": "+7 499 257-58-92"
									}
								}
							},
							{
								opt: {
									tag: "meta",
									attrs: {
										"itemprop": "email",
										"content": "web@rg.ru"
									}
								}
							},
							{
								opt: {
									tag: "span",
									attrs: {
										"itemprop": "address",
										"itemscope": "",
										"itemtype": "http://schema.org/PostalAddress"
									},

									blocks: [
										{
											opt: {
												tag: "meta",
												attrs: {
													"itemprop": "streetAddress",
													"content": "Правды, 24"
												}
											}
										},
										{
											opt: {
												tag: "meta",
												attrs: {
													"itemprop": "postalCode",
													"content": "125993"
												}
											}
										},
										{
											opt: {
												tag: "meta",
												attrs: {
													"itemprop": "addressLocality",
													"content": "Москва"
												}
											}
										}
									]
								}
							}
						]
					}
				}
			]
			
		}
	}
};