<div class="b-list-head__body">

    <div class="b-list-head__row">
		<!-- заголовок -->
		<h1 class="b-list-head__title">
            {{# use_publishing_date}}
                Документы, опубликованные
            {{/use_publishing_date}}

            {{^ use_publishing_date}}
                {{# in_the_past}}
                    Документы, вступившие в силу
                {{/in_the_past}}
                {{^ in_the_past}}
                    Документы, вступающие в силу
                {{/in_the_past}}
            {{/use_publishing_date}}

            {{readable_date}}
		</h1>
		<!-- /заголовок -->
    </div>

</div>