{[ macro.RGBi(blocks.form, parent) ]}

{% if data %}

	<div class="b__item">
		{% for notice in data.notice %}
			<p class="b__text">{[ notice|raw ]}</p>
		{% endfor %}
	</div>

	{% if data.newsShpiegel %}
	<div class="b-news b-news-spiegel">
	    <div class="b-news__list">
	        <!--#include virtual="{[ data.newsShpiegel.includes ]}"-->
	    </div>
	</div>
	{% endif %}

	{% if data.news %}
	<div class="b-news">
	    <div class="b-news__list">
	        <!--#include virtual="{[ data.news.includes ]}"-->
	    </div>
	</div>
	{% endif %}

	{% if data.inner %}
	<div id="bNewsInnerChain" class="b-news-inner" data-request-uri="{{uri}}" data-request-offset="8" data-request-num="5" data-request-include="sujet-4652" >

	    <div class="b-news-inner__list">
	        <!--#include virtual="{[ data.inner.includes ]}"-->
	    </div>

	    <div class="b-news-inner__action">
	        <a class="b-link-btn b-link-btn_second b-btn-subs__btn b-news-inner__action_btn js-add-chain-btn">Загрузить ещё</a>
	    </div>

	</div>
	{% endif %}

{% else %}

	<div class="b-list-wrapper b-news-inner">
	    {{{text}}}
	</div>

{% endif %}