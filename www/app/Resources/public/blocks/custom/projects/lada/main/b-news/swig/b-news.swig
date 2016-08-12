{% if data.name %}
	<div class="b-news__name">{[ data.name ]}</div>
{% endif %}

<div class="b-news__body b-news-spiegel">
    <div class="b-news__list">
		<!--#echo var="spiegel_top" -->
    </div>
</div>

<div id="bNewsChain" class="b-news__body" data-request-uri="{{# uri}}{{uri}}/{{/ uri}}" data-request-offset="6" data-request-num="4" <!--#ifvar var="catalog.articles.size" -->data-request-size="<!--#echo var="catalog.articles.size" -->"<!--#endif -->>

	<div class="b-news__list">
		<!--#ifvar var="catalog.articles"-->
			<!--#joinarray var="catalog.articles"-->
		<!--#endif-->
	</div>

	<div class="b-news__action">
	    <a class="b-link-btn b-link-btn_second b-btn-subs__btn b-news__action_btn js-add-chain-btn">Загрузить ещё</a>
	</div>

</div>