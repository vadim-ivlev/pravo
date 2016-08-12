<div class="b-field b-field_select">
    <span class="b-field__label b-field__label_bold">Специализация</span>
    <div class="b-field__wrapper b-field__wrapper_inline">
        <form>
            <label>
                <select class="b-field__select b-field__select_select js-user-specialization" id="user-specialization">
                    {{# rubrics__conditions }}
                        <option value="{{ rubrics__conditions__url }}" {{ rubrics__conditions__current_id }}>{{ rubrics__conditions__name }}</option>
                    {{/ rubrics__conditions }}
                </select>
            </label>
        </form>
    </div>
</div>