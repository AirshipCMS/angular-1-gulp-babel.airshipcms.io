var gulp = require('gulp'),
  babel = require('gulp-babel'),
  http = require('http'),
  st = require('st')

gulp.task('js', ["es6"],function() {
  return gulp.src("src/app.js")
    .pipe(gulp.dest("compartments/assets/scripts"));
});

gulp.task("es6",function() {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("compartments/assets/scripts"));
});


gulp.task("default",["js"],function(done) {
  http.createServer(
    st({ index: 'compartments/layouts/application.html', cache: false, path: __dirname })
  ).listen(8080, done);
  gulp.watch('src/*', ['js']);
});