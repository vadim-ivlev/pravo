{{# latest_issues__length}}
<div class="b-feed__body b-feed_gazeta-today b-feed_sidebar b-feed_height-auto">
	
    <h2 class="b-feed__name">
    	Последние выпуски:
    </h2>

    <div class="b-feed__list _hide_date">
        <div class="b-feed__col">
		{{# latest_issues}}
			<div class="b-feed__item">
				<a class="b-link b-link_title" href="{{fascicle__uri}}">
					{{fascicle__short_title}}
					{{# fascicle__name}} - {{fascicle__name}}{{/ fascicle__name}}
					от {{{fascicle__readable_date}}} № {{fascicle__number}}
				</a>
			</div>
		{{/ latest_issues}}
        </div>
    </div>

</div>
{{/ latest_issues__length}}

{{# other_today_fascicles__length}}
<div class="b-feed__body b-feed_gazeta-today b-feed_sidebar b-feed_height-auto">
    <h2 class="b-feed__name">
		{{# today_flag}}
			Сегодня также вышли:
		{{/ today_flag}}
		
		{{^ today_flag}}
			В этот день также вышли:
		{{/ today_flag}}
    </h2>

    <div class="b-feed__list _hide_date">
        <div class="b-feed__col">
		{{# other_today_fascicles}}
			<div class="b-feed__item">
				<a class="b-link b-link_title" href="{{fascicle__uri}}">
					{{fascicle__short_title}}
					{{# fascicle__name}} - {{fascicle__name}}{{/ fascicle__name}}
					от {{{fascicle__readable_date}}} № {{fascicle__number}}
				</a>
			</div>
		{{/ other_today_fascicles}}
        </div>
    </div>

</div>
{{/ other_today_fascicles__length}}