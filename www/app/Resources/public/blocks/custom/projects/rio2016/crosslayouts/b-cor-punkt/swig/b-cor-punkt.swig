<div class="b-cor-punkt__body">
	<div class="b-cor-punkt__title">Корпункт "РГ" в Рио</div>
	<div class="b-cor-punkt__text">Во время XXXI Олимпиады вы сможете прочитать эксклюзивные репортажи из сердца Олимпиады — города Рио-де-Жанейро и его окрестностей, узнать последние подробности со спортивных арен и из Русского дома.
	<br><br>Героями наших материалов станут чемпионы и призеры ХХХI Олимпийский игр,  тренеры и зарубежные знаменитости. <br><br>Бригада "Российской газеты" в этом году, как никогда, очень мощная: за океан отправились сразу три журналиста нашего издания.</div>
	<div class="b-cor-punkt__reporters">
		{% for item in data.reporters %}
		<div class="b-cor-punkt__reporter">
			<div class="b-cor-punkt__reporter__img" style="background-image: url({[item.img]});"></div>
			<div class="b-cor-punkt__reporter__text">
                <div class="b-cor-punkt__reporter__name">{[item.name]}</div>
                {[item.work]}
            </div>
		</div>
		{% endfor %}
	</div>
    <div class="b-cor-punkt__note">
        Для прямой связи с нашими специальными корреспондентами в Рио вы можете использовать электронную почту: <a href="mailto:sport@rg.ru" class="b-link">sport@rg.ru</a>
    </div>
</div>