<article class="b-material-wrapper__body">
	
	{{{ text }}}
	
	{{# attachments__length}}
	<!-- аттачменты -->
	<div class="b-material-wrapper__attachments">
		{{# attachments}}
		<div class="b-material-wrapper__attachments__item b-file-icon b-file-icon-img">
			<div class="b-material-wrapper__attachments__item__desc"><a target="_blank" href="{{frontend_uri}}">{{description}}</a></div>
			<div class="b-material-wrapper__attachments__item__meta">({{ext}}, {{ext_uc}}, {{{filesize__readable}}})</div>
		</div>
		{{/ attachments}}
	</div>
	<!-- /аттачменты -->
	{{/ attachments__length}}
	
	{{# continue_threads}}
		{{# continue_threads__objects__before__length}}
			<h2>Начало документа</h2>
			{{# continue_threads__objects__before}}
				<div>
					<a href="{{uri}}">
					{{# link_title}}
						{{{link_title}}}
					{{/ link_title}}
					
					{{^ link_title}}
						{{{title}}}
					{{/ link_title}}
					</a>
				</div>
			{{/ continue_threads__objects__before}}
		{{/ continue_threads__objects__before__length}}
		
		{{# continue_threads__objects__after__length}}
			<h2>Продолжение документа</h2>
			{{# continue_threads__objects__after}}
				<div>
					<a href="{{uri}}">
					{{# link_title}}
						{{{link_title}}}
					{{/ link_title}}
					
					{{^ link_title}}
						{{{title}}}
					{{/ link_title}}
					</a>
				</div>
			{{/ continue_threads__objects__after}}
		{{/ continue_threads__objects__after__length}}
	{{/ continue_threads}}	
	
</article>