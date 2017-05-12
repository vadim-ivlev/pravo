{{# infiniteScroll.isSearch}}
	<div id="loadChain" data-uri="{{routes.current__uri}}" data-limit="{{infiniteScroll.limit}}" data-offset="{{infiniteScroll.offset}}" data-value="{{infiniteScroll.index}}" data-search="{{infiniteScroll.isSearch}}" data-count="{{infiniteScroll.count_records}}"></div>
{{/ infiniteScroll.isSearch}}

{{^ infiniteScroll.isSearch}}
	<div id="loadChain" data-request-uri="{{requestUri}}" data-limit="{{infiniteScroll.limit}}" data-offset="{{infiniteScroll.offset}}" data-count="{{infiniteScroll.count_records}}"></div>
{{/ infiniteScroll.isSearch}}