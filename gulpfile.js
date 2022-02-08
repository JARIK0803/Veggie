"use strict";

const { src, dest, parallel } = require("gulp"),
    gulp = require("gulp"),
    watch = require("gulp-watch"),
    prefixer = require("gulp-autoprefixer"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    rigger = require("gulp-rigger"),
    cssmin = require("gulp-clean-css"),
    htmlmin = require("gulp-htmlmin"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    rimraf = require("rimraf"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

let path = {
    dist: {
        //Тут мы укажем куда складывать готовые после сборки файлы
        html: "dist/",
        js: "dist/js/",
        php: "dist/php/",
        css: "dist/css/",
        img: "dist/img/",
        fonts: "dist/fonts/",
    },
    src: {
        //Пути откуда брать исходники
        html: "src/*.html", //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: "src/js/main.js", //В стилях и скриптах нам понадобятся только main файлы
        php: "src/php/main.php",
        css: "src/style/main.scss",
        img: "src/img/**/*.*", //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: "src/fonts/**/*.*",
    },
    watch: {
        //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: "src/**/*.html",
        js: "src/js/**/*.js",
        php: "src/php/**/*.php",
        css: "src/style/**/*.scss",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*",
    },
    clean: "./dist",
};

let config = {
    server: {
        baseDir: "./dist",
    },
    notify: false,
    // tunnel: true,
    // host: "localhost",
    // port: 9000,
    // logPrefix: "Frontend_Devil"
};

function html() {
    return src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        // .pipe(htmlmin({ collapseWhitespace: true })) //минифицируем html
        .pipe(dest(path.dist.html)) //Выплюнем их в папку dist
        .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
}

function js() {
    return src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(babel({ presets: ["@babel/env"] }))
        // .pipe(uglify()) //Сожмем наш js
        // .pipe(sourcemaps.init()) //Инициализируем sourcemap
        // .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(dest(path.dist.js)) //Выплюнем готовый файл в dist
        .pipe(reload({ stream: true })); //И перезагрузим сервер
}

function php() {
    return (
        src(path.src.php) //Найдем наш main файл
            // .pipe(rigger()) //Прогоним через rigger
            // .pipe(uglify()) //Сожмем наш js
            // .pipe(sourcemaps.init()) //Инициализируем sourcemap
            // .pipe(sourcemaps.write()) //Пропишем карты
            .pipe(dest(path.dist.php)) //Выплюнем готовый файл в dist
            .pipe(reload({ stream: true }))
    ); //И перезагрузим сервер
}

function css() {
    return src(path.src.css) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        // .pipe(cssmin()) //Сожмем
        // .pipe(sourcemaps.write())
        .pipe(dest(path.dist.css)) //И в dist
        .pipe(reload({ stream: true }));
}

function img() {
    return src(path.src.img) //Выберем наши картинки
        .pipe(
            imagemin({
                //Сожмем их
                progressive: true,
                imageminSvgo: { removeViewBox: false, cleanupAttrs: false },
                // svgoPlugins: [{ removeViewBox: false }],
                use: [pngquant()],
                interlaced: true,
            })
        )
        .pipe(dest(path.dist.img)) //И бросим в dist
        .pipe(reload({ stream: true }));
}

function fonts() {
    return src(path.src.fonts).pipe(dest(path.dist.fonts));
}

function watchFiles() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.css, css);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.php, php);
    gulp.watch(path.watch.img, img);
    gulp.watch(path.watch.fonts, fonts);
}

function webserver() {
    return browserSync(config);
}

function clean(cb) {
    return rimraf(path.clean, cb);
}

const build = parallel(html, css, js, php, img, fonts);
const run = parallel(build, webserver, watchFiles);

//export tasks
exports.html = html;
exports.js = js;
exports.php = php;
exports.css = css;
exports.img = img;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = run;
exports.default = run;
