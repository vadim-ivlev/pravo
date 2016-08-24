<h3 class="b-news-rubric__title">
	<a href="#" class="b-link b-link_blue">Юридическая консультация</h3>
<div class="b-news-rubric__content" style="width: 990px;">
	<div class="b-news-rubric__item">

		{{# questions_list }}
        	<div class="b-question-block">
            	<div class="b-question-block__body">

                	{{# questions__head }}

                    	<div class="b-material-head">
                            
                        	{{# questions__head__author }}
                            	<span class="b-question-block__author">{{ questions__head__author__name }}{{# questions__head__author__location }} ({{ questions__head__author__location }}){{/ questions__head__author__location }}</span>
                        	{{/ questions__head__author }}

                    	</div>

                	{{/ questions__head}}

                	<a class="b-link">
                    	<div class="b-question-block__title b-link b-link_title">{{ title }}</div>
                    	<div class="b-question-block__text">{{ text }}</div>
                	</a>
                	<div class="b-question-block__tags">

                    	{{# tags__length }}

                        	{{# tags}}
                            	<a href="{{ tags__link }}" class="b-link b-link_tag">{{ tags__title }}</a>{{^ tags__LAST__ }},{{/ tags__LAST__ }}
                        	{{/ tags }}

                    	{{/ tags__length }}

                	</div>
            	</div>

            	{{# jurist }}
                	<div class="b-question-block__bottom">
                    	Отвечает

                    	{{# jurist__active }}
                        	<a href="{{ jurist__link }}" class="b-question-block__reply-link b-link b-link_blue">

                            	{{# jurist__img__length }}

                                	{{# jurist__img}}

                                    	{{# jurist__img__type_medium }}
                                        	<img src="{{ jurist__img__file }}" alt="{{ jurist__img__title }}" width="17" height="17" class="b-round-image">
                                    	{{/ jurist__img__type_medium }}

                                	{{/ jurist__img}}

                            	{{/ jurist__img__length }}

                            	{{# jurist}}

                                	{{ jurist__first_name }} {{ jurist__last_name }}

                            	{{/ jurist }}

                        	</a>
                    	{{/ jurist__active }}

                    	{{^ jurist__active }}
                        	<span class="b-question-block__reply-link">

                            	{{# jurist__img__length }}

                                	{{# jurist__img}}

                                    	{{# jurist__img__type_medium }}
                                        	<img src="{{ jurist__img__file }}" alt="{{ jurist__img__title }}" width="17" height="17" class="b-round-image">
                                    	{{/ jurist__img__type_medium }}

                                	{{/ jurist__img}}

                            	{{/ jurist__img__length }}

                            	{{# jurist}}

                                	{{ jurist__first_name }} {{ jurist__last_name }}

                            	{{/ jurist }}

                        	</span>

                    	{{/ jurist__active }}
                                    
                	</div>

            	{{/ jurist}}

    		</div>
       	{{/ questions_list }}
		
	</div>
	<div class="b-news-rubric__list">

		{{# questions_latest }}
			<div class="b-news-rubric__list-item">
				<div class="b-question-block b-question-block_latest">
					<div class="b-question-block__body">

						{{# rubrics}}
                           	<a href="{{ rubrics__link }}" class="b-link b-link_blue">{{ rubrics__title }}</a>
                       	{{/ rubrics}}

                       	<a class="b-link b-link_block" href="{{ link }}">
                           	<div class="b-question-block__title b-link b-link_title b-link_latest">{{ title }}</div>
                       	</a>
					</div>
				</div>
			</div>
		{{/ questions_latest }}

	</div>
</div>