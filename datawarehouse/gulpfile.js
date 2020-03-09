const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');

gulp.task('scss', function(done) {
    gulp.src("./styles/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(gulp.dest("./styles/css/"))
        .pipe(browserSync.stream());


    done();
});

gulp.task('serve', function(done) {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./styles/**/*.scss", gulp.series('scss'));
    gulp.watch("./*.html").on('change', () => {
        browserSync.reload();
        done();
    });


    done();
});

gulp.task('default', gulp.series('scss', 'serve'));