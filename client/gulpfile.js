'use strict';

var gulp          = require( 'gulp' ),
    config        = require('./gulp.config')(),
    connect       = require( 'gulp-connect' ),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat');

var files = [
    'src/*.html',
    'src/assets/sass/**/*.scss',
    'src/app/**/*.js'
];

gulp.task( 'files', function() {
    gulp.src( files ).pipe( connect.reload() );
});

gulp.task('sass', function () {
    gulp.src(config.sass + '*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('src/assets/'));
});

gulp.task( 'watch', function() {
    gulp.watch( files, [ 'sass','files' ]);
});

gulp.task( 'connect', function() {
    connect.server({ root: 'src',livereload: true });
});

gulp.task( 'default', [ 'connect', 'watch','sass' ]);
