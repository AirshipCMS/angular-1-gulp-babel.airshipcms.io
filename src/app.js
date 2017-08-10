(function(angular) {
  "use strict";
  angular
    .module("app", ["ngRoute"])
    .config(function($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);

      $routeProvider
        .when("/", {
          templateUrl: "/assets/scripts/templates/setup.html",
          controller: "SetupController"
        })
        .when("/styling", {
          templateUrl: "/assets/scripts/templates/styling.html",
          controller: "StylingController"
        })
        .when("/airship-schema", {
          templateUrl: "/assets/scripts/templates/airship-schema.html",
          controller: "AirshipSchemaController"
        })
        .when("/angular-tutorial", {
          templateUrl: "assets/scripts/templates/tutorial.html",
          controller: "TutorialController"
        })
        .when("/elements", {
          templateUrl: "/assets/scripts/templates/elements.html",
          controller: "ElementsController"
        })
        .when("/elements/:id", {
          templateUrl: "/assets/scripts/templates/element.html",
          controller: "ElementController"
        })
        .otherwise({
          templateUrl: "/assets/scripts/templates/404.html"
        });
    })
    .directive("navBar", function() {
      function link(scope) {
        scope.active = window.location.pathname.split("/")[1];
      }

      return {
        templateUrl: "/assets/scripts/templates/nav.html",
        link: link
      };
    })
    .directive("navGithub", function() {
      return {
        templateUrl: "/assets/scripts/templates/nav-github.html"
      };
    })
    .directive("navToggle", function() {
      function link(scope, element, attrs) {
        var $menu = $("#nav-menu");

        element.click(function() {
          $(this).toggleClass("is-active");
          $menu.toggleClass("is-active");
        });
      }

      return {
        link: link,
        templateUrl: "/assets/scripts/templates/nav-toggle.html"
      };
    })
    .controller("SetupController", [
      "$scope",
      "$http",
      "$sce",
      function($scope, $http, $sce) {
        $http
          .get("/api/pages/__root__")
          .then(function(res) {
            $scope.title = res.data.name;
            // handle specific field behaviors
            Object.assign(
              $scope,
              res.data.fields
                .map(function(field) {
                  switch (field.variable_name) {
                    case "body": // do not html escape 'body' field
                      return {
                        [field.variable_name]: $sce.trustAsHtml(field.value)
                      };
                    default:
                      return { [field.variable_name]: field.value };
                  }
                })
                .reduce(function(fields, field) {
                  return Object.assign(fields, field);
                }, {})
            );
          })
          .catch(console.error);
      }
    ])
    .controller("ElementsController", [
      "$scope",
      "$http",
      function($scope, $http) {
        $http
          .get(
            "/api/aerostat_collection/elements?limit=20&sort=sorting_position"
          )
          .then(function(res) {
            $scope.elements = res.data.map(function(element) {
              Object.assign(
                element,
                element.fields
                  .map(function(field) {
                    return { [field.variable_name]: field.value };
                  })
                  .reduce(function(fields, field) {
                    return Object.assign(fields, field);
                  }, {})
              );
              return element;
            });
          })
          .catch(console.error);
      }
    ])
    .controller("ElementController", [
      "$scope",
      "$http",
      "$route",
      function($scope, $http, $route) {
        $http
          .get("/api/aerostats/" + $route.current.params.id)
          .then(function(res) {
            $scope.element = {};
            Object.assign(
              $scope.element,
              res.data.fields
                .map(function(field) {
                  return { [field.variable_name]: field.value };
                })
                .reduce(function(fields, field) {
                  return Object.assign(fields, field);
                }, {})
            );
          })
          .catch(console.error);
      }
    ])
    .controller("StylingController", [
      "$scope",
      "$http",
      "$sce",
      function($scope, $http, $sce) {
        $http
          .get("/api/pages/styling")
          .then(function(res) {
            // handle specific field behaviors
            Object.assign(
              $scope,
              res.data.fields
                .map(function(field) {
                  switch (field.variable_name) {
                    case "body": // do not html escape 'body' field
                      return {
                        [field.variable_name]: $sce.trustAsHtml(field.value)
                      };
                    default:
                      return { [field.variable_name]: field.value };
                  }
                })
                .reduce(function(fields, field) {
                  return Object.assign(fields, field);
                }, {})
            );
            loadPrism();
          })
          .catch(console.error);
      }
    ])
    .controller("AirshipSchemaController", [
      "$scope",
      "$http",
      "$sce",
      function($scope, $http, $sce) {
        $http
          .get("/api/pages/airship-schema")
          .then(function(res) {
            // handle specific field behaviors
            Object.assign(
              $scope,
              res.data.fields
                .map(function(field) {
                  switch (field.variable_name) {
                    case "body": // do not html escape 'body' field
                      return {
                        [field.variable_name]: $sce.trustAsHtml(field.value)
                      };
                    default:
                      return { [field.variable_name]: field.value };
                  }
                })
                .reduce(function(fields, field) {
                  return Object.assign(fields, field);
                }, {})
            );
          })
          .catch(console.error);
      }
    ])
    .controller("TutorialController", [
      "$scope",
      "$http",
      "$sce",
      function($scope, $http, $sce) {
        $http
          .get("/api/pages/angular-tutorial")
          .then(function(res) {
            // handle specific field behaviors
            Object.assign(
              $scope,
              res.data.fields
                .map(function(field) {
                  switch (field.variable_name) {
                    case "body": // do not html escape 'body' field
                      return {
                        [field.variable_name]: $sce.trustAsHtml(field.value)
                      };
                    default:
                      return { [field.variable_name]: field.value };
                  }
                })
                .reduce(function(fields, field) {
                  return Object.assign(fields, field);
                }, {})
            );
            loadPrism();
          })
          .catch(console.error);
      }
    ]);
})(window.angular);
