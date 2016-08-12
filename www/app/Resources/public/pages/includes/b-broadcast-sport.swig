{{# sport}}
	{{# broadcast__length}}
	<div data-completed="{{broadcast__completed}}" data-id="{{broadcast__id}}" class="b-broadcast-sport">
		{{# broadcast}}
		<div class="b-broadcast-sport__wrapper">
			
			<!-- основная информация -->
			<div class="b-broadcast-sport__info">
				
				<div class="b-broadcast-sport__info__row b-broadcast-sport__info__row_rival{{# is_biathlon}} biathlon{{/ is_biathlon}}">
					
					<div class="b-broadcast-sport__info__row__status {{^ broadcast__completed}}is-active{{/ broadcast__completed}}">
						{{info}}
					</div>
					
					<div class="b-broadcast-sport__info__row__stadium">
						{{stadium}}
					</div>
					
					<div class="b-broadcast-sport__info__row__list">
						{{# item}}
						<div class="b-broadcast-sport__info__row_rival-item {{# item__FIRST__}}has-left{{/item__FIRST__}}{{# item__LAST__}}has-right{{/item__LAST__}}">
						
							<div class="b-broadcast-sport__info__row_rival__info">
								{{# item__media__length}}
								<div class="b-broadcast-sport__info__row_rival__media">
									{{# item__media}}
										<img class="b-broadcast-sport__info__row_rival__img" title="{{title}}" src="{{uri}}">
									{{/ item__media}}
								</div>
								{{/ item__media__length}}
								<div class="b-broadcast-sport__info__row_rival__title">
									{{item__title}}
								</div>
							</div>
							
							{{# show__score}}
							<div class="b-broadcast-sport__info__row_rival__score">
								{{item__score}}
							</div>
							{{/ show__score}}
						</div>
						{{/ item}}
					</div>
				</div>

				
				<div class="b-broadcast-sport__info__row b-broadcast-sport__info__row_grid{{# is_soccer}} soccer{{/ is_soccer}}{{# is_hockey}} hockey{{/ is_hockey}}">
					{{# item__goals__length}}
							{{# item_goals}}
								{{# item__goals__guest}}
									<div class="b-broadcast-sport__info__row_grid-item right">		
										<span class="b-broadcast-sport__info__row_grid-item__time">
											{{item__goals__minute}}'
											{{# item__goals__add_minute}}
												({{item__goals__add_minute}}')
											{{/ item__goals__add_minute}}
										</span>
										<span class="b-broadcast-sport__info__row_grid-item__icon"></span>
										<span><a href="#goal{{item__goals__id}}">{{item__goals__name}}</a></span>
									</div>
								{{/ item__goals__guest}}
								{{^ item__goals__guest}}
									<div class="b-broadcast-sport__info__row_grid-item">		
										<span><a href="#goal{{item__goals__id}}">{{item__goals__name}}</a></span>
										<span class="b-broadcast-sport__info__row_grid-item__icon"></span>
										<span class="b-broadcast-sport__info__row_grid-item__time">
											{{item__goals__minute}}'
											{{# item__goals__add_minute}}
												({{item__goals__add_minute}}')
											{{/ item__goals__add_minute}}
										</span>
									</div>
								{{/ item__goals__guest}}
							{{/ item_goals}}
					{{/ item__goals__length}}
				</div>
			</div>
			<!-- /основная информация -->
			
			<!-- панель основных пунктов -->
			<div class="b-broadcast-sport__menu">
				{{# struct__length}}
					<div class="b-broadcast-sport__menu-item" data-content-handler=".b-broadcast-sport__struct">
						<a href="#" class="b-link b-link_blue">Составы</a>
					</div>
				{{/ struct__length}}
				
				{{# posts__length}}
					<div class="b-broadcast-sport__menu-item is-active" data-content-handler=".b-broadcast-sport__post_events">
						<a href="#" class="b-link b-link_blue">Трансляция</a>
					</div>
					
					<div class="b-broadcast-sport__menu-item" data-content-handler=".b-broadcast-sport__post_major">
						<a href="#" class="b-link b-link_blue">Основные моменты</a>
					</div>
				{{/ posts__length}}
				
				{{# stats__length}}
					<div class="b-broadcast-sport__menu-item" data-content-handler=".b-broadcast-sport__stats">
						<a href="#" class="b-link b-link_blue">Статистика</a>
					</div>
				{{/ stats__length}}
			</div>
			<div class="b-broadcast-sport__menu__spacer"></div>
			<!-- /панель основных пунктов -->
			
			<!-- Составы -->
			{{# struct__length}}
				<div class="b-broadcast-sport__struct b-content-handler__ctx">
					{{# struct}}
						
						<!-- Главный тренер -->
						{{# struct__coach__length}}
							{{# struct__coach}}
							
								{{# struct__coach__title }}
								<div class="b-broadcast-sport__title">
									{{struct__coach__title}}
								</div>
								{{/ struct__coach__title }}
								
								{{# struct__coach__main__length }}
								<div class="b-broadcast-sport__struct-item">
									<div class="b-broadcast-sport__struct__wrapper">
										<div class="b-broadcast-sport__struct__coach">
											{{struct__coach__main}}
										</div>
									</div>
								</div>
								{{/ struct__coach__main__length }}
								
								{{# struct__coach__second__length }}
								<div class="b-broadcast-sport__struct-item">
									<div class="b-broadcast-sport__struct__wrapper">
										<div class="b-broadcast-sport__struct__coach">
											{{struct__coach__second}}
										</div>
									</div>
								</div>
								{{/ struct__coach__second__length }}
								
							{{/ struct__coach}}
						{{/ struct__coach__length}}
						<!-- / Главный тренер -->
						
						<!-- Основной состав -->
						{{# struct__main__length }}

							{{# struct__main }}
							
								{{# struct__main__title }}
								<div class="b-broadcast-sport__title">
									{{struct__main__title}}
								</div>
								{{/ struct__main__title }}
								
								{{# struct__main__items__host__length }}
								<div class="b-broadcast-sport__struct-item">

									{{# struct__main__items__host }}
										<div class="b-broadcast-sport__struct__wrapper">
											<div class="b-broadcast-sport__struct__name">
												{{# num}}{{num}}{{/ num}} {{name}}
											</div>
										</div>
									{{/ struct__main__items__host }}

								</div>
								{{/ struct__main__items__host__length }}
								
								
								{{# struct__main__items__guest__length }}
								<div class="b-broadcast-sport__struct-item">

									{{# struct__main__items__guest }}
										<div class="b-broadcast-sport__struct__wrapper">
											<div class="b-broadcast-sport__struct__name">
												{{# num}}{{num}}{{/ num}} {{name}}
											</div>
										</div>
									{{/ struct__main__items__guest }}

								</div>
								{{/ struct__main__items__guest__length }}
								
							{{/ struct__main }}
							
						{{/ struct__main__length }}
						<!-- / Основной состав -->
						
						<!-- Запасные игроки -->
						{{# struct__second__length }}

							{{# struct__second }}
							
								{{# struct__second__title }}
								<div class="b-broadcast-sport__title">
									{{struct__second__title}}
								</div>
								{{/ struct__second__title }}
								
								{{# struct__second__items__host__length }}
								<div class="b-broadcast-sport__struct-item">

									{{# struct__second__items__host }}
									<div class="b-broadcast-sport__struct__wrapper">
										<div class="b-broadcast-sport__struct__name">
											{{# num}}{{num}}{{/ num}} {{name}}
										</div>
									</div>
									{{/ struct__second__items__host }}

								</div>
								{{/ struct__second__items__host__length }}
								
								
								{{# struct__second__items__guest__length }}
								<div class="b-broadcast-sport__struct-item">

									{{# struct__second__items__guest }}
									<div class="b-broadcast-sport__struct__wrapper">
										<div class="b-broadcast-sport__struct__name">
											{{# num}}{{num}}{{/ num}} {{name}}
										</div>
									</div>
									{{/ struct__second__items__guest }}

								</div>
								{{/ struct__second__items__guest__length }}
								
							{{/ struct__second }}
							
						{{/ struct__second__length }}
						<!-- / Запасные игроки -->
						
						<!-- Дополнительная информация -->
						{{# struct__add_info}}
						
							{{# struct__second__add_info__title }}
							<div class="b-broadcast-sport__title">
								{{struct__second__add_info__title}}
							</div>
							{{/ struct__second__add_info__title }}
							
							{{# struct__second__add_info__items__host__length }}
							<div class="b-broadcast-sport__struct-item">
								<div class="b-broadcast-sport__struct__wrapper">
									<div class="b-broadcast-sport__struct__info">
										{{struct__second__add_info__items__host}}
									</div>
								</div>
							</div>
							{{/ struct__second__add_info__items__host__length }}
							
							{{# struct__second__add_info__items__guest__length }}
							<div class="b-broadcast-sport__struct-item">
								<div class="b-broadcast-sport__struct__wrapper">
									<div class="b-broadcast-sport__struct__info">
										{{struct__second__add_info__items__guest}}
									</div>
								</div>
							</div>
							{{/ struct__second__add_info__items__guest__length }}
							
						{{/ struct__add_info}}
						<!-- / Дополнительная информация -->
					{{/ struct}}
				</div>
			{{/ struct__length}}
			<!-- / Составы -->
			
			<!-- Трансляция -->
			{{# posts__length}}
				<div class="b-broadcast-sport__post b-broadcast-sport__post_events b-content-handler__ctx is-active">
					{{# posts}}
						<div class="b-broadcast-sport__post-item {{# posts__event__major}}b-broadcast-sport__post-item_major{{/ posts__event__major}}">
							<a name="goal{{posts__id}}"></a>
							<div class="b-broadcast-sport__post__min">
								{{posts__min}}
								{{# posts__min_add}}
									+ {{posts__min_add}}
								{{/ posts__min_add}}
							</div>
							<div class="b-broadcast-sport__post__event{{# posts__event}} b-broadcast-sport__post__event__id{{posts__event__id}}{{/ posts__event}}">
								{{# posts__event}}
									
									{{posts__event__name}}
									
								{{/ posts__event}}
							</div>
							<div class="b-broadcast-sport__post__text">
								{{{posts__text}}}
							</div>
						</div>
					{{/ posts}}
				</div>
			<!-- / Трансляция -->
			
			<!-- Основные моменты -->
				<div class="b-broadcast-sport__post b-broadcast-sport__post_major b-content-handler__ctx js-scroll-bar">
					{{# posts}}
						{{# posts__event__major}}
							<div class="b-broadcast-sport__post-item {{# posts__event__major}}b-broadcast-sport__post-item_major{{/ posts__event__major}}">
								<div class="b-broadcast-sport__post__min">
									{{posts__min}}
									{{# posts__min_add}}
										+ {{posts__min_add}}
									{{/ posts__min_add}}
								</div>
								<div class="b-broadcast-sport__post__event{{# posts__event}} b-broadcast-sport__post__event__id{{posts__event__id}}{{/ posts__event}}">
									{{# posts__event}}
									
										{{posts__event__name}}
										
									{{/ posts__event}}
								</div>
								<div class="b-broadcast-sport__post__text">
									{{{posts__text}}}
								</div>
							</div>
						{{/ posts__event__major}}
					{{/ posts}}
				</div>
			{{/ posts__length}}
			<!-- / Основные моменты -->
			
			<!-- Статистика -->
			{{# stats__length}}
				<div class="b-broadcast-sport__stats b-content-handler__ctx">
					<div class="b-broadcast-sport__title">
						Статистика
					</div>
					{{# stats}}
						{{# stats_show}}
						<div class="b-broadcast-sport__stats-item">
							<div class="b-broadcast-sport__stats__value b-broadcast-sport__stats__value_owner">{{stats__owner}}</div>
							<div class="b-broadcast-sport__stats__name">{{stats__title}}</div>
							<div class="b-broadcast-sport__stats__value b-broadcast-sport__stats__value_guest">{{stats__guest}}</div>
						</div>
						{{/ stats_show}}
					{{/ stats}}
				</div>
			{{/ stats__length}}
			<!-- / Статистика -->
			
		</div>
		{{/ broadcast}}
	</div>
	{{/ broadcast__length}}
{{/ sport}}