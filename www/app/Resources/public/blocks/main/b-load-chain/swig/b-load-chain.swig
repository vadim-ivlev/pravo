{{# infiniteScroll.isSearch}}
	<div id="loadChain" data-uri="{{routes.current__uri}}" data-limit="{{infiniteScroll.limit}}" data-offset="{{infiniteScroll.offset}}" data-value="{{infiniteScroll.index}}" data-search="{{infiniteScroll.isSearch}}"></div>
{{/ infiniteScroll.isSearch}}

{{^ infiniteScroll.isSearch}}
	<div id="loadChain" data-request-uri="{{requestUri}}" data-limit="{{infiniteScroll.limit}}" data-offset="{{infiniteScroll.offset}}"></div>
{{/ infiniteScroll.isSearch}}