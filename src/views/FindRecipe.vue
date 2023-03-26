<template>
    <div class="FindRecipes">
        <h2>Use your leftovers in the best way</h2>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-3"/>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">
            <input type="ingredient_1" class="form-control" placeholder="first ingredient" v-model="firstingredient">
            <br>
            <!--Zutaten sollen ausgewählt werden können mit Buttons oder Dropdown Menü?-->

            <button @click="findRecipes" class="btn btn-success">Enter</button>
            <div class="col-sm-6 col-md-4" v-for="(recipe, key) in recipes" :key = 'key' >
                <p class="recipename">{{recipe.Recipe_Name}}</p>
                <router-link :to = "{path: 'info', name: 'Info', params:{recipe:recipe.Recipe_Name}}">
              <button class="btn btn-success" role="button">See Recipe</button>
             </router-link>
            
            </div>
        </div>
    </div>
</template>
<script>
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
export default {
    
  name: 'FindRecipes',
  data () {
    return {
        firstingredient:'',
        ingredientId:{},
        recipe: null,
        recipes: {},
        recipeId: [],

    }
  },
  /* 

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
}); */
  methods: {
     async findRecipes(){
        const db = getFirestore()
        console.log("accessing query for Recipe_Ingredients to get RecipeIds")
        const q = query(collection(db, "Recipe_Ingredients"), where("Ingredient_Name", "==", this.firstingredient));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.recipeId = querySnapshot.docs.map(doc => doc.data().Recipe_ID);
        console.log(this.recipeId[0])
});
    console.log("accessing query for Recipe Information")
        const q1 = query(collection(db, "Recipe"), where("Recipe_ID", "==", this.recipeId[0]));
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.recipes = querySnapshot1.docs.map(doc => doc.data());
});
    } //search for Ingredients
     //retreive the Recipe_ID from Recipe_Ingredients where Recipe_Ingredients.Ingredient_Name == Entry_Ingredient_Name
     //--> for every entered Ingredient
     //display every recipe with the found Recipe_ID like in RecipeList with Routerlink to Info about Recipe like in RecipeList

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>