var lr = require('tiny-lr'),
    gulp = require('gulp'),
    myth = require('gulp-myth'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    insert = require('gulp-insert'),
    resolveDependencies = require('gulp-resolve-dependencies'),
    rename = require("gulp-rename"),
    dest = require('gulp-dest'),
    server = lr();

var comment = '/*\n' +
    '* Web store application based on AngularJS *\n' +
    '* @version v0.0.1 - 2017-06-10 *\n' +
    '* @link https://github.com/Mr-Zoidberg/AngularStore *\n' +
    '* @author Denis Kashkovsky <dan.kashkovsky@gmail.com> *\n' +
    '* @license MIT License, http://www.opensource.org/licenses/MIT *\n' +
    '*/ \n';

//css
gulp.task('css', ['min-css'], function () {
    gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.css', './src/css/*'])
        .pipe(myth())
        .pipe(concat('angularstore.css'))
        .pipe(gulp.dest('./www/css'));
});

gulp.task('min-css', function () {
    gulp.src('./src/css/*')
        .pipe(myth())
        .pipe(csso())
        .pipe(concat('angularstore.min.css'))
        .pipe(gulp.dest('./www/css'))
        .pipe(connect.reload());
    gulp.src(['./www/css/angularstore.min.css', './bower_components/bootstrap/dist/css/bootstrap.css'])
        .pipe(concat('angularstore.min.css'))
        .pipe(gulp.dest('./www/css'))
        .pipe(connect.reload());
});

//create local server
gulp.task('http-server', function () {
    connect
        .server({
            port: 35729,
            root: './www/',
            livereload: true
        });
});
gulp.task('http-server-reload', function () {
    connect.reload();
});
gulp.task('http-server-close', function () {
    connect.serverClose();
});
// compile JS
gulp.task('min-js', function () {
    gulp.src(['./bower_components/angular/angular.js', './bower_components/angular-route/angular-route.js', './src/js/app.js', './src/js/basket.js', './src/js/product.js', './src/js/productCategory.js', './src/js/service.js', './src/js/controller.js'])
        .pipe(concat('angularstore.min.js'))
        .pipe(uglify())
        //.pipe(insert.wrap('(function(){ "use strict", ', '})();'))
        .pipe(insert.transform(function (contents) {
            return comment + contents;
        }))
        .pipe(gulp.dest('./www/js'))
        .pipe(connect.reload());
});

gulp.task('js', ['min-js'], function () {
    gulp.src(['./bower_components/angular/angular.js', './bower_components/angular-route/angular-route.js', './src/js/app.js', './src/js/basket.js', './src/js/product.js', './src/js/productCategory.js', './src/js/service.js', './src/js/controller.js'])
        .pipe(concat('angularstore.js'))
        //.pipe(insert.wrap('(function(){ "use strict", ', '})();'))
        .pipe(insert.transform(function (contents) {
            return comment + contents;
        }))
        .pipe(gulp.dest('./www/js'))
        .pipe(connect.reload());
});

gulp.task('watch', ['js', 'css', 'http-server'], function () {
    gulp.watch('./src/js/*', ['js']);
    gulp.watch('./src/css/*', ['css']);
});

gulp.task('build', ['js', 'css', 'http-server-reload']);