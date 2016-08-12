<div class="b-gmap__body">  
    <div class="b-gmap__top">
        <div class="page">
            <h2>Стадионы чемпионата</h2> 
            <div class="b-gmap__links">
                {% for item in data.stadium %}
                    <a href="javascript://" class="b-gmap__link" rel="{[ item.index ]}">{[ item.title ]}</a>
                {% endfor %}
            </div> 
        </div>
    </div>
    <div class="b-gmap__map" id="map"></div>
</div>

