<div class="b-partners__wrapper {{ name ? 'b-partners_' + name : ''}} {{ position ? 'b-partners_' + position : ''}}">
    <div class="b-partners__head">
        <div class="b-partners__logo {{ name ? 'b-partners__logo_' + name : ''}}"></div>
        <div class="b-partners__name">{{headerTitle}}</div>
    </div>
    <div class="b-partners__list">
        {{#posts}}
        <div class="b-partners__item">
            <div class="b-partners__media">
                <a class="b-link" href="{{url}}" target="_blank">
                    <img class="b-partners__img" src="{{img}}">
                </a>
            </div>
            <div class="b-partners__title">
                <a class="b-link" href="{{url}}" target="_blank">{{{title}}}</a>
            </div>
        </div>
        {{/posts}}
    </div>
</div>