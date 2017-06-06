var gulp = require('gulp'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass');
  autoprefixer = require('gulp-autoprefixer');

gulp.task('js', ["es6"],function() {
  return gulp.src("src/app.js")
    .pipe(gulp.dest("compartments/assets/scripts"));
});

gulp.task("es6",function() {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("compartments/assets/scripts"));
});

gulp.task('sass', function () {

  return gulp.src('./scss/**/*.scss')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./compartments/assets/styles'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('src/*', ['js']);
});

gulp.task('default', ['watch', 'sass', 'js']);