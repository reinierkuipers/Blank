// VARIABLES

var gulp            = require('gulp');
var uglify          = require('gulp-uglify');
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var cleanCSS        = require('gulp-clean-css');
var minifyCSS       = require('gulp-minify-css');
var purgeSourcemaps = require('gulp-purge-sourcemaps');
var browserSync     = require('browser-sync').create();
var autoreload      = browserSync.reload;

const folders = {
    name: 'projectname',
    extension: '.localhost'
};

var paths = {
    styles: {
        src: './templates/' + folders.name + '/scss',
        files: './templates/' + folders.name + '/scss/**/*.scss',
        dest: './templates/' + folders.name + '/css'
    },
    scripts: {
        src: './templates/' + folders.name + '/js',
        files: [
            './templates/' + folders.name + '/js/vendor/*.js',
            './templates/' + folders.name + '/assets/js/*.js',
        ],
    }
};

// BROWSER-SYNC

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
      proxy: 'http://cashquiz.localhost'
    });
});

// WATCH

gulp.task('watch', function(){
  gulp.watch('js/**/*.js',['js']);
  gulp.watch('css/**/*.scss',['sass']);
  gulp.watch('css/**/*.css',['css']);
});

// FILES

gulp.task('files', function() {
    gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest('css'));
});

// JAVASCRIPT

gulp.task('js', function () {
  return gulp.src(paths.scripts.files)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
});

// SASS

gulp.task('sass', function () {
  gulp.src(paths.styles.files)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(purgeSourcemaps())
    .pipe(minifyCSS({keepSpecialComments:0, processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulpif(autoreload,browserSync.stream({match:"**/*.css"})));
});

// CSS

gulp.task('css', function () {
  gulp.src([
    'css/normalize.css',
    'css/template.css'
    ])
    .pipe(cleanCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build'));
});

// DEFAULT

gulp.task('default', ['files','js','sass','css','watch']);
