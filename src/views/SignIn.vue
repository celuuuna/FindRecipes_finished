<template>
  <html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="author" content="Kodinger">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Sign In</title>

</head>
    

    <body class="my-login-page">
    <section class="h-100">
        <div class="container h-100">
            <div class="row justify-content-md-center h-100">
                <div class="card-wrapper">
                    <div class="brand">
                        <img src="../assets/imgs/logo.png" alt="logo">
                    </div>
                    <div class="card fat">
                        <div class="card-body">
                            <h4 class="card-title">Login</h4>
                            
                                <div class="form-group">
                                    <label for="email">E-Mail Address</label>
                                    <!--input field to store the user input for email that is needed for the sign in -->
                                    <input id="email" type="email" class="form-control" name="email" placeholder="email" v-model="formData.email" required autofocus>
                                    <div class="invalid-feedback">
                                        Email is invalid
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="password">Password      &nbsp;

                
                                    <a href="forgot.html" class="float-right">
                                                Forgot Password?
                                        </a>
                                    </label>
                                    <!--input field to store the user entry for their password that is needed for the sign in-->
                                    <input id="password" type="password" class="form-control" name="password" placeholder="password" v-model="formData.password" required data-eye>
                                    <div class="invalid-feedback">
                                        Password is required
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="custom-checkbox custom-control">
                                        <!--this is an input in the form of a checkbox so the user can choose to remeber their username so they won't have to sign in every time-->
                                        <input type="checkbox" name="remember" id="remember" class="custom-control-input">
                                        <label for="remember" class="custom-control-label">Remember Me</label>
                                    </div>
                                </div>

                                <div class="form-group m-0">
                                    <!--The click of the sign in button will lead to the execution of the sign in function-->
                                  <button id="signinbutton" @click="signIn" class="btn btn-success btn-block" >Sign In</button>
                                </div>
                                <div class="mt-4 text-center">
                                    <!--this is a button with a routerlink to redirect the user to the sign up page if they are not yet registered-->
                                  <router-link to="/signup">
                                   <a id="text"> Don't have an account? &nbsp; </a> <button class="btn btn-success" id="createonebutton" role="button">Create One</button>
                                  </router-link>
                                  </div>
                            
                        </div>
                    </div>
                    <div class="footer">
                        Copyright &copy; 2023 &mdash; Recipes finder 
                    </div>
                </div>
            </div>
        </div>
    </section>
    </body>


    </html>
</template>

<script>
// Importing necessary libraries and modules
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import store from '../store'; // Vuex store
import { mapActions, mapState } from 'vuex'; // Vuex helper functions

export default {
  // Component name
  name: 'SignIn',

  // Component data
  data() {
    return {
      formData: { // Form data for email and password input
        email: '',
        password: ''
      }
    }
  },

  // Vuex helper functions
  computed: {
    ...mapActions(["setUserData"]), // Maps Vuex actions to component methods
  },

  // Component methods
  methods: {
    async signIn() { // Method to authenticate user
      try {
        const auth = getAuth(); // Firebase Authentication instance
        const userCredential = await signInWithEmailAndPassword( // Sign in with email and password
          auth,
          this.formData.email,
          this.formData.password
        );
        console.log(userCredential.user.email); // Log user email
        await store.dispatch('getUserData', this.formData.email); // Get user data from Vuex store
        await store.commit('setUserInfo', store.state.userData.userInfo); // Set user info in store
        this.$router.replace('/profile'); // Redirect user to profile page
      } catch (error) { // Handle errors
        alert(error.message); // Show alert with error message
      }
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/login.css"> */

@import '../assets/css/login.css';
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");    

</style>