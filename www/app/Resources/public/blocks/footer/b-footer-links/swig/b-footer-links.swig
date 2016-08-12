{% for link in data.links %}

<div class="b-footer-links__row {[ link.class ]}">
	
	{% for list in link.links__list %}
	
    <ul class="b-footer-links__list {[ list.class ]}">
		
		{% if list.title %}
		
			<li class="b-footer-links__list-item">
				<h5 class="b-footer-links__list-item-title">
					{% if list.uri %}<a class="b-link b-link_title" href="{[ list.uri ]}">{% endif %}
					
						{[ list.title ]}:
						
					{% if list.uri %}</a>{% endif %}
				</h5>
			</li>
		
		{% endif %}
		
		{% for item in list.links__list__item %}
		
			<li class="b-footer-links__list-item  {[ item.class ]}">
				<a class="b-link b-link_title" href="{[ item.uri ]}">
				
					{% if item.icon %}
						
						<span class="b-icon {[ item.icon ]}"></span>
						
					{% endif %}
				
					{% if item.title %}
					
						{[ item.title ]}
						
					{% endif %}
				
				</a>
			</li>
			
		{% endfor %}

    </ul>
	
	{% endfor %}
		
</div>

{% endfor %}


<div class="b-footer-links__row has-3">
	

    <div class="b-footer__copyright-info">
        <div class="b-footer__copyright-text">
			{[ data.copyright.text|safe ]}
        </div>
        
		{[ data.copyright.info|safe ]}
		
    </div>

    <div class="b-footer__special">
        <!-- <div class="b-footer__special-text">Нашли опечатку? Выделите её и нажмите <b>Ctrl+Enter</b></div> -->

        <!-- счетчики -->
        {[ macro.RGBi(blocks.counter, parent) ]}
        <!-- /счетчики -->

    </div>
    
</div>