<div class="b-tabs__body b-tabs__body_static">
	{[ macro.RGBi(blocks.rgLink) ]}
    {{# header }}
        {{# tabs }}
            <a href="{{ tabs__link }}" class="b-link b-tabs__link b-tabs__item{{# tabs__active }} is-active{{/ tabs__active }}">{{ tabs__name }}</a>
        {{/ tabs }}
    {{/ header }}
</div>