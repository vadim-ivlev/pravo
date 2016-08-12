<div class="b-menu__body">
    <div class="b-menu__wrapper">
        <a href="javascript://" class="b-menu__text">МЕНЮ <span></span></a>
        <div class="b-menu__list">

            {% for item in data.list %}
				<a href="{[ item.href ]}" class="b-menu__link">{[ item.title ]}</a>
            {% endfor %}
        </div>

        <div class="b-menu__overlay">
            <div class="b-menu__wrapper">
                <div class="b-menu__list">
                    {% for item in data.list %}
                        <a href="{[ item.href ]}" class="b-menu__link">{[ item.title ]}</a>
                    {% endfor %}
                </div>
                <div id="menu" class="b-header__link b-header__link__right"></div>
            </div>
        </div>
    </div>
</div>