
<div class="b__subtitle">Медиацентр</div>

{% if data.tabs %}

    <div class="b-rubricator-menu group">

        <div class="b-rubricator-menu__list">

            {% for tabs in data.tabs %}

                <div data-mod="{[ tabs.mod ]}" class="b-rubricator-menu__item is-tab {% if loop.first %}b-rubricator-menu__item_active{% endif %}">{[ tabs.title ]}</div>

            {% endfor %}

        </div>

    </div>

{% endif %}

    <div data-mod="{[ data.main.mod ]}" class="b__wrapper is-main-page is-page-reveal group">
        <div class="b__wrapper is-slider-text-wrapper">
            <div class="b__row group is-sliders">
                <div class="b__col is-main-slider">

                    {% for main in data.main.gallery.main %}

                        <div class="b__item">
                            <div class="b__media">
                                <img src="/res/images/custom/statics/press_center/{[ main ]}.jpg" alt="" class="b__img">
                            </div>
                        </div>

                    {% endfor %}

                </div>
                <div class="b__col is-side-slider">

                    {% for side in data.main.gallery.side %}

                        <div class="b__item">
                            <div class="b__media">
                                <img src="/res/images/custom/statics/press_center/{[ side.img ]}.jpg" alt="" class="b__img">
                            </div>
                            <div class="b__title">{[ side.title ]}</div>
                            <div class="b__text">{[ side.description ]}</div>
                        </div>

                    {% endfor %}

                </div>
            </div>
            <div class="b__row is-main-text group">
                <div class="b__col is-text">
                    {% for text in data.main.text %}
                        <div class="b__text">{[ text ]}</div>
                    {% endfor %}
                </div>
                <div class="b__col is-contacts group">{[ macro.RGBi(blocks.contacts, parent) ]}</div>
            </div>
            <div class="b__row is-main-articles">
                <div class="b-news">
                    <div class="b-news__list">
                        <!--#include virtual="{[ data.main.mainArticles.news.includes ]}"-->
                    </div>
                </div>
            </div>
        </div>

        <div class="b__row is-main-text-second group">
            <div class="b__col is-text">
                {% for text in data.main.text %}
                    <div class="b__text">{[ text ]}</div>
                {% endfor %}
            </div>
            <div class="b__col is-contacts group">{[ macro.RGBi(blocks.contacts, parent) ]}</div>
            <div class="b__row is-main-articles-second">
                <div class="b-news">
                    <div class="b-news__list">
                        <!--#include virtual="{[ data.main.mainArticles.news.includes ]}"-->
                    </div>
                </div>
            </div>
        </div>

        <div class="b__row is-form-feed">
            <div class="b__col is-form-container is-form-active">
                <div class="b__wrapper">{[ macro.RGBi(blocks.form, parent) ]}</div>
            </div>
            <div class="b__col is-feed-container">{[ macro.RGBi(blocks.feed, parent) ]}</div>
        </div>
    </div>

