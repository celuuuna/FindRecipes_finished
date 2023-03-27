<template>
  <html lang="en">
    <head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Start your development with Dorang landing page.">
    <meta name="author" content="Devcrud">
    <title>Info Recipe</title>


</head>
<nav id="nav" class="page-navbar" data-spy="affix" data-offset-top="10">
        <ul class="nav-navbar container">
            <li class="nav-item">
              <router-link to="/">
                <a class="nav-link">Home</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="../recipes">
               <a class="nav-link">Recipes</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/">
               <a class="nav-link"><img src="../assets/imgs/logo.png" ></a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="../profile">
                <a class="nav-link">Profile</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="../signin">
                <a class="nav-link">Login/Logout</a>
              </router-link>
            </li>
            
        </ul>
    </nav>
<br><br><br><br>


<body
    data-spy="scroll"
    data-target=".navbar"
    data-offset="40"
    id="home"
    class="dark-theme">

    <div class="theme-selector">
        <a href="javascript:void(0)" class="spinner">
            <i class="ti-paint-bucket"></i>
        </a>
        <div class="body">
            <a href="javascript:void(0)" class="light"></a>
            <a href="javascript:void(0)" class="dark"></a>
        </div>
    </div>

    <!-- page container -->
    <div class="container page-container" v-for="(recipe, key) in recipes" :key='key'>
        <div class="col-md-10 col-lg-8 m-auto">
            <h6 class="title mb-4">{{ recipe.Recipe_Name }}</h6>
        </div>

        <div class="row mb-5">
            <div class="col-md-6">
                <a class="card">
                  <!-- access picture from imgs according to the image data stored in the database for every recipe-->
                    <img v-bind:src="`../src/assets/imgs/${recipe.image}`" width="400" height="300" class="card-img" alt="pic">
                        <div class="card-body">
                          <!--Print the instructions of the accessed recipe-->
                            <p>{{recipe.Instructions}}</p>
                        </div>
                    </a>
                </div>
                <div class="col-md-6">
                    <a class="card">
                        <div class="card-body">
                          <!--print Servings and Style of the recipe retrieved from the database-->
                                    <p class="servings">Servings:{{recipe.Servings}}</p>
                                    <p class="style">Style:{{recipe.Style}}</p>
                            <p>Ingredients:</p>
                            <ul>
                              <!--loop over the objects stored in ingredients 
                              continue to print the name, quantity and unit 
                              of the specific ingredient accordingly to the recipe-->
                                <li><div v-for="(ingredient, index) in ingredients" :key="index">
                                        <p class="ingredients_values">
                                          {{ ingredient.Ingredient_Name }}
                                          {{ ingredient.Quantity }}
                                          {{ this.ingredientUnits[index]}}
                                        </p>
                                    </div></li>
                            </ul>
                        </div>
                    </a>
                </div>
            </div>
            <!-- end of page container -->
        </div>
</body>
</html>
    </template>
    <script>
    import {where, query, collection, onSnapshot, doc, getFirestore, getDocs} from "firebase/firestore"


    
    export default {
      name: 'Recipe',
      data () {
        return {
          //this is where all of the data relevant for recipe, ingredients and ingredient details get stored
        recipe: this.$route.params.recipe,
        recipes: {},
        recipeId:{},
        ingredient: null,
        ingredients:{},
        ingredientName: [],
        ingredientUnit: null,
        ingredientUnits:[],
        ingredientDetailIds: {},
        users:{},
        user:null

      }
    
        }
      ,
      async mounted () {
      console.log('Recipe Info')
      const db = getFirestore()
      //query to only access documents in the 'Recipe' database where the recipe name equals to the accessed recipe
        const q1 = query(collection(db, "Recipe"), where ("Recipe_Name", "==", this.recipe))
        const querySnapshot1 = await getDocs(q1);
        //for every found document add the Recipe_ID to the recipeId array and the data to the recipes array
        querySnapshot1.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          this.recipeId = querySnapshot1.docs.map(doc => doc.data().Recipe_ID);
          this.recipes =querySnapshot1.docs.map(doc => doc.data())
        console.log(this.recipeId)
        })
      
        console.log("fetching ingredients");
        //variable to enable a for loop according to the number of ingredients needed for the recipe
      let ingredient_count = 0;
      //query to only retrieve documents/Ingredients where the Recipe_ID equals to the recipeId of the accessed recipe
      //the recipe_Ingredient contains Recipe_ID, Ingredient_Name and the Quantity of the ingredient needed for the recipe 
      const q = query(collection(db, "Recipe_Ingredients"), where ("Recipe_ID", "==", this.recipeId[0]));
      const querySnapshot = await getDocs(q);
      //for every document add the whole data into the ingredients array and add the Ingredient_Name to the ingredientName array
      //additionally increase the count for the ingredients by 1
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.ingredients = querySnapshot.docs.map(doc => doc.data());
        this.ingredientName = querySnapshot.docs.map(doc => doc.data().Ingredient_Name);
        ingredient_count = ingredient_count + 1;
      });
      //print the ingredients to check if right ingredients get fetched
      console.log("these are the Ingredients:", this.ingredientName);
      for (let i = 0; i < ingredient_count; i++) {
        console.log("these are the Ingredients:", this.ingredientName[i]);
      }


      console.log("fetching ingredient details");
      //use the ingredient counter to enable a for loop to iterate over the ingredientName array
      //in order to retrieve the names of the ingredients one by one and retrieve all of the documents
      //from the Ingredient collection where the Ingredient_Name equals to the data stored at the specific index of ingredientName
      for (let i = 0; i < ingredient_count; i++) {
        const q2 = query(collection(db, "Ingredient"), where ("Ingredient_Name", "==", this.ingredientName[i]));
        const querySnapshot2 = await getDocs(q2);
        //for every document found, add the Unit into the ingredientUnits array as we only need this information from the document
        querySnapshot2.forEach((doc) => {

          this.ingredientUnits.push(doc.data().Unit);
        });
        console.log(this.ingredientName[i]);
        console.log("ingredient details:", this.ingredientUnits);
      }


      //get Unit from the document in Ingredient where : Ingredient.Ingredient_Name == Recipe_Ingredient.Ingredient_Name 
      
      
    },
    
  methods: {
     
    
  }}
    </script>
    <style scoped>
    p{
      text-align: left;
    }
    </style>