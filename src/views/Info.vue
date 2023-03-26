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
                    <img v-bind:src="recipe.imageUrl" width="400" height="300" class="card-img" alt="pic">
                        <div class="card-body">
                            <p>{{recipe.Instructions}}</p>
                        </div>
                    </a>
                </div>
                <div class="col-md-6">
                    <a class="card">
                        <div class="card-body">
                          <p class="totalcalories">Total kcal:{{recipe.Total_kcal}}kcal</p>
                                    <p class="totalproteins">Proteins:{{recipe.Total_Protein}}g</p>
                                    <p class="totalfats">Fats:{{recipe.Total_Fats}}g</p>
                                    <p class="totalcarbs">Carbs:{{recipe.Total_Carbs}}g</p>
                                    <p class="servings">Servings:{{recipe.Servings}}</p>
                                    <p class="style">Style:{{recipe.Style}}</p>
                            <p>Ingredients:</p>
                            <ul>
                                <li><div v-for="(ingredientDetail, index) in ingredientDetails" :key="index">
                                        <p class="ingredients_values">{{ ingredients[index].Ingredient_Name }}
                                          {{ ingredient.Ingredient_Name }}
                                          {{ ingredient.Quantity }}
                                          {{ this.ingredientUnits[index] }}
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
        recipe: this.$route.params.recipe,
        recipes: {},
        recipeId:{},
        ingredient: null,
        ingredients:{},
        ingredientIds: {},
        ingredientUnit: null,
        ingredientUnits:{},
        ingredientDetailIds: {},
        users:{},
        user:null

      }
    
        }
      ,
      async mounted () {
      console.log('Recipe Info')
      const db = getFirestore()
      const colRefRecipe = collection(db, "Recipe")
      //Aus Recipe_Ingredients sollen nur jene Dokumente abgerufen werden bei denen gilt:
      //ingredients = Recipe_Ingredients.Recipe_ID == this.recipeId

      // Aus "Ingredient" sollen nur Dokumente abgerufen werden bei denen gilt:
      //(ingredients Array aus vorheriger Abfrage) ingredients.Ingredient_Name == (Datenbank Ingredient) Ingredient.Ingredient_Name

      /*const q = query(collection(db, "Recipe_Ingredients"), where("Ingredient_Name", "==", this.firstingredient));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());*/
        const q1 = query(collection(db, "Recipe"), where ("Recipe_Name", "==", this.recipe))
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          this.recipeId = querySnapshot1.docs.map(doc => doc.data().Recipe_ID);
          this.recipes =querySnapshot1.docs.map(doc => doc.data())
        console.log(this.recipeId)
        })
      
        console.log("fetching ingredients");
      let ingredient_count = 0;
      const q = query(collection(db, "Recipe_Ingredients"), where ("Recipe_ID", "==", this.recipeId[0]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.ingredients = querySnapshot.docs.map(doc => doc.data());
        this.ingredientName = querySnapshot.docs.map(doc => doc.data().Ingredient_Name);
        ingredient_count = ingredient_count + 1;
      });
      console.log("these are the Ingredients:", this.ingredientName);
      for (let i = 0; i < ingredient_count; i++) {
        console.log("these are the Ingredients:", this.ingredientName[i]);
      }


      console.log("fetching ingredient details");
for (let i = 0; i < ingredient_count; i++) {
  const q2 = query(collection(db, "Ingredient"), where ("Ingredient_Name", "==", this.ingredientName[i]));
  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach((doc) => {
    this.ingredientUnits.push(doc.data().Unit);
  });
  /*this.ingredientUnits.push(detailsArray);*/
  console.log(this.ingredientName[i]);
  console.log("ingredient details:", this.ingredientUnits);
}},
    
  methods: {
     
     setFavorite(){
      console.log("getting User_ID")
      const dbUser = getFirestore()
      const colRefUser = collection(dbUser, "User")
      onSnapshot(colRefUser, snapShot => {
        this.userIds = snapShot.docs.map(doc => doc.id)
      })
      console.log(this.userIds)
      console.log("setting recipe as a favorite")
      const db = getFirestore()
      const q = query(collection(db, 'Favorites'))
      onSnapshot(q, snapShot => {
        
      })

    }
    
      
  }}
    </script>
    <style scoped>
    p{
      text-align: left;
    }
    </style>