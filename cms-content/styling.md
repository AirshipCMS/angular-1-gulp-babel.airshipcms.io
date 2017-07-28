# Styling
This project was styled with CSS and Bulma.

All stylesheets must be placed in `/compartments/assets/styles`

All files from this directory and external files are included in the head of `/compartments/layouts/application.html`
```
<head>  
  <meta charset="UTF-8">  
  <title>Angular 1.x + Airship CMS</title>  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.css">  
  <link rel="stylesheet" href="/assets/styles/styles.css">  
</head>
```

# Gulp
This demonstrates how to compile Sass with Gulp

## 1. Install Dependencies
```
yarn add gulp gulp-sass gulp-autoprefixer babel-preset-env concurrently
```
or
```
npm i gulp gulp-sass gulp-autoprefixer babel-preset-env concurrently
```

`babel-preset-env` was used to compile JavaScript files. Check out Angular Tutorial for more info.

## 2. Add Gulp File
Add your `gulpfile.js` to the root of your project.

Set the destination of your gulp task to `./compartments/assts/styles`

This is where all of your stylesheets for your Airship project must go

Example gulpfile:

```
var gulp = require('gulp'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass');
  autoprefixer = require('gulp-autoprefixer');

gulp.task('js', function() {
  gulp.src('src/app.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('compartments/assets/scripts'));
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
```

## 3. Add Serve Script to package.json

So you don't have to run your airship server and gulp in separate windows, add this to your `package.json`:

```
"scripts": {
  "start": "concurrently --kill-others \"airship serve\" \"gulp\""
}
```

## 4. Compile

Run `yarn start` in your terminal

This will run your airship server and gulp concurrently.

Your app will be served on `localhost:9001`.
