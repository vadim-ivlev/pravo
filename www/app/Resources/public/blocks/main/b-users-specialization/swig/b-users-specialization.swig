<div class="b-field b-field_select">
    <div class="b-field__wrapper b-field__wrapper_inline">
        <form>
            <label>
                <select class="b-field__select b-field__select_select b-users-specialization__select js-user-specialization" id="rubrics_conditions">
                    {{# rubrics__conditions }}
                        <option value="{{ rubrics__conditions__id }}" {{ rubrics__conditions__current_id }}>{{ rubrics__conditions__name }}</option>
                    {{/ rubrics__conditions }}
                </select>
            </label>
        </form>
    </div>
</div>