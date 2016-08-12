<div class="b-feed__body">
	<h2 class="b-feed__name">
		{[ data.title ]}
	</h2>

	<div class="b-feed__list _hide_date">
		<div class="b-feed__col">
		{{# parents__maindocs}}
			<div class="b-feed__item">
				<a class="b-link b-link_title" href="{{uri}}">
					{{# ltitle}}
						{{{ltitle}}}
					{{/ ltitle}}
					
					{{^ ltitle}}
						{{{title}}}
					{{/ ltitle}}
				</a>
			</div>
		{{/ parents__maindocs}}
		</div>
	</div>
</div>