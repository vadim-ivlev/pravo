<div class="b-menu__section">
    {[ macro.RGBi(blocks.tabs) ]}
</div>
<div class="b-menu__section b-menu__section_right">
    {#<div class="b-search">#}
        {#<a href="" class="b-icon b-icon_type_search" title="Поиск по сайту"></a>#}
    {#</div>#}
    {# <div id="menu" class="b-search"></div> #}
    <div id="js-mobile-menu" class="b-hamburger" title="Меню">
    	<div class="b-hamburger__line"></div>
    	<div class="b-hamburger__line"></div>
    	<div class="b-hamburger__line"></div>
	</div>
    <a href="{{# routes }}{{ ask__route }}{{/ routes }}" class="b-btn b-btn_orange b-btn_ask">
        <span class="b-btn_ask-big">Задать вопрос</span>
        <span class="b-btn_ask-phones"></span>
    </a>
</div>