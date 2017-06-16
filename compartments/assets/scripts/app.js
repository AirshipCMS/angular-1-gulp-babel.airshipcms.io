'use strict';

(function (angular) {
  'use strict';

  angular.module('app', ['ngRoute']).config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when("/", {
      templateUrl: '/assets/scripts/templates/setup.html',
      controller: 'SetupController'
    }).when("/styling", {
      templateUrl: '/assets/scripts/templates/styling.html',
      controller: 'StylingController'
    }).when("/airship-schema", {
      templateUrl: '/assets/scripts/templates/airship-schema.html',
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
    }).otherwise({
      templateUrl: '/assets/scripts/templates/404.html'
    });
  }).directive('navBar', function () {

    function link(scope) {
      scope.active = window.location.pathname.split('/')[1];
    }

    return {
      templateUrl: '/assets/scripts/templates/nav.html',
      link: link
    };
  }).directive('navGithub', function () {
    return {
      templateUrl: '/assets/scripts/templates/nav-github.html'
    };
  }).directive('navToggle', function () {
    function link(scope, element, attrs) {
      var $menu = $('#nav-menu');

      element.click(function () {
        $(this).toggleClass('is-active');
        $menu.toggleClass('is-active');
      });
    }

    return {
      link: link,
      templateUrl: '/assets/scripts/templates/nav-toggle.html'
    };
  }).controller('SetupController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $http.get('/api/pages/__root__').then(function (res) {
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
    $http.get('/api/aerostat_collection/elements?limit=20&sort=sorting_position').then(function (res) {
      $scope.elements = res.data.map(function (element) {
        element.fields.forEach(function (field) {
          element[field.variable_name] = { value: field.value };
        });
        return element;
      });
    });
  }]).controller('ElementController', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $http.get('/api/aerostats/' + $route.current.params.id).then(function (res) {
      $scope.element = res.data;
      $scope.element.fields.forEach(function (field) {
        $scope.element[field.variable_name] = { value: field.value };
      });
    }).catch(function (err) {
      throw err;
    });
  }]).controller('StylingController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $http.get('/api/pages/styling').then(function (res) {
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
    $http.get('/api/pages/airship-schema').then(function (res) {
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
    $http.get('/api/pages/angular-tutorial').then(function (res) {
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