{% for halls in data.halls %}

    <div data-mod="{[ halls.mod ]}" class="b__wrapper is-page-reveal group">
        <div class="b__row is-main group">
            <div class="b__col is-gallery">

                <div class="b-gallery__body">

                    <div class="b-gallery__fotorama fotorama b-gallery__linked_slide" data-thumbmargin="4" data-nav="thumbs" data-arrows="true" data-loop="true">
                        {% for images in halls.gallery.images %}
                            <a class="b-gallery__link" href="/res/images/custom/statics/press_center/{[ images.filename ]}.jpg" data-fit="contain" data-thumbfit="cover">
                                <img class="b-gallery__image" src="/res/images/custom/statics/press_center/{[ images.filename ]}.jpg">
                            </a>
                        {% endfor %}
                    </div>

                </div>

            </div>
            <div class="b__col is-description">

                {% for description in halls.description %}

                    <div class="b__title">{[ description.title ]}</div>

                    {% if description.text %}

                        {% for text in description.text %}

                            <div class="b__text">{[ text ]}</div>

                        {% endfor %}

                    {% endif %}

                    {% if description.list %}

                        {% for list in description.list %}

                            <div class="b-ul">

                                <div class="b-ul__list">

                                    {% for item in list.item %}

                                        <div class="b-ul__item">{[ item ]}</div>

                                    {% endfor %}

                                </div>

                            </div>

                        {% endfor %}

                    {% endif %}

                {% endfor %}
            </div>
        </div>
        <div class="b__row is-events">
            <div class="b__title">{[ halls.title ]}</div>
            <div class="b__col">
                <div data-tmpl="/res/templates/b-news.html" class="liveReload" data-iterator="." data-delay="0" data-json="http://outer.rg.ru/plain/media_center/events/?event={[ halls.template ]}"></div>
            </div>
            <div class="b__col is-form-container"></div>
        </div>
    </div>

{% endfor %}

    <div data-mod="{[ data.price.table.mod ]}" class="b-wrapper is-page-reveal group">
        <div class="b__col is-table-wrapper group">

            <div class="b__wrapper is-table group">

                <div class="b__title">{[ data.price.table.title ]}</div>

                <div class="b__wrapper">

                    {% for item in data.price.table.item %}

                        <div class="b__wrapper is-table-item" data-value="{[ item.data ]}">

                            {% for unit in item.unit %}

                                <div class="b__item group is-table-unit">

                                    {% for col in unit.col %}

                                        <div class="b__row group is-table-row">

                                            {% if col.left %}

                                                <div class="b__col is-table-col-left">{[ col.left|raw ]}</div>

                                            {% endif %}

                                            <div class="b__col is-table-col-right">

                                                {% if col.center %}

                                                    <div class="b__col is-table-col-center">{[ col.center|raw ]}</div>

                                                {% endif %}

                                                {% if col.right %}

                                                    <div class="b__col">{[ col.right|raw ]}</div>

                                                {% endif %}

                                            </div>
                                        </div>

                                    {% endfor %}

                                </div>

                            {% endfor %}

                        </div>

                    {% endfor %}

                </div>

                {% for meta in data.price.table.meta %}

                    <div class="b__text">{[ meta|raw ]}</div>

                {% endfor %}

            </div>
        </div>
        <div class="b__col is-contacts-container group">
            <div class="b__col is-form-container group"></div>
            <div class="b__col is-contacts group">{[ macro.RGBi(blocks.contacts, parent) ]}</div>
        </div>


    </div>

    {% for reportAnnounce in data.reportAnnounce %}

        <div data-mod="{[ reportAnnounce.mod ]}" class="b__wrapper  is-page-reveal group">

            <div class="b__wrapper is-news-wrapper group">
                
                {% if reportAnnounce.news %}

                    <div class="b-news">
                        <div class="b-news__list">
                            <!--#include virtual="{[ reportAnnounce.news.includes ]}"-->
                        </div>
                    </div>

                {% endif %}

                {% if reportAnnounce.inner %}

                    <div id="{[ reportAnnounce.id ]}" class="b-news-inner" data-request-uri="{{uri}}"  data-offset="6" data-request-include="sujet-{[ reportAnnounce.sujet ]}" data-request-num="6" >

                        <div class="b-news-inner__list">

                        </div>

                        <div class="b-news-inner__action">
                            <a class="b-link-btn b-link-btn_second b-btn-subs__btn b-news-inner__action_btn js-add-chain-btn">Загрузить ещё</a>
                        </div>

                    </div>

                {% endif %}  

            </div>

            <div class="b__col is-contacts-container group">
                <div class="b__col is-form-container group"></div>
                <div class="b__col is-contacts group">{[ macro.RGBi(blocks.contacts, parent) ]}</div>
            </div>

        </div>

    {% endfor %}
