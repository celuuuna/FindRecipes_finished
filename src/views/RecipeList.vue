<template>
  <html lang="en">
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Start your development with Dorang landing page.">
    <meta name="author" content="Devcrud">
    <title>Recipe List</title>


</head>
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
    <div class="container page-container">
        <div class="col-md-10 col-lg-8 m-auto">
            <h3 class="title mb-4">Recipes</h3>
        </div>
        <a href="#">activate filters</a>
    
     <!-- row with some recipe  -->
     <div class="row mb-5">
    <div class="col-md-6" v-for="(recipe, key) in recipes" :key='key'>
            <img v-bind:src="`../src/assets/imgs/${recipe.image}`" width="300" height="300" alt="pic">
                <div class="card-body">
                    <h3 class="card-title"><p class="recipename" style="color: black">{{recipe.Recipe_Name}}></p></h3>
                    <router-link
                            :to="{path: 'info', name: 'Info', params:{recipe:recipe.Recipe_Name}}">
                            <button class="btn btn-success" role="button">See Recipe</button>
                        </router-link>
                </div>
            
        </div>
        <!--Iterate over the items stored in the recipes array and print every recipe with picture, name and routerlink to the recipe-->
        <div class="col-md-6" v-for="(recipe, key) in recipes" :key='key'>

                <img v-bind:src="`../src/assets/imgs/${recipe.image}`" width="300" height="300" alt="pic">
                    <div class="card-body">
                        <h3 class="card-title">
                            <p class="recipename" style="color: black">{{recipe.Recipe_Name}}></p>
                        </h3>
                        <!--Create a Routerlink to access the recipe details of the clicked recipe -->
                        <router-link
                            :to="{path: 'info', name: 'Info', params:{recipe:recipe.Recipe_Name}}">
                            <button class="btn btn-success" role="button">See Recipe</button>
                        </router-link>
                    </div>                  
                
            </div>   
        </div>  <!-- end of row -->
      </div>
      
            <footer class="footer">
                <p class="infos">&copy;, Made with <i class="ti-heart text-danger"></i> by Celina, Magnus, Till and Kevin</p>       
                <span>|</span>  
                <div class="links">
                    <a href="#">About</a>
                    <a href="#">Recipe</a>
                    <a href="#">Profile</a>
                    <button @click="logout" class="btn btn-default" style="color: red; border: solid">Logout</button>
                </div>

                    
             
            </footer>
</body>


          
    </html>
  </template>
  
  <script>
  import {collection, onSnapshot, doc, getFirestore, } from "firebase/firestore"
  import {getAuth, signOut} from 'firebase/auth'
  export default {
    name: 'RecipeList',
    data () {
      return {
        recipe: null,
        //store the recipe data in here to access in the html template 
        recipes: {},
       
        
        auth: getAuth()
      }
    },
    mounted () {
      //access the Recipe database to retrieve recipe data
      console.log('Recipe List')
      const db = getFirestore()
      const colRef = collection(db, "Recipe")
      onSnapshot(colRef, snapShot => {
        //store the retrieved data in the recipes object
        this.recipes = snapShot.docs.map(doc => doc.data())
        
      })  
    },
    methods: {
      //deactivate the authorization through the logout button
      logout () {
        console.log('logout')
        signOut(this.auth)
      //after logout redirect to the signin page
      .then(()=>{
        this.$router.replace('/signin')
      })
      //if logout didn't work, display the error message
      .catch((error) => {
        alert(error.message)
      })
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    /* display: inline-block; */
    margin: 0 10px;
  }
  a {
    color: #ffffff;
  }
  p.citydetail{
    text-align: justify;
  }
  </style>