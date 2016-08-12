<div class="b-list-head__body b-rubricator-head">

    <div class="b-list-head__row b-rubricator-head__row">
		<!-- заголовок -->
		<h1 class="b-list-head__title">
            {{# rubricator_theme}}
                Тематический рубрикатор
            {{/ rubricator_theme}}
            {{# rubricator_region}}
                Региональный рубрикатор
            {{/ rubricator_region}}
            {{# rubricator_org}}
                Рубрикатор организаций
            {{/ rubricator_org}}
		</h1>
		<!-- /заголовок -->
    </div>

    <div class="b-list-head__row b-rubricator-head__row">

        {[ macro.RGBi(blocks.tabsRubricator, parent) ]}

    </div>

</div>