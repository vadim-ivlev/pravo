/*
 * Модуль бесконечной подгрузки
 *
 */

var LoadChain = function() {

	var rootEl = document.getElementById('loadChain');

    var addToChain = new Ractive ({
        el: '#loadChain',
        template: function() {
            let tmpl = '',
            	tmplValue = this.get('tmplValue'),
            	tmplType = (tmplValue == '1') ? 'jurists' : 'questions',
                self = this;

            // Определяем, какой шаблон использовать - список вопросов или список юристов
            $.get('https://pravo.rg.ru/views/includeTemplate/' + tmplType + '_list.html')
                .done(function(response) {
                    // После получения шаблона генерим его
                    self.resetTemplate('<div>' + response + '</div>{{#show}}<div class="b-load-more"><div class="b-load-more__button{{# loading}} has-loading{{/ loading}}" on-click="activate">Загрузить еще</div></div>{{/show}}');
                    self.set('offset', (+self.get('offset') + +self.get('limit')));
                });
            return tmpl;
        },
        data: function() {
            return {
                items: null,
                uri: rootEl.getAttribute('data-uri'),
                limit: rootEl.getAttribute('data-limit'),
                offset: rootEl.getAttribute('data-offset'),
                tmplValue: rootEl.getAttribute('data-value'),
                search: rootEl.getAttribute('data-search'),
                requestUri: rootEl.getAttribute('data-request-uri'),
                show: true
            }
        },
        onrender() {
            var self = this,
                querySym = (window.location.href.indexOf('?') !== -1) ? '&' : '?';

            // Запрашиваем данные для вывода при отрисовке шаблона
            fetch(window.location.href + querySym + 'format=json')
                .then(function(response) {
                    if (response.status !== 200) {
                        console.log('Данные не получены. Ошибка ' + response.status);
                        return;
                    }
                    response.json().then(function(data) {
                        self.set('items', '');
                        // Если вопросов/юристов нет или меньше лимита, кнопку "Загрузить ещё" не показываем
                        if (!data.items_list || (data.items_list.length < self.get('limit'))) {
                        	self.set('show', false);
                        }
                    });
                });
        }
    });

    addToChain.on('activate', function() {
        var search = this.get('search'),
            querySym = (window.location.href.indexOf('?') !== -1) ? '&' : '?',
            offset = +this.get('offset'),
            limit = +this.get('limit'),
            requestUri = this.get('requestUri'),
            uri = (search == true) ? (this.get('uri') + querySym + 'offset=' + offset + '&limit=' + limit + '&format=json') : (requestUri + '/limit-' + limit + '/offset-' + offset + '/index.html?format=json'),
        	self = this;

        // Вычисляем, на сколько блоков сдвинуться при выводе
        offset += limit;

        self.set('loading', true);

        // Запрашиваем новые данные, вставляем блоки и перезаписываем оффсет
        fetch(uri)
            .then(function(response) {
                if (response.status !== 200) {
                    console.log('Данные не получены. Ошибка ' + response.status);
                    self.set('show', false);
                    return;
                }
                response.json().then(function(data) {
                    if (addToChain.get('items') == '') {
                        self.set('items', data.items_list);
                    } else {
                        self.set('items', addToChain.get('items').concat(data.items_list));
                    }
                    self.set('offset', offset);
                    self.set('loading', false);

                    // Если данных больше не осталось, скрываем кнопку "Загрузить ещё"
                    // if (self.get('tmplValue') == '1') {
                    	if (data.items_list.length < limit) {
                    		self.set('show', false);
                    	}
                	/*} else {
                		if (data.items_list.length < (limit + 1)) {
                    		self.set('show', false);
                    	}
                	}*/
                });
            });


    });
};

module.exports = LoadChain;