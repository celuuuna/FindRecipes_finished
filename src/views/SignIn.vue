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


import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
export default {
  name: 'SignIn',
  data () {
    return {
        //the entry data gets stored in the formData object
      formData: {
        email: '',
        password: ''
      },
      userData:{
        userInfo:{}
      }
    }
  },
  methods: {
    //the signIn function uses the firestore sign in function 
    //to check the email and password with the secured data in the authenticator
    signIn () {
      console.log('Signin')
      const auth = getAuth()
            signInWithEmailAndPassword(
                auth,
                this.formData.email,
                this.formData.password
            )
            //if the login was successful the user will be redirected to the recipe page
            .then(async (userCredential) => {
                console.log("Successfully sign in!")
                this.$router.replace('/recipes')
                alert("Welcome User! Let's cook something delicious !")
                await this.getUserData(); // Call getUserData() after the user signs in successfully
            })
            .catch((error) => {
                //if user credentials are wrong an error message gets displayed 
                console.log(error.code)
                alert(error.message)
            })
        },
        //function retrieve userdata from collection where Email equals to the entry on sign in
        //the userInfo is used to import in the Profile.vue to display the user data 
        //according to the current user 
        async getUserData(){
    // Get a Firestore instance
    const db = getFirestore()

    // Create a query for the User collection to retrieve the user with the specified email
    const q1 = query(collection(db, "User"), where ("Email", "==", this.formData.email))

    // Retrieve the documents matching the query
    const querySnapshot1 = await getDocs(q1);

    // Loop through each document and log its ID and data, then store the data in an array
    querySnapshot1.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        this.userInfo = querySnapshot1.docs.map(doc => doc.data());
    })

    // Log the user info array
    console.log(this.userInfo)
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