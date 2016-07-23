var gulp = require('gulp'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref');

// Compile & compress less file to minified css
gulp.task('less', function () {
    return gulp.src('resources/css/style.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/resources/css'));
});

// Minify JS file
gulp.task('minify-js', function () {
    return gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});

// Copy images
gulp.task('copy-image', function () {
    return gulp.src(['resources/images/*'])
        .pipe(gulp.dest('dist/resources/images'))
});

// Copy lib files
gulp.task('copy-lib', function () {
    return gulp.src(['lib/**'])
        .pipe(gulp.dest('dist/lib'))
});

// Update html.index file to ref to minified files
gulp.task('user-ref', function () {
    gulp.src('index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['less', 'minify-js', 'copy-image', 'copy-lib', 'user-ref']);
