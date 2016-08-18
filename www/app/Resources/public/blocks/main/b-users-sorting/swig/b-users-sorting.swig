<div class="b-field b-field_select">
	<div class="b-field__wrapper b-field__wrapper_inline">
		<form>
			<label>
				<select class="b-field__select b-users-sorting__select" id="order_by">
                    {{# filters__for__jurists }}
                        <option value="{{ filters__for__jurists__values }}" {{ filters__for__jurists__current }}>{{ filters__for__jurists__name }}</option>
                    {{/ filters__for__jurists }}
				</select>
			</label>
		</form>
	</div>
</div>