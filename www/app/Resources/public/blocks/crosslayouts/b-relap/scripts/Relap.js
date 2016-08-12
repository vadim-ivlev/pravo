var Relap = Ractive.extend({

	data() {
        return {
            elems: null
        }
    },

    oninit() {

        RG.logger.debug('Relap');

        RG.logger.debug(this.get());

        this.set('elems', this.get('elems'));
		this.set('title', this.get('title'));
    }

});

module.exports = Relap;

// var template = require('../b-relap.ihtml'),    

// 	Relap = Ractive.extend({

// 		template,

//         isolated: true,

//         data() {
//             return {
//                 elems: null,
//                 title: null
//             }
//         },

//         // Перед инициализацией
//         beforeInit(self) {

//             // Проверяем наличие шабона в данных
//             if (self.data().tmpl !== 'undefined') {

//                 // Если есть, подключаем его, а не дефолтный
//                 self.template = self.data().tmpl;

//             }

//         },

//         // Инициализация
//         oninit() { 

//             RG.logger.debug('RG-Relap init');

//             var limit = this.get('limit'),
//                 description = this.get('description'),
//                 title = this.get('title'),
//                 neededElems = null,
//                 self = this; 

//             RG.logger.debug(title);

//             // После получения данных из main.js
//             RG.events.subscribe('Relap.load.script', function(topic, data){

//                 // Вырезаем из массива объектов нужное нам количество
//                 neededElems = data.splice(0, limit);

//                 // Вставляем объекты
//                 self.set('elems', neededElems);

//                 // И тайтл
//                 self.set('title', title);
                
//             });


//         }

// 	});

// module.exports = Relap;


