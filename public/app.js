const app = angular.module('kale-kindyl', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {
  this.menu = false;
}])

app.controller('HomeController', function() {

})

app.controller('AboutController', function() {

})


app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({ enabled: true });

  $routeProvider.when('/home', {
    templateUrl: 'home.html',
    controller: 'HomeController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/about', {
  templateUrl: 'about.html',
  controller: 'AboutController',
  controllerAs: 'ctrl'
});

$routeProvider.otherwise({
  redirectTo: '/home'
})


}])
