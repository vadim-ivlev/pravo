<h1 class="b-search-results__title">{[ data.title ]}</h1>
<!-- <form class="js-search-form" type="GET" action="javscript:void(null);">
	<input type="text" name="input_text" class="b-field__input b-field__input_text b-field__input_text">
	<select class="b-search-form__select js-search-form-select" name="input_select">
            <option value="2">По вопросам</option>
            <option value="1" default>По юристам</option>
        </select>
    </div>
    <input class="b-btn b-btn_orange" type="submit" value="Найти">
</form> -->

	{[ macro.RGBi(blocks.questionsList, parent) ]}
	{[ macro.RGBi(blocks.juristsList, parent) ]}

{{{ empty_search }}}