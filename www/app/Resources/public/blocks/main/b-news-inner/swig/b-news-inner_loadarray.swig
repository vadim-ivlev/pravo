<div id="bNewsInnerChain" 
	class="b-list-wrapper b-news-inner__body" 
	data-request-uri="{{# coll_id}}sujet/{{coll_id}}/{{/ coll_id}}{{^ coll_id}}{{# author_uri}}author-{{author_uri}}/{{/ author_uri}}{{^ author_uri}}{{# uri}}{{uri}}{{^ title__is_catalog}}/{{/ title__is_catalog}}{{/ uri}}{{/ author_uri}}{{/ coll_id}}"
	data-request-num="{[ data.num|default('25') ]}"
    data-request-offset="{[ data.offset|default('0') ]}"
    data-request-excludes="<!--#dump_excludes_dataattr -->"
    {% if data.include %} data-request-include="{[ data.include ]}" {% endif %}
    <!--#ifvar var="catalog.articles.size" -->data-request-size="<!--#echo var="catalog.articles.size" -->"<!--#endif -->
    >

    <div class="b-news-inner__list">
        <!--#ifvar var="catalog.{[ data.catalogType | default('articles') ]}" -->
            <!--#joinarray {% if data.catalogAds.show %} chunk="{[ data.catalogAds.chunk | default('6') ]}" incut="{[ data.catalogAds.incut | default('/ssi/blocks/crosslayouts/b-ads/b-ads_direct-horizontal.ssi') ]}" reps="{[ data.catalogAds.reps | default('3') ]}" {% endif %} var="catalog.{[ data.catalogType | default('articles') ]}" -->
        <!--#endif -->
    </div>

    <div class="b-news-inner__action">
        <span class="b-link-btn b-link-btn_second b-btn-subs__btn b-news-inner__action_btn js-add-chain-btn">Загрузить ещё</span>
    </div>

</div>