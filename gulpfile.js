const gulp                      = require('gulp'),
    del                         = require('del'),
    sass                        = require('gulp-sass'),
    autoprefixer                = require('gulp-autoprefixer'),
    minifyCss                   = require('gulp-clean-css'),
    babel                       = require('gulp-babel'),
    webpack                     = require('webpack-stream'),
    uglify                      = require('gulp-uglify'),
    concat                      = require('gulp-concat'),
    browserSync                 = require('browser-sync').create(),

    src_folder                  = './src/',
    src_assets_folder           = src_folder,
    dist_folder                 = './dist/',
    dist_assets_folder          = dist_folder,
    node_modules_folder         = './node_modules/',
    dist_node_modules_folder    = dist_folder + 'node_modules/',

    node_dependencies           = Object.keys(require('./package.json').dependencies || {});

gulp.task('clear', () => del([ dist_folder ]));

gulp.task('html', () => {
    return gulp.src([ src_folder + '**/*.html' ], {
        base: src_folder,
        since: gulp.lastRun('html')
    })
        .pipe(gulp.dest(dist_folder))
        .pipe(browserSync.stream());
});


gulp.task('sass', () => {
    return gulp.src([
        src_assets_folder + '*.scss'
    ], { since: gulp.lastRun('sass') })
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest(dist_assets_folder))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src([ src_assets_folder + '*.js' ], { since: gulp.lastRun('js') })
        .pipe(webpack({
            mode: 'production'
        }))
        .pipe(babel({
            presets: [ '@babel/env' ]
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist_assets_folder))
        .pipe(browserSync.stream());
});


gulp.task('vendor', () => {
    if (node_dependencies.length === 0) {
        return new Promise((resolve) => {
            console.log("No dependencies specified");
            resolve();
        });
    }

    return gulp.src(node_dependencies.map(dependency => node_modules_folder + dependency + '/**/*.*'), {
        base: node_modules_folder,
        since: gulp.lastRun('vendor')
    })
        .pipe(gulp.dest(dist_node_modules_folder))
        .pipe(browserSync.stream());
});

gulp.task('build', gulp.series('clear', 'html', 'sass', 'js', 'vendor'));

gulp.task('dev', gulp.series('html', 'sass', 'js'));

gulp.task('serve', () => {
    return browserSync.init({
        server: {
            baseDir: [ 'dist' ]
        },
        port: 3000,
        open: true
    });
});

gulp.task('watch', () => {

    const watchVendor = [];

    node_dependencies.forEach(dependency => {
        watchVendor.push(node_modules_folder + dependency + '/**/*.*');
    });

    const watch = [
        src_folder + '*.html',
        src_assets_folder + '*.scss',
        src_assets_folder + '*.js'
    ];

    gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
    gulp.watch(watchVendor, gulp.series('vendor')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
