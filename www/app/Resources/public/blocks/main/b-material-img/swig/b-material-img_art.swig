<div itemprop="image" itemscope itemtype="http://schema.org/ImageObject">

	{{# images_type__default}}

        {{# images_type__default__FIRST__}}

            <img itemprop="contentUrl" alt="{{# title}}{{title}}{{/ title}}{{# source}} Фото: {{source}}{{/ source}}" title="{{# title}}{{title}}{{/ title}}{{# source}} Фото: {{source}}{{/ source}}" src="{{uri}}" class="b-material-img__img" />
			
			<meta itemprop="width" content="{{width}}">
			<meta itemprop="height" content="{{height}}">
			
			<div class="b-material-img__title">
				{{# title}}
					<span itemprop="name">{{title}}</span>
				{{/ title}}
				
				{{# source}}
					Фото: <span itemprop="author">{{source}}</span>
				{{/ source}}
			</div>
			
        {{/ images_type__default__FIRST__}}

	{{/ images_type__default}}
	
</div>