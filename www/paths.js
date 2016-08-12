/*
 * Основные пути
 * приватные переменные
 *
 */

var 
    // Корневая дирректория сайта   
    //_root = '/www/app/site',
	_root = __dirname,

    // Папка разработки
    _src = '/app/Resources/public',

    // Папка деплоя
    _dest = '/src/JuristBundle/Resources';

// EXPEREMENTS
// Блоки SRC
var listSrc = [
    'blocks',
    'images',
    'includes',
    'loadarray',
    'pages',
    'scripts',
    'styles'
];

// Блоки DEST
var listDEST = [
    'public',
    'templates'
];

/*
 * Методы
 *
 */

var

    // Получить SRC
    getSrc = function() {

        var src = {};

        listSrc.forEach(function(el, i){

            src[el] = _root + _src + '/' + el;

        });

        src._ = _root + _src;

        return src;

    },

    // Получить DEST
    getDest = function() {

        var dest = {};

        listDEST.forEach(function(el, i){

            dest[el] = _root + _dest + '/' + el;

        });

        dest._ = _root + _dest;

        return dest;

    };



// Экспортируем
module.exports = function(){

    return {
        _: _root,
        src: getSrc(),
        dest: getDest()
    };

};