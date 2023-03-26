

<template>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Start your development with Dorang landing page.">
    <meta name="author" content="Devcrud">
    <title>Home</title>
    <!-- font icons -->


</head>
<body data-spy="scroll" data-target=".navbar" data-offset="40" id="home" class="dark-theme">
    

    <div class="theme-selector">
        <a href="javascript:void(0)" class="spinner">
            <i class="ti-paint-bucket"></i>
        </a>
        <div class="body">
            <a href="javascript:void(0)" class="light"></a>
            <a href="javascript:void(0)" class="dark"></a>
        </div>
    </div>  

    <!-- page header -->
    <header class="header">
        <div class="overlay"></div>
        <div class="header-content">
            <h1 class="header-title">What are we cooking today?</h1>
            <p class="header-subtitle">By .....</p>

            <!-- irgendein yt video was in das template verlinkt wurde -->
            <!-- <button class="btn btn-theme-color modal-toggle"><i class="ti-control-play text-danger"></i> Watch Video</button> -->

        </div>
    </header><!-- end of page header -->

    

    <!-- page container -->
    <div class="container page-container">
        <div class="col-md-10 col-lg-8 m-auto">
            <h6 class="title mb-4">Delicious leftover dishes</h6>
            <p class="mb-5">Learn how to cook delicious recipes with the leftovers of food you still have at home</p>
        </div>  

        <!-- row -->
        <div class="row mb-4">
            <div class="col-md-4">
                <a href="javascript:void(0)" class="overlay-img">
                    <img src="../assets/imgs/food_hp.jpg" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, weber Landing page">  
                    <div class="overlay"></div> 
                    <div class="des">
                        <h1 class="title">Pasta dishes</h1>
                        <h6 class="subtitle">hover me</h6>
                        <p>Check out the latest pasta recipes now.</p>
                    </div>          
                </a>
            </div>
            <div class="col-md-4">
                <a href="javascript:void(0)" class="overlay-img">
                    <img src="../assets/imgs/salat_hp.jpg" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, weber Landing page">  
                    <div class="overlay"></div> 
                    <div class="des">
                        <h1 class="title">Fresh salads</h1>
                        <h6 class="subtitle">hover me</h6>
                        <p>Check out the latest salad recipes now.</p>
                    </div>          
                </a>
            </div>
            <div class="col-md-4">
                <a href="javascript:void(0)" class="overlay-img">
                    <img src="../assets/imgs/gf.png" alt="">  
                    <div class="overlay"></div> 
                    <div class="des">
                        <h1 class="title">Fish dishes</h1>
                        <h6 class="subtitle">hover me</h6>
                        <p>Check out the latest fish recipes now.</p>
                    </div>          
                </a>
            </div>          
        </div><!-- end of row -->

        <a href="#">Load More <i class="ti-angle-double-right angle"></i></a>


        <div class="col-md-10 col-lg-8 m-auto">
            <h6 class="title mb-4 mt-5 pt-5">The Journal</h6>
            <p class="mb-5">Show the latest cooking journal entries</p>
        </div>

        <!-- row with some pictures  -->
        <!-- <div class="row mb-5">
            <div class="col-md-6">
                <a href="javascript:void(0)" class="card">
                    <img src="assets/imgs/blog-1.jpg" class="card-img" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, weber Landing page">
                    <div class="card-body">
                        <h6 class="card-subtitle">30 June, 2018</h6>
                        <h3 class="card-title">Eiusmod
                        tempor</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>                  
                </a>
            </div>  
             <div class="col-md-6">
                <a href="javascript:void(0)" class="card">
                    <img src="assets/imgs/blog-2.jpg" class="card-img" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, weber Landing page">
                     <div class="card-body">
                        <h6 class="card-subtitle">29 June, 2018</h6>
                        <h3 class="card-title">Ut minim veniam</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>                   
                </a>
            </div>   
        </div>end of row -->

        <a href="#">All Posts <i class="ti-angle-double-right angle"></i></a>

    </div> <!-- end of page container -->

    <!--footer & pre footer -->
    <div class="contact-section">
        <div class="overlay"></div>
        <!-- container -->
        <div class="container">
            <div class="col-md-10 col-lg-8 m-auto">
                <h6 class="title mb-2">Contact Us</h6>
                <p class="mb-5">Feel Free To Drop Us A Line.</p>
                <form action="" class="form-group">
                    <input type="text" size="50" class="form-control" placeholder="Your Name" required>
                    <input type="email" class="form-control" placeholder="Enter Email" requried>
                    <textarea name="comment" id="comment" rows="6"   class="form-control" placeholder="Write Something"></textarea>
                    <input type="submit" value="Send Message" class="form-control">
                </form>
            </div>

            <!-- footer -->
            <footer class="footer">
                <p class="infos">&copy;, Made with <i class="ti-heart text-danger"></i> by Celina, Magnus, Till and Kevin</p>       
                <span>|</span>  
                <div class="links">
                    <a href="#">About</a>
                    <a href="#">Recipe</a>
                    <a href="#">Profile</a>
                </div>
            </footer><!-- end of footer -->

        </div><!-- end of container -->
    </div><!-- end of pre footer -->

  

</body>
</html>
</template>
<script>
import '../assets/vendors/jquery/jquery-3.4.1'
import '../assets/vendors/bootstrap/bootstrap.bundle'
import '../assets/vendors/bootstrap/bootstrap.affix'
import '../assets/js/dorang'

    export default {
      
        name: 'Home',
        data() {
            return {}

        },
        mounted() {},

        methods: {
           
           

        }

    }
</script>
<style>
@import '../assets/vendors/themify-icons/css/themify-icons.css';
@import '../assets/css/dorang.css';


</style>


  
 
