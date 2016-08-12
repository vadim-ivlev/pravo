{{# fascicles}}

	{{^ fascicles__FIRST__}}
	<div class="b-list-head">

		<div class="b-list-head__row">
			<!-- заголовок -->
			<h1 class="b-list-head__title">
				{{fascicle__title}}
				
				{{# fascicle__subtitle}}
					: {{fascicle__subtitle}}
				{{/ fascicle__subtitle}}
				
				{{# fascicle__name}}
					&mdash; {{fascicle__name}}
				{{/ fascicle__name}}
			</h1>
			<!-- /заголовок -->
		</div>
		<div class="b-list-head__row">
			<!-- дата и номер -->
			<div class="b-list-head__date">
				<span class="b-list-head__date_item">{{{fascicle__readable_date}}}</span> 
				<span class="b-list-head__date_item">№ {{fascicle__number}}</span>
			</div>
			<!-- /дата и номер -->
		</div>

	</div>
	{{/ fascicles__FIRST__}}

	<div class="b-list-wrapper b-news-inner">
		
		{{# fascicles__broadsides}}
		
			{{# broadside}}
			<div class="b-broadside">Полоса {{broadside}}</div>
			{{/ broadside}}
			
			{{# fascicles__broadsides__sections}}
				
				{{# fascicles__broadsides__sections__latest_objects}}
					
					{{# is_document}}
						
						{[ macro.RGBi(data.newsInnerDoc) ]}

					{{/ is_document}}
					
					{{^ is_document}}
					
						{{# fascicles__broadsides__sections__latest_objects__FIRST__}}
							
							{{#fascicles__broadsides__FIRST__}}

								{[ macro.RGBi(blocks.issuePicture) ]}

							{{/ fascicles__broadsides__FIRST__}}

							<div class="b-news-spiegel">
							
								<div class="b-news__list">

                                   {[ macro.RGBi(data.newsSpiegel) ]}
									
								</div>
								
							</div>

						{{/ fascicles__broadsides__sections__latest_objects__FIRST__}}
						
						{{^ fascicles__broadsides__sections__latest_objects__FIRST__}}

							{[ macro.RGBi(data.newsInner) ]}
						
						{{/ fascicles__broadsides__sections__latest_objects__FIRST__}}
					
					{{/ is_document}}
					
				{{/ fascicles__broadsides__sections__latest_objects}}
				
			{{/ fascicles__broadsides__sections}}
			
		{{/ fascicles__broadsides}}	

	</div>

{{/ fascicles}}