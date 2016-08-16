/*
 * Объявляем глобальные пути
 *
 */

global.pathMap = require('./paths')();

/*
 * Методы помощники
 *
 */

global.helpers = require('./helpers');

/*
 * Модуль обработки шаблонов (JS)
 *
 */

global.RGT = require('./rgt');

/*
 * Модуль обработки блоков
 *
 */

global.RGB = require('./rgb');

/*
 * Модуль обработки инлайн скриптов
 *
 */

global.RGInclude = require('./rginclude');

/*
 * Объявляем модули сборщика
 *
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Галп плагин свига
var gulpRGswig = require('gulp-rgswig');
var gulpFromConfig = require('gulp-from-config');

var tasks = []; // хранилище задач



/*
 * Настраиваем сборщик, через модуль
 * @gulpFromConfig
 *
 */

// Устанавливаем папку, из которой брать
// конфигурационные файлы
gulpFromConfig.setConfigsPath('app/Resources/configs');

// Получаем массив задач,
// который будет использоваться в задаче
tasks = gulpFromConfig.createTasks(gulp);

// Сборка глобальных скриптов
gulp.task('lib:scripts', function () {

    return gulp
        .src([
            "/var/www/pravo/node_modules/underscore/underscore-min.js",
            "/var/www/pravo/node_modules/ractive/ractive-legacy.min.js",
            "/var/www/pravo/node_modules/jquery-mockjax/dist/jquery.mockjax.min.js",
            "/var/www/pravo/node_modules/pubsub-js/src/pubsub.js",
            "/var/www/pravo/node_modules/moment/min/moment.min.js",
            "/var/www/pravo/node_modules/moment/locale/ru.js",
            "/var/www/pravo/node_modules/cookies-js/dist/cookies.min.js",
            "/var/www/pravo/node_modules/jquery-colorbox/jquery.colorbox-min.js",
            "/var/www/pravo/node_modules/lockr/lockr.min.js",
            "/var/www/pravo/node_modules/quill/dist/quill.js",
            "/var/www/pravo/node_modules/fotorama/fotorama.js",
            "/var/www/pravo/node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js",
            "/var/www/pravo/node_modules/slick-carousel/slick/slick.min.js",
            "/var/www/pravo/node_modules/lsbridge/src/lsbridge.js",

            "./app/Resources/public/scripts/vendors/rg/colmaker.jquery.js",
            "./app/Resources/public/scripts/vendors/adfox/adfox.reload_code.embeds.min.js",
            "./app/Resources/public/scripts/vendors/jwplayer/jwplayer.min.js",
            "./app/Resources/public/scripts/vendors/jquery.sticky-kit.js",
            "./app/Resources/public/scripts/vendors/jquery.appear.js"
        ])

        .pipe(
            concat('lib.js')
        )

        .pipe(
            uglify()
        )

        .on('error', function(err){
            console.log(err);
            this.emit('end');
        })

        .pipe(gulp.dest(pathMap.dest.public + '/js'));

});

// борка глобальных стилей
gulp.task('lib:styles', function () {

    return gulp
        .src([
            "/var/www/pravo/node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css",
            "/var/www/pravo/node_modules/slick-carousel/slick/slick.css",

            "./app/Resources/public/styles/vendors/colorbox/colorbox.css",
            "./app/Resources/public/styles/vendors/fotorama/fotorama.css",
            "./app/Resources/public/styles/vendors/slick/slick-theme.css",
            "./app/Resources/public/styles/vendors/animate/animate.min.css"
        ])

        .pipe(
            sass({
                outputStyle: 'compressed'
            })
        )

        .pipe(
            concat('lib.css')
        )

        .on('error', function(err){
            console.log(err);
            this.emit('end');
        })

        .pipe(gulp.dest(pathMap.dest.public + '/css'));

});

gulp.task('lib', ['lib:scripts', 'lib:styles']);

// Деплой из дев на прод
// Все файлы html
gulp.task('deploy:html', function () {

    return gulp
        .src("./dest/**/*.*html")

        .on('error', function(err){
            console.log(err);
            this.emit('end');
        })

        .pipe(gulp.dest(__dirname + '/prod/'));

});

// Все файлы ресурсов
gulp.task('deploy:res', function () {

    return gulp
        .src([
            "./dest/**",
            "!./dest/**/*.*html"
        ])

        .on('error', function(err){
            console.log(err);
            this.emit('end');
        })

        .pipe(gulp.dest(__dirname + '/prod/'));

});

// Общая задача
gulp.task('deploy', ['deploy:html', 'deploy:res']);

/*
 * Стандарнтая задача
 * при вызове команды gulp без аргументов
 * В ней мы и вызываем все @tasks,
 * получанные методом gulpFromConfig.createTasks
 *
 */

gulp.task('default', tasks, function() {});



//////// SUUUPEEERRRR

/*var rgcsspack = require('gulp-rgcsspack');

gulp.task('csspack', function () {

	return gulp
		.src(pathMap.src.pages + '/data/index.js')

		.pipe(rgcsspack())

		.on('error', function(err){
			console.log(err);
			this.emit('end');
		})

		.pipe(gulp.dest('sassTest'));

});
*/