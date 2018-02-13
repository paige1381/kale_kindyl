const app = angular.module('kale-kindyl', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {
  this.menu = false;
}])

app.controller('HomeController', ['$http', function($http) {

  this.url = 'http://localhost:3000/recipes/';

  this.imageIds = ['img-1', 'img-4', 'img-2', 'img-3', 'img-3', 'img-2'];

  this.getSnapshotRecipes = () => {
    $http({
      method: 'GET',
      url: this.url + 'homeSnapshot'
    }).then(response => {
      this.snapshotRecipes = response.data;
      for (let i = 0; i < this.snapshotRecipes.length; i++) {
        this.snapshotRecipes[i].imageId = this.imageIds[i]
      }
      console.log(this.snapshotRecipes);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getSnapshotRecipes();

}])

app.controller('CreateController', function() {

})

app.controller('AboutController', function() {

})

app.controller('RecipesController', function() {

})

app.controller('RecipeTypeController', function() {

})

app.controller('RecipeController', function($http, $routeParams) {

  this.url = 'http://localhost:3000/recipes/';

  this.recipeId = $routeParams.id;

  this.getRecipe = () => {
    $http({
      method: 'GET',
      url: this.url + this.recipeId
    }).then(response => {
      this.recipe = response.data;
      console.log(this.recipe);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getRecipe();
})


app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({ enabled: true });

  $routeProvider.when('/home', {
    templateUrl: 'home.html',
    controller: 'HomeController',
    controllerAs: 'ctrl'
  });

  $routeProvider.when('/create', {
    templateUrl: 'create.html',
    controller: 'CreateController',
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

  $routeProvider.when('/recipe/:id', {
    templateUrl: 'recipe.html',
    controller: 'RecipeController',
    controllerAs: 'ctrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/home'
  })


}])
