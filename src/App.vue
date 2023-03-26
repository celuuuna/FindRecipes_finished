<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav id="nav" class="page-navbar" data-spy="affix" data-offset-top="10" v-if="!['Info', 'SignIn', 'SignUp'].includes($route.name)">
        <ul class="nav-navbar container">
            <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="recipes" class="nav-link">Recipe</a></li>
            <li class="nav-item"><a href="/" class="nav-link"><img src="./assets/imgs/logo.png" ></a></li>
            <li class="nav-item"><a href="profile" class="nav-link">Profile</a></li>
            <li class="nav-item"><a href="signin" class="nav-link">Login/Logout</a></li>
            
        </ul>
    </nav>
    <!-- <body data-spy="scroll" data-target=".navbar" data-offset="40" id="home" class="dark-theme">
    

    <div class="theme-selector">
        <a href="javascript:void(0)" class="spinner">
            <i class="ti-paint-bucket"></i>
        </a>
        <div class="body">
            <a href="javascript:void(0)" class="light"></a>
            <a href="javascript:void(0)" class="dark"></a>
        </div>
    </div>  
    </body> -->
  
    

  <RouterView />
</template>
<script>
import './assets/vendors/jquery/jquery-3.4.1'
import './assets/vendors/bootstrap/bootstrap.bundle'
import './assets/vendors/bootstrap/bootstrap.affix'
import './assets/js/dorang'
</script>
<style>
@import './assets/vendors/themify-icons/css/themify-icons.css';
@import './assets/css/dorang.css';
#nav{
    background-color: rgb(0, 64, 102);
}
template{
    background-color: black;
}
</style>
