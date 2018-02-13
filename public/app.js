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

app.controller('RecipesController', function($http) {

  this.url = 'http://localhost:3000/recipes/';

  this.getSnapShotAll = () => {
    $http({
      method: 'GET',
      url: this.url + 'homeSnapshot'
    }).then(response => {
      this.snapshotAll = response.data;
      console.log(this.snapshotAll);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getSnapShotAll();


  this.getSnapShotEntree = () => {
    $http({
      method: 'GET',
      url: this.url + 'entreeSnapshot'
    }).then(response => {
      this.snapshotEntree = response.data;
      console.log(this.snapshotEntree);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getSnapShotEntree();


  this.getSnapShotBreakfast = () => {
    $http({
      method: 'GET',
      url: this.url + 'breakfastSnapshot'
    }).then(response => {
      this.snapshotBreakfast = response.data;
      console.log(this.snapshotBreakfast);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getSnapShotBreakfast();


  this.getSnapShotDessert = () => {
    $http({
      method: 'GET',
      url: this.url + 'dessertSnapshot'
    }).then(response => {
      this.snapshotDessert = response.data;
      console.log(this.snapshotDessert);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getSnapShotDessert();


  this.getSnapShotSide = () => {
    $http({
      method: 'GET',
      url: this.url + 'sideSnapshot'
    }).then(response => {
      this.snapshotSide = response.data;
      console.log(this.snapshotSide);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getSnapShotSide();


  this.getSnapShotDrink = () => {
    $http({
      method: 'GET',
      url: this.url + 'drinkSnapshot'
    }).then(response => {
      this.snapshotDrink = response.data;
      console.log(this.snapshotDrink);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getSnapShotDrink();
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
