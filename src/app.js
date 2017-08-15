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
    .directive("navBar", () => ({
      templateUrl: "/assets/scripts/templates/nav.html",
      link: scope => scope.active = window.location.pathname.split("/").pop()
    }))
    .directive("navGithub", () => ({
      templateUrl: "/assets/scripts/templates/nav-github.html"
    }))
    .directive("navToggle", () => ({
      link: (scope, element, attrs) => {
        var $menu = $("#nav-menu");

        element.click(() => {
          $(this).toggleClass("is-active");
          $menu.toggleClass("is-active");
        });
      },
      templateUrl: "/assets/scripts/templates/nav-toggle.html"
    }))
    .controller("SetupController", [
      "$scope",
      "$http",
      "$sce",
      ($scope, $http, $sce) => {
        $http
          .get("/api/pages/__root__")
          .then((res) => {
            $scope.title = res.data.name;
            // handle specific field behaviors
            Object.assign(
              $scope,
              res.data.fields
                .map((field) => {
                  switch (field.variable_name) {
                    case "body": // do not html escape 'body' field
                      return {
                        [field.variable_name]: $sce.trustAsHtml(field.value)
                      };
                    default:
                      return { [field.variable_name]: field.value };
                  }
                })
                .reduce((fields, field) => Object.assign(fields, field), {})
            );
          })
          .catch(console.error);
      }
    ])
    .controller("ElementsController", [
      "$scope",
      "$http",
      ($scope, $http) => {
        $http
          .get(
            "/api/aerostat_collection/elements?limit=20&sort=sorting_position"
          )
          .then((res) => {
            $scope.elements = res.data.map((element) => {
              Object.assign(
                element,
                element.fields
                  .map((field) => {
                    return { [field.variable_name]: field.value };
                  })
                  .reduce((fields, field) => Object.assign(fields, field), {})
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
      ($scope, $http, $route) => {
        $http
          .get("/api/aerostats/" + $route.current.params.id)
          .then((res) => {
            $scope.element = {};
            Object.assign(
              $scope.element,
              res.data.fields
                .map((field) => (
                  { [field.variable_name]: field.value }
                ))
                .reduce((fields, field)  => Object.assign(fields, field), {})
            );
          })
          .catch(console.error);
      }
    ])
    .controller("StylingController", [
      "$scope",
      "$http",
      "$sce",
      ($scope, $http, $sce) => {
        $http
          .get("/api/pages/styling")
          .then((res) => {
            // handle specific field behaviors
            Object.assign(
              $scope,
              res.data.fields
                .map((field) => {
                  switch (field.variable_name) {
                    case "body": // do not html escape 'body' field
                      return {
                        [field.variable_name]: $sce.trustAsHtml(field.value)
                      };
                    default:
                      return { [field.variable_name]: field.value };
                  }
                })
                .reduce((fields, field) => Object.assign(fields, field), {})
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
      ($scope, $http, $sce) => {
        $http
          .get("/api/pages/airship-schema")
          .then((res) => {
            // handle specific field behaviors
            Object.assign(
              $scope,
              res.data.fields
                .map((field)  => {
                  switch (field.variable_name) {
                    case "body": // do not html escape 'body' field
                      return {
                        [field.variable_name]: $sce.trustAsHtml(field.value)
                      };
                    default:
                      return { [field.variable_name]: field.value };
                  }
                })
                .reduce((fields, field) => Object.assign(fields, field), {})
            );
          })
          .catch(console.error);
      }
    ])
    .controller("TutorialController", [
      "$scope",
      "$http",
      "$sce",
      ($scope, $http, $sce) => {
        $http
          .get("/api/pages/angular-tutorial")
          .then((res) => {
            // handle specific field behaviors
            Object.assign(
              $scope,
              res.data.fields
                .map((field)  => {
                  switch (field.variable_name) {
                    case "body": // do not html escape 'body' field
                      return {
                        [field.variable_name]: $sce.trustAsHtml(field.value)
                      };
                    default:
                      return { [field.variable_name]: field.value };
                  }
                })
                .reduce((fields, field) => Object.assign(fields, field), {})
            );
            loadPrism();
          })
          .catch(console.error);
      }
    ])
})(window.angular);
