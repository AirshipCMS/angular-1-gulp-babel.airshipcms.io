# Angular Tutorial
**Complete the Airship Schema tutorial before starting this Angular Tutorial.** This Angular Tutorial explains how Angular was set up and used to render the pages and collections for this application.

## 1. Add Dependencies
In your project, navigate to `compartments/templates/root.html`.  
Add the angular and angular-route scripts.

Install gulp, gulp-babel, babel-preset-env and concurrently.

```
yarn add gulp gulp-sass gulp-autoprefixer babel-preset-env concurrently
```

`gulp-sass` and `gulp-autoprefixer` were used to compile Sass to CSS. Checkout Styling for more info.

## 2. Add Gulp File
Create a `gulpfile.js` file at the root of your project.

Set the gulp task's destination to `compartments/assets/scripts`.

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

## 4. Initialize Angular App

At the root of your project, create a directory named `src`.
In this new directory, create a file named `app.js`. Your angular code will go in this file.
Gulp will compile this file into `/assets/scripts/app.js`.

In `compartments/templates/root.html`, add a script tag that points to `/assets/scripts/app.js`.

In `root.html`, add the container for the angular app right above the scripts.
```
<base href="/">  
<div ng-app="app">  
  <ng-view></ng-view>  
</div>  
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>  
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>  
<script src="assets/scripts/app.js"></script>
```

## 5. Create Templates
In `compartments/assets/scripts` create a directory named `templates`. All of your SPA templates will go in this directory.

When referencing your templates from `app.js`, use the following format: `/assets/scripts/templates/filename.html`

## 6. Binding Page and Collection Data
To display page and collection content, you will need use the Airship API.

### Display Page Content using Airship API
Make a GET request to `https://yoursite.airshipcms.io/api/pages/page-name`. 
For the `__root__` page in this repo, the full GET request URL is: 
```
https://yourdomain.airshipcms.io/api/pages/__root__
```

In the response object, you will see an array name `fields`. This array contains an object for each field associated with the page.

The `__root__` page container a "Github" field, "Description" field, and a "Body" field. The `Airship Schema` page, `Angular Tutorial` page and `Styling` page all have a "Body" field.

Each field contains these properties:
```
num_options: int
options: []
sorting_position: int
title: string
type: string
value: string
variable_name: string
```

The `value` property is what you will bind to your templates.

Because the "Body" field's type contains HTML, to bind this field, you have to use Angular's `ng-bind-html` directive instead of `{{ body }}`.

To prevent "unsafe" errors, you will need to sanitize the field's value with `$sce.trustAsHtml`.

JS: 
```
.controller('SetupController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  $http.get('https://yourdomain.airshipcms.io/api/pages/__root__')
    .then(function(res) {
      res.data.fields.forEach(function(field) {
        switch(field.variable_name) {
          case 'body':
            $scope[field.variable_name] = $sce.trustAsHtml(field.value); //sanitze html
            break;
          default:
            $scope[field.variable_name] = field.value;
            break;
        }
      })
    })
  }])
```

Template:
```
<div>  
  <p>{{ description }}</p>  
  <div ng-bind-html='body' class='body'></div>  
</div>
```

### Display Collection Content using Airship API
Make a GET request to `/api/aerostat_collection/collection-permalink`. 
For the `elements` collection in this repo, the full GET request URL is: 
```
https://yourdomain.airshipcms.io/api/pages/__root__
``` 

This will return an array of items.

Each item contains a number of properties. The `fields` array is the only property used in this demo. The `fields` for the `elements` collection are "Name", "Image", and "Description".

The response object structure is same as Page Fields, where each field contains these properties:
```
num_options: int
options: []
sorting_position: int
title: string
type: string
value: string
variable_name: string
```

Set `$scope.elements` to the response object.

JS:
```
.controller('ElementsController', ['$scope', '$http', function($scope, $http) {
  $http.get('https://yourdomain.airshipcms.io/api/aerostat_collection/elements?limit=20&sort=sorting_position')
    .then(function(res) {
      $scope.elements = res.data.map(function(element) {
        element.fields.forEach(function(field) {
          switch(field.variable_name) {
            default:
              element[field.variable_name] = { value: field.value };
              break;
          }
        });
        return element
      });
    })
  }])
```

In your template, display the "name" and "image" of each element by using Angular's `ng-repeat` directive.

Template:
```
<div>  
  <a href='/elements/{{ element.id }}' class='element' ng-repeat='element in elements'>  
    <div class='card'>  
      <div class='card-image'>  
        <figure class="image">  
          <img src="{{ element.image.value[0].thumbnail_url }}" alt="{{ element.value[0].file_name }}">  
        </figure>  
      </div>  
      <div class='card-content'>  
        <div class="media-content">  
          <p class="title is-4">{{ element.name.value }}</p>  
        </div>  
      </div>  
  </div>  
  </a>  
</div>
```

## 7. Run the Project

Run `yarn start` in your terminal

This will run your airship server and gulp concurrently.

Your app will be served on `localhost:9001`.
