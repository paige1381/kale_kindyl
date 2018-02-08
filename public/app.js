const app = angular.module('kale-kindyl', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {
  this.menu = false;
}])

app.controller('HomeController', function() {

})

app.controller('AboutController', function() {

})

app.controller('RecipesController', function() {

})

app.controller('RecipeTypeController', function() {

})

app.controller('RecipeController', function() {

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

  $routeProvider.when('/recipes', {
    templateUrl: 'recipes.html',
    controller: 'RecipesController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/recipetype', {
    templateUrl: 'recipetype.html',
    controller: 'RecipeTypeController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/recipe', {
    templateUrl: 'recipe.html',
    controller: 'RecipeController',
    controllerAs: 'ctrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/home'
  })


}])
