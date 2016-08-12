<div class="b-feed__body">

	<h2 class="b-feed__name">
		<span class="b-feed__name_com is-active">
			{% if data.link %}<a class="b-link b-feed__link b-feed__name_com-link" href="{[ data.link ]}">{% endif %}
			{[ data.title ]}
			{% if data.link %}</a>{% endif %}
		</span>
		
		<span class="b-feed__name_reg">
			<a href="#" class="b-link b-feed__link b-feed__name_reg-link"></a>
		</span>
	</h2>
	<div class="b-feed__list b-feed__list_scrolled">

		<div id="lastNewsComm" class="b-feed__list_com">
			{% if data.includes[0] %}
				<!--#include virtual="{[
					data.includes[0]
				]}"-->
			{% endif %}
		</div>
		
		<div id="lastNewsReg" class="b-feed__list_reg"></div>
		
		<div class="b-feed__item b-feed__item_more">
			<a href="/news.html" class="b-link b-link_title">• • •</a>
		</div>
	</div>
	
</div>