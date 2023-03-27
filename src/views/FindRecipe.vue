<template>
  <div class="FindRecipes">
    <br>
    <br>
    <br>
    <br>
    <br>
    <h2>Use your leftovers in the best way</h2>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-3"></div>
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">
      <select class="form-select" aria-label="Default select example" v-model="firstingredient">
        <option selected>Ingredients</option>
        <option value="Banana">Banana</option>
        <option value="Milk">Milk</option>
        <option value="Shredded Mozzarella">Shredded Mozzarella</option>
        <option value="Arugula">Arugula </option>
        <option value="Tomato Sauce">Tomato Sauce</option>
        <option value="Tomato">Tomato</option>
        <option value="Slice of Whole Wheat Bread">Slice of Whole Wheat Bread </option>
        <option value="Egg">Egg</option>
        <option value="Cottage Cheese">Cottage Cheese</option>
        <option value="Couscous">Couscous</option>
        <option value="Bell Pepper">Bell Pepper</option>
        <option value="Spring Onion">Spring Onion</option>
        <option value="Vegetable Broth">Vegetable Broth</option>
        <option value="Whole Wheat Pizza Dough">Whole Wheat Dough</option>
        <option value="Mushrooms">Mushrooms</option>
        <option value="Cherry Tomatoes">Cherry Tomatoes</option>
        

      </select>

      &nbsp;&nbsp;

      <select class="form-select" aria-label="Default select example" v-model="secondingredient">
        <option selected>Ingredients</option>
        <option value="Banana">Banana</option>
        <option value="Milk">Milk</option>
        <option value="Shredded Mozzarella">Shredded Mozzarella</option>
        <option value="Arugula">Arugula </option>
        <option value="Tomato Sauce">Tomato Sauce</option>
        <option value="Tomato">Tomato</option>
        <option value="Slice of Whole Wheat Bread">Slice of Whole Wheat Bread </option>
        <option value="Egg">Egg</option>
        <option value="Cottage Cheese">Cottage Cheese</option>
        <option value="Couscous">Couscous</option>
        <option value="Bell Pepper">Bell Pepper</option>
        <option value="Spring Onion">Spring Onion</option>
        <option value="Vegetable Broth">Vegetable Broth</option>
        <option value="Whole Wheat Pizza Dough">Whole Wheat Dough</option>
        <option value="Mushrooms">Mushrooms</option>
        <option value="Cherry Tomatoes">Cherry Tomatoes</option>
      </select>

      &nbsp;&nbsp;

      <select class="form-select" aria-label="Default select example" v-model="thirdingredient">
        <option selected>Ingredients</option>
        <option value="Banana">Banana</option>
        <option value="Milk">Milk</option>
        <option value="Shredded Mozzarella">Shredded Mozzarella</option>
        <option value="Arugula">Arugula </option>
        <option value="Tomato Sauce">Tomato Sauce</option>
        <option value="Tomato">Tomato</option>
        <option value="Slice of Whole Wheat Bread">Slice of Whole Wheat Bread </option>
        <option value="Egg">Egg</option>
        <option value="Cottage Cheese">Cottage Cheese</option>
        <option value="Couscous">Couscous</option>
        <option value="Bell Pepper">Bell Pepper</option>
        <option value="Spring Onion">Spring Onion</option>
        <option value="Vegetable Broth">Vegetable Broth</option>
        <option value="Whole Wheat Pizza Dough">Whole Wheat Dough</option>
        <option value="Mushrooms">Mushrooms</option>
        <option value="Cherry Tomatoes">Cherry Tomatoes</option>
      </select>

      &nbsp;&nbsp;

      <button @click="findRecipes()" class="btn btn-primary btn-sm mt-3">
        Submit
      </button>

      <div class="col-sm-6 col-md-4" v-for="(recipe, key) in recipes" :key="key">
        <p class="recipename">{{ recipe.Recipe_Name }}</p>
        <img v-bind:src="`../src/assets/imgs/${recipe.image}`" width="300" height="300" alt="pic">
        <router-link :to="{ path: 'info', name: 'Info', params: { recipe: recipe.Recipe_Name } }">
          <button class="btn btn-success" role="button">See Recipe</button>
        </router-link>
      </div>
    </div>
  </div>

  <div class="theme-selector">
    <a href="javascript:void(0)" class="spinner">
      <i class="ti-paint-bucket"></i>
    </a>
    <div class="body">
      <a href="javascript:void(0)" class="light"></a>
      <a href="javascript:void(0)" class="dark"></a>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

export default {
  data() {
    return {
      recipes: [],
      recipe: null,
      firstingredient: "",
      secondingredient: "",
      thirdingredient: "",
    };
  },
  methods: {
    async findRecipes() {
  const db = getFirestore();
  console.log("accessing query for Recipe_Ingredients to get RecipeIds");

  // Use Promise.all to wait for all three queries to complete before continuing
  const [querySnapshot, querySnapshot1, querySnapshot2] = await Promise.all([
    getDocs(query(collection(db, "Recipe_Ingredients"), where("Ingredient_Name", "==", this.firstingredient))),
    getDocs(query(collection(db, "Recipe_Ingredients"), where("Ingredient_Name", "==", this.secondingredient))),
    getDocs(query(collection(db, "Recipe_Ingredients"), where("Ingredient_Name", "==", this.thirdingredient))),
  ]);

  // Reset recipeId to an empty array before appending to it
  this.recipeId = [];
      //retrieve data for every document found
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    this.recipeId.push(doc.data().Recipe_ID); // Append to recipeId
    
  });

  querySnapshot1.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    this.recipeId.push(doc.data().Recipe_ID); // Append to recipeId
  });

  querySnapshot2.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    this.recipeId.push(doc.data().Recipe_ID); // Append to recipeId
  });
  console.log(this.recipeId)
  console.log("accessing query for Recipe Information");

  // Use in operator to find recipes that match the recipeId array
  const q3 = query(collection(db, "Recipe"), where("Recipe_ID", "in", this.recipeId));

  const querySnapshot4 = await getDocs(q3);
  console.log("entering forEach loop now")
  querySnapshot4.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    this.recipes = querySnapshot4.docs.map((doc) => doc.data());
  });
  console.log(this.recipes)
}
  }
};
</script>

<style>
/* Bootstrap + Dorang main styles */
@import url("https://fonts.googleapis.com/css?family=Lato:300,400,700|Roboto:300,400,700");
/*!
 * Dorang v1.0.0 (https://themes.getbootstrap.com/product/dorang-free-bootstrap-4 */
</style>