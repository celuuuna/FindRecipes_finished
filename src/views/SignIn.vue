<template>
  <html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="author" content="Kodinger">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Sign In</title>

</head>
    <!-- <div class="row">
        <h2>Signin</h2>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">

            <input type="email" class="form-control" placeholder="email" v-model="formData.email">
            <br>
            <input type="password" class="form-control" placeholder="password" v-model="formData.password">
            <br>
            <button @click="signIn" class="btn btn-success btn-block full-width" >Signin</button>
        </div>

    </div> -->

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
                                    <input id="password" type="password" class="form-control" name="password" placeholder="password" v-model="formData.password" required data-eye>
                                    <div class="invalid-feedback">
                                        Password is required
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="custom-checkbox custom-control">
                                        <input type="checkbox" name="remember" id="remember" class="custom-control-input">
                                        <label for="remember" class="custom-control-label">Remember Me</label>
                                    </div>
                                </div>

                                <div class="form-group m-0">
                                  <button id="signinbutton" @click="signIn" class="btn btn-success btn-block" >Sign In</button>
                                </div>
                                <div class="mt-4 text-center">
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


import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
export default {
  name: 'SignIn',
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      console.log('Signin')
      const auth = getAuth()
            signInWithEmailAndPassword(
                auth,
                this.formData.email,
                this.formData.password
            )
            .then((userCredential)=>{
                console.log("Successfully sign in!")
                this.$router.replace('/recipes')
            })
            .catch((error) => {
                console.log(error.code)
                alert(error.message)
            })
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