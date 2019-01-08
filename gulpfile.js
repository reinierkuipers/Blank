// VARIABLES

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var runSequence     = require('run-sequence');
var autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync').create();
var gulpif          = require('gulp-if');
var runSequence     = require('run-sequence');
var autoreload      = browserSync.reload;

const folders = {
    name: 'projectname',
    extension: '.localhost'
};

var paths = {
    styles: {
        src: './templates/' + folders.name + '/scss',
        files: [
            '/node_modules/normalize.css/normalize.css',
            '/templates/' + folders.name + '/scss/**/*.scss',
        ],
        dest: './templates/' + folders.name + '/css'
    }
};

// BROWSER-SYNC

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
      proxy: 'http://' + folders.name + '.localhost',
    });
});

// WATCH

gulp.task('watch', function() {
  gulp.watch(paths.styles.files, ['sass']);
});

// SASS

gulp.task('sass', function () {
    gulp.src(paths.styles.files, { base: '.' })
        .pipe(sass({
            sourceComments: true,
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulpif(autoreload,browserSync.stream({match:"**/*.css"})));
});

// DEFAULT & WATCH

gulp.task('watch', function() {
  gulp.watch(paths.styles.files, ['sass']);
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'browser-sync'], 'watch', callback)
});