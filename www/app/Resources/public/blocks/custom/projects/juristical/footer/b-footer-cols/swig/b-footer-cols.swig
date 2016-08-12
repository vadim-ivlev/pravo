<div class="b-footer-cols__row has-1">

	<div class="b-footer-cols__item">

		<div>

			<b>{[data.publisher.info|safe]}</b>

		</div>

		<a class="b-link b-link_inner" href="mailto:{[data.publisher.email]}">{[data.publisher.email]}</a>

	</div>

	<div class="b-footer-cols__item b-footer-cols__item_middle">

		<div>

			<b>{[data.contact.info]}</b>

		</div>

		{[data.contact.phone_numbers|safe]}
		<a class="b-link b-link_inner" href="mailto:{[data.contact.email]}">{[data.contact.email]}</a>

	</div>

	<div class="b-footer-cols__item">

		<div>

			<b>Адрес</b>

		</div>

		{[data.location.address|safe]}.
		<a id="openKartaProezda" class="b-link b-link_inner" href="{[data.location.map_link]}">Посмотреть карту проезда</a>

	</div>

</div>


<div class="b-footer-cols__row has-2">

    <div class="b-footer__copyright-info">

		{{{ copyright__info }}}

		<div class="b-footer__copyright-text">
			{[ data.copyright.text|safe ]}
        </div>

    </div>
    
</div>