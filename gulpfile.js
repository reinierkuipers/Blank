// VARIABLES

var gulp          = require('gulp');
var uglify        = require('gulp-uglify');
var cleanCSS      = require('gulp-clean-css');
var concat        = require('gulp-concat');
var sass          = require('gulp-sass');

const folders = {
    name: '',
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
  return gulp.src([
    'js/script.js'
    ])
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
});

// SASS

gulp.task('sass', function () {
  gulp.src('css/template.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
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
