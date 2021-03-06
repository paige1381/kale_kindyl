const app = angular.module('kale-kindyl', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {
  this.menu = false;
}])


app.controller('BioColController', ['$http', function($http) {

  this.url = 'http://localhost:3000/tags/';

  this.getTags = () => {
    $http({
      method: 'GET',
      url: this.url
    }).then(response => {
      this.tags = response.data;
      console.log(this.tags);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getTags();
}])


app.controller('HomeController', ['$http', function($http) {

  this.url = 'http://localhost:3000/recipes/';

  this.getSnapshotRecipes = () => {
    $http({
      method: 'GET',
      url: this.url + 'homeSnapshot'
    }).then(response => {
      this.snapshotRecipes = response.data;
      console.log(this.snapshotRecipes);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getSnapshotRecipes();

}])


app.controller('CreateController', function($http) {

  this.recipeData = {};
  this.ingredientsData = [];
  this.directionsData = [];
  this.numIngredientCategories = null;
  this.numDirectionCategories = null;

  this.ingredientCategories = () => {
    if (this.numIngredientCategories > this.ingredientsData.length) {
      this.numIngredientCategories = this.numIngredientCategories - this.ingredientsData.length;
      for (let i = 0; i < this.numIngredientCategories; i++) {
        this.ingredientsData.push({title: null, ingredients: []})
      }
    }
    else {
      this.ingredientsData.splice(this.numIngredientCategories, this.ingredientsData.length - this.numIngredientCategories);
    }
    console.log(this.ingredientsData);
    this.numIngredientCategories = null;
  }

  this.removeIngredientCategories = (index) => {
    this.ingredientsData.splice(index, 1);
    console.log(this.ingredientsData);
  }

  this.addIngredients = (index) => {
    console.log(index);
    this.ingredientsData[index].ingredients.push({title: null});
    console.log(this.ingredientsData[index]);
  }

  this.removeIngredients = (parentIndex, index) => {
    this.ingredientsData[parentIndex].ingredients.splice(index, 1);
  }

  this.directionCategories = () => {
    if (this.numDirectionCategories > this.directionsData.length) {
      this.numDirectionCategories = this.numDirectionCategories - this.directionsData.length;
      for (let i = 0; i < this.numDirectionCategories; i++) {
        this.directionsData.push({title: null, directions: []})
      }
    }
    else {
      this.directionsData.splice(this.numDirectionCategories, this.directionsData.length - this.numDirectionCategories);
    }
    console.log(this.directionsData);
    this.numDirectionCategories = null;
  }

  this.removeDirectionCategories = (index) => {
    this.directionsData.splice(index, 1);
    console.log(this.directionsData);
  }

  this.addDirections = (index) => {
    console.log(index);
    this.directionsData[index].directions.push({title: null});
    console.log(this.directionsData[index]);
  }

  this.removeDirections = (parentIndex, index) => {
    this.directionsData[parentIndex].directions.splice(index, 1);
  }

  this.getRecipes = () => {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/recipes/'
    }).then(response => {
      this.recipes = response.data;
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.processCreateForm = () => {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/recipes/',
      data: this.recipeData
    }).then(response => {
      for (let i = 0; i < this.ingredientsData.length; i++) {
        this.processIngredientCategories(response.data.id, this.ingredientsData[i]);
      }
      for (let i = 0; i < this.directionsData.length; i++) {
        this.processDirectionsCategories(response.data.id, this.directionsData[i]);
      }
      for (let i = 0; i < this.tags.length; i++) {
        console.log('TAGSSSSS', this.tags[i].id);
        if (this.tags[i].selected) {
          this.processTagsData(response.data.id, this.tags[i].id);
        }
      }
      this.recipeData = {};
      this.getRecipes();
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.processTagsData = (id, tagId) => {
    console.log(tagId);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/recipe_tags',
      data: {
        recipe_id: id,
        tag_id: tagId
      }
    }).then(response => {
      console.log(response.data);
      this.tags = {};
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.processIngredientCategories = (id, ingredientsData) => {
    console.log('ingredient categories');
    console.log('ingredientsData:', ingredientsData);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/recipes/' + id + '/ingredient_categories',
      data: {
        title: ingredientsData.title,
        recipe_id: id
      }
    }).then(response => {
      console.log(response.data);
      for (let i = 0; i < ingredientsData.ingredients.length; i++) {
        this.processsIngredients(response.data.id, ingredientsData.ingredients[i]);
      }
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.processsIngredients = (id, ingredientsData) => {
    console.log('ingredients');
    $http({
      method: 'POST',
      url: 'http://localhost:3000/ingredient_categories/' + id + '/ingredients',
      data: {
        title: ingredientsData.title,
        ingredient_category_id: id
      }
    }).then(response => {
      console.log(response.data);
      this.ingredientsData = {};
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.processDirectionsCategories = (id, directionsData) => {
    console.log('directions categories');
    $http({
      method: 'POST',
      url: 'http://localhost:3000/recipes/' + id + '/directions_categories',
      data: {
        title: directionsData.title,
        recipe_id: id
      }
    }).then(response => {
      console.log(response.data);
      for (let i = 0; i < directionsData.directions.length; i++) {
        this.processsDirections(response.data.id, directionsData.directions[i]);
      }
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.processsDirections = (id, directionsData) => {
    console.log('directions');
    $http({
      method: 'POST',
      url: 'http://localhost:3000/directions_categories/' + id + '/directions',
      data: {
        title: directionsData.title,
        directions_category_id: id
      }
    }).then(response => {
      console.log(response.data);
      this.directionsData = {};
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.getTags = () => {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/tags/'
    }).then(response => {
      this.tags = response.data;
      console.log(this.tags);
    }).catch(error => {
      console.log('error:', error);
    });
  }

  this.getTags();


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
  this.ingredients = [];
  this.directions = [];

  this.getIngredients = (id) => {
    console.log(id);
    $http({
      method: 'GET',
      url: 'http://localhost:3000/ingredient_categories/' + id
    }).then(response => {
      this.ingredients.push(response.data);
      console.log(this.ingredients);
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.getDirections = (id) => {
    console.log(id);
    $http({
      method: 'GET',
      url: 'http://localhost:3000/directions_categories/' + id
    }).then(response => {
      console.log(response.data);
      this.directions.push(response.data);
      console.log(this.directions);
    }).catch(error => {
      console.log('error:', error);
    })
  }

  this.getRecipe = () => {
    $http({
      method: 'GET',
      url: this.url + this.recipeId
    }).then(response => {
      this.recipe = response.data;
      console.log(this.recipe);
      console.log();
      for (let i = 0; i < this.recipe.ingredient_categories.length; i++) {
        this.getIngredients(this.recipe.ingredient_categories[i].id)
      }
      for (let i = 0; i < this.recipe.directions_categories.length; i++) {
        this.getDirections(this.recipe.directions_categories[i].id)
      }
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
