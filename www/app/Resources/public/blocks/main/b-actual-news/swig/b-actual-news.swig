<div class="b-actual-news__body">

	<h2 class="b-actual-news__name">
		<a href="{[data.leftSide.link]}">{[data.leftSide.title]}</a>
	</h2>
	<div class="b-actual-news__wrapper">
		<div class="b-actual-news__list b-actual-news__left">
			{% for includes in data.leftSide.includes %}
				{% if includes %}
				
				<!--#loadxml virtual="{[ includes.path ]}" var="{[ includes.xml_var ]}" limit="{[ includes.num ]}" class="related_articles" -->
							
				<!--#echo var="{[ includes.xml_var ]}" -->
				
				{% endif %}
			{% endfor %}
		</div>
		<div class="b-actual-news__list b-actual-news__right">
			{% if data.rightSide.includes[0] %}
				<!--#include virtual="{[
					data.rightSide.includes[0]
				]}"-->
			{% endif %}
			
			{[ macro.RGBi(blocks.yaDirect) ]}
			
			{% if data.rightSide.includes[1] %}
				<!--#include virtual="{[
					data.rightSide.includes[1]
				]}"-->
			{% endif %}
			
		</div>
	</div>
	
</div>