'use strict';

(function (angular) {
  'use strict';

  angular.module('app', ['ngRoute']).config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when("/", {
      templateUrl: 'assets/scripts/templates/setup.html',
      controller: 'SetupController'
    }).when("/styling", {
      templateUrl: 'assets/scripts/templates/styling.html',
      controller: 'StylingController'
    }).when("/airship-schema", {
      templateUrl: 'assets/scripts/templates/airship-schema.html',
      controller: 'AirshipSchemaController'
    }).when("/angular-tutorial", {
      templateUrl: 'assets/scripts/templates/tutorial.html',
      controller: 'TutorialController'
    }).when("/elements", {
      templateUrl: '/assets/scripts/templates/elements.html',
      controller: 'ElementsController'
    }).when("/elements/:id", {
      templateUrl: '/assets/scripts/templates/element.html',
      controller: 'ElementController'
    });
  }).controller('SetupController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $http.get('http://angular-1-gulp-babel.airshipcms.io/api/pages/__root__').then(function (res) {
      $scope.title = res.data.name;
      res.data.fields.forEach(function (field) {
        switch (field.variable_name) {
          case 'body':
            $scope[field.variable_name] = $sce.trustAsHtml(field.value);
            break;
          default:
            $scope[field.variable_name] = field.value;
            break;
        }
      });
    });
  }]).controller('ElementsController', ['$scope', '$http', function ($scope, $http) {
    $http.get('http://angular-1-gulp-babel.airshipcms.io/api/aerostat_collection/elements?limit=20&sort=sorting_position').then(function (res) {
      $scope.elements = res.data.map(function (element) {
        element.fields.forEach(function (field) {
          switch (field.variable_name) {
            default:
              element[field.variable_name] = { value: field.value };
              break;
          }
        });
        return element;
      });
    });
  }]).controller('ElementController', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $http.get('http://angular-1-gulp-babel.airshipcms.io/api/aerostats/' + $route.current.params.id).then(function (res) {
      $scope.element = res.data;
      $scope.element.fields.forEach(function (field) {
        switch (field.variable_name) {
          default:
            $scope.element[field.variable_name] = { value: field.value };
            break;
        }
      });
    }).catch(function (err) {
      throw err;
    });
  }]).controller('StylingController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $http.get('http://angular-1-gulp-babel.airshipcms.io/api/pages/styling').then(function (res) {
      res.data.fields.forEach(function (field) {
        switch (field.variable_name) {
          case 'body':
            $scope[field.variable_name] = $sce.trustAsHtml(field.value);
            break;
          default:
            $scope[field.variable_name] = field.value;
            break;
        }
      });
    }).catch(function (err) {
      throw err;
    });
  }]).controller('AirshipSchemaController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $http.get('http://angular-1-gulp-babel.airshipcms.io/api/pages/airship-schema').then(function (res) {
      res.data.fields.forEach(function (field) {
        switch (field.variable_name) {
          case 'body':
            $scope[field.variable_name] = $sce.trustAsHtml(field.value);
            break;
          default:
            $scope[field.variable_name] = field.value;
            break;
        }
      });
    }).catch(function (err) {
      throw err;
    });
  }]).controller('TutorialController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $http.get('http://angular-1-gulp-babel.airshipcms.io/api/pages/angular-tutorial').then(function (res) {
      res.data.fields.forEach(function (field) {
        switch (field.variable_name) {
          case 'body':
            $scope[field.variable_name] = $sce.trustAsHtml(field.value);
            break;
          default:
            $scope[field.variable_name] = field.value;
            break;
        }
      });
    }).catch(function (err) {
      throw err;
    });
  }]);
})(window.angular);