<div class="b-material-meta__body">
	
	{{# readable_date_of_signing}}
		<div class="b-material-meta__item">{[ data.meta.date_of_signing.title ]} {{{readable_date_of_signing}}}</div>
	{{/ readable_date_of_signing}}

	{{^ readable_date_of_signing}}
		{{# effective_when_published}}
			{{# readable_publishing_date}}
			<div class="b-material-meta__item">{[ data.meta.publishing_date.title ]} {{{readable_publishing_date}}}</div>
			{{/ readable_publishing_date}}
		{{/ effective_when_published}}
		
		{{^ effective_when_published}}
			{{# readable_effective_date}}
				<div class="b-material-meta__item">{[ data.meta.effective_date.title ]} {{{readable_effective_date}}}</div>
			{{/ readable_effective_date}}
		{{/ effective_when_published}}
	{{/ readable_date_of_signing}}
	
	<div class="b-material-meta__item">{[ data.meta.release.title ]} {{{readable_release_date}}}</div>
	
</div>