const app = angular.module('kale-kindyl', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {
  this.menu = false;
}])


app.controller('HomeController', ['$http', function($http) {

  this.url = 'http://localhost:3000/recipes/';

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


app.controller('CreateController', function($http) {

  this.url = 'http://localhost:3000/recipes/';
  this.formData = {};
  this.tagCount = 0;
  this.tags = [];

  this.processCreateForm = () => {
    console.log(this.formData);
    $http({
      method: 'POST',
      url: this.url,
      data: this.formData
    }).then(response => {
      console.log(response.data);
      this.formData = {};
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.addTag = () => {
    this.tagCount ++;
    this.tags.push(this.tagCount - 1);
    console.log('this.tags:', this.tags);
    console.log('this.tagCount:', this.tagCount);
  }

  this.removeTag = (index) => {
    this.tagCount --;
    this.tags.splice(index, 1);
    console.log('this.tags:', this.tags);
    console.log('this.tagCount:', this.tagCount);
  }
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


app.controller('RecipeTypeController', function($http, $routeParams) {

  this.url = 'http://localhost:3000/recipes/';

  if ($routeParams.id === "all") {
    this.recipeTypeId = "";
  }
  else {
    this.recipeTypeId = $routeParams.id;
  }

  switch($routeParams.id) {
    case "all":
      this.recipeTypeTitle = "All Recipes"
      break;
    case "entree":
      this.recipeTypeTitle = "Entrees"
      break;
    case "breakfast":
      this.recipeTypeTitle = "Breakfasts"
      break;
    case "dessert":
      this.recipeTypeTitle = "Desserts"
      break;
    case "side":
      this.recipeTypeTitle = "Sides/Snacks"
      break;
    case "drink":
      this.recipeTypeTitle = "Drinks"
      break;
  }

  this.getRecipeType = () => {
    $http({
      method: 'GET',
      url: this.url + this.recipeTypeId
    }).then(response => {
      this.recipeType = response.data;
      console.log(this.recipeType);
      console.log(this.recipeTypeTitle);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getRecipeType();
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

  this.getTags = () => {
    $http({
      method: 'GET',
      url: this.url + this.recipeId + '/tags'
    }).then(response => {
      this.tags = response.data;
      console.log(this.recipe);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getTags();

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

  $routeProvider.when('/recipetype/:id', {
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
