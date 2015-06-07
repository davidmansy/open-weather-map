/**
 * Created by davidmansy on 26/05/15.
 */
angular
  .module('OWMApp', ['ngRoute', 'ngAnimate'])
  .value('owmCities', ['New York', 'Chicago', 'Dallas'])
  .config(Routing)
  .run(ListenRoutingErrors);

Routing.$inject = ['$routeProvider'];
ListenRoutingErrors.$inject = ['$rootScope', '$location', '$timeout'];

function Routing($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'HomeCtrl as vm'
  })
  .when('/cities/:city', {
    templateUrl: 'city.html',
    controller: 'CityCtrl as vm',
    resolve: {
      city: function(owmCities, $route, $location) {
        var city = $route.current.params.city;
        city = city.replace('_', ' ');
        if (owmCities.indexOf(city) === -1) {
          $location.path('/error');
          return;
        }
        return city;
      }
    }
  })
  .when('/error', {
    template: '<p>Error - Page not found!</p>'
  });
}

function ListenRoutingErrors($rootScope, $location, $timeout) {
  $rootScope.$on('$routeChangeError', function() {
    $location.path('/error');
  });
  $rootScope.$on('$routeChangeStart', function () {
    $rootScope.isLoading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function () {
    $timeout(function () {
      $rootScope.isLoading = false;
    }, 1000);
  })
}