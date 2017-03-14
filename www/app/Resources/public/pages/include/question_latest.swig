{{# questions }}
	<div class="b-question-block__body">
	    {{# rubrics}}
	        <a href="{{ rubrics__link }}" class="b-link b-link_blue">{{ rubrics__title }}</a>
	    {{/ rubrics}}
	    <a class="b-link b-link_block" href="{{ link }}">
	        <div class="b-question-block__title b-link b-link_title b-link_latest">{{{  title }}}</div>
	    </a>
	</div>
{{/ questions }}