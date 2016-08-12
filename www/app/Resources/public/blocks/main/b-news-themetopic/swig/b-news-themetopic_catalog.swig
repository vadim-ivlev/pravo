{{# block__themetopic}}
	{{# block__themetopic__FIRST__}}
	<div class="b-news-themetopic__body">
		<div class="b-news-themetopic__item">

			<div class="b-news-themetopic__item__info">
				<div class="b-news-themetopic__item__info__title">
					<a class="b-link" href="{{uri}}">{{title}}</a>
				</div>
				
				{{! block__themetopic__images_300x200__length}}
				<!--<div class="b-news-themetopic__item__info__image">
					<a class="b-link" href="{{uri}}">
						{{# block__themetopic__images_300x200}}
							<img class="b-news-themetopic__item__info__image__src" alt="{{source}}" title="{{source}}" src="{{uri}}">
						{{/ block__themetopic__images_300x200}}
					</a>
				</div>-->
				{{! block__themetopic__images_300x200__length}}
				
			</div>

			<div class="b-feed b-news-themetopic__item__feed">
				<!--#include virtual="{[ data.includes[0] ]}"-->
			</div>

			<div class="b-news-themetopic__item__all-material">
				<a class="b-link b-link_blue" href="{{uri}}">Все новости сюжета</a>
			</div>
			
		</div>
	</div>
	{{/ block__themetopic__FIRST__}}
{{/ block__themetopic}}