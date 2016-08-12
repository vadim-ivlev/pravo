{{# fascicles}}
	{{# fascicles__FIRST__}}
	<div class="b-list-head__body">

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
		<div class="b-list-head__row group">
			<!-- дата и номер -->
			<div class="b-list-head__date">
				<span class="b-list-head__date_item">{{{fascicle__readable_date}}}</span> 
				<span class="b-list-head__date_item">№ {{fascicle__number}}</span>
			</div>
			<!-- /дата и номер -->

			{{# fascicle__pdf__uri}}
			<div class="b-list-head__download">
				<a class="b-link b-link_inner b-file-icon b-file-icon-pdf" target="_blank" href="{{fascicle__pdf__uri}}">Скачать PDF</a>
				<span class="b-list-head__download__size">{{{fascicle__pdf__filesize}}}</span>
			</div>
			{{/ fascicle__pdf__uri}}
		</div>
	</div>
	{{/ fascicles__FIRST__}}
{{/ fascicles}}