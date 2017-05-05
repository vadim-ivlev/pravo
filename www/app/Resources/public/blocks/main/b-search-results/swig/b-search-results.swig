<h1 class="b-search-results__title">{[ data.title ]}</h1>
<form class="b-search-results__form js-search-form-results" type="GET" action="javascript:void(null);">
	<input type="text" name="input_text-results" class="b-field__input b-field__input_text">
	<div class="b-search-form__select-wrapper">
		<select class="b-search-form__select js-search-form-select-results" name="input_select-results">
    	    <option value="2">По вопросам</option>
    	    <option value="1">По юристам</option>
    	</select>
    </div>
    <input class="b-btn b-btn_orange" type="submit" value="Найти">
</form>

{{# infiniteScroll.isQuestions}}
	{[ macro.RGBi(blocks.itemsListQuestions, parent) ]}
{{/ infiniteScroll.isQuestions}}
{{# infiniteScroll.isJurists}}
	{[ macro.RGBi(blocks.itemsListJurists, parent) ]}
{{/ infiniteScroll.isJurists}}
{[ macro.RGBi(blocks.loadChain, parent) ]}

{{{ empty_search }}}