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
yarn add gulp gulp-sass gulp-autoprefixer
```
or
```
npm i gulp gulp-sass gulp-autoprefixer
```

## 2. Add Gulp File
Add your `gulpfile.js` to the root of your project.

Set the destination of your gulp task to `./compartments/assts/styles`

This is where all of your stylesheets for your Airship project must go

Example gulpfile:

```
var gulp = require('gulp'),
  sass = require('gulp-sass');
  autoprefixer = require('gulp-autoprefixer');

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
});

gulp.task('default', ['watch', 'sass']);
```

## 3. Run the Project

In another terminal window, run:
```
airship serve
```

This command will start your airship server.
Open your browser and navigate to `localhost:9001`.
