<div class="b-list-wrapper">

	<div class="b-rubricator-menu">

	    <div class="b-rubricator-menu__list">
            {{# root_sections}}
	        <div class="b-rubricator-menu__item {{# root_sections__FIRST__}}b-rubricator-menu__item_active{{/ root_sections__FIRST__}}" data-rubId="{{sect_id}}">
	            <a class="b-link b-link_inner b-rubricator-menu__link" data-rubId="{{sect_id}}" topic="rubricator.rubric.show">{{title}}</a>
            </div>
            {{/ root_sections}}
	    </div>

	</div>

    <div class="b-rubricator-rubrics">

        {{# root_sections }}
        <div class="b-rubricator-rubrics__item b-rubricator-rubrics__item_sect b-rubricator-rubrics__item_sect{{sect_id}} {{# root_sections__FIRST__}}b-rubricator-rubrics__item_show{{/ root_sections__FIRST__}}">

            <div class="b-rubricator-rubrics__title b-rubricator-rubrics__title_h1">
                <a class="b-link" href="{{uri}}">{{title}}</a>
            </div>

            {{# root_sections__child_sections__length}}
                {{# root_sections__child_sections}}
                    <div class="b-rubricator-rubrics__item">

                        <div class="b-rubricator-rubrics__title b-rubricator-rubrics__title_h2">
                            <a class="b-link" href="{{uri}}">{{title}}</a>
                        </div>

                        {{# root_sections__child_sections__child_sections__length}}
                            <div class="b-rubricator-rubrics__list">
                            {{# root_sections__child_sections__child_sections}}

                                <div class="b-rubricator-rubrics__item b-rubricator-rubrics__item_list">
                                    <a class="b-link" href="{{uri}}">{{title}}</a>

                                    {{# root_sections__child_sections__child_sections__child_sections__length}}
                                        {{# root_sections__child_sections__child_sections__child_sections}}
                                            :<a class="b-link" href="{{uri}}">{{title}}</a>
                                        {{/ root_sections__child_sections__child_sections__child_sections}}
                                    {{/ root_sections__child_sections__child_sections__child_sections__length}}
                                </div>

                            {{/ root_sections__child_sections__child_sections}}
                            </div>
                        {{/ root_sections__child_sections__child_sections__length}}

                    </div>
                {{/ root_sections__child_sections}}
            {{/ root_sections__child_sections__length}}

        </div>
        {{/ root_sections}}

    </div>

</div>