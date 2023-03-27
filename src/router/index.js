
import { createRouter, createWebHistory } from 'vue-router'
import RecipeList from '@/views/RecipeList.vue'
import Info from '@/views/Info.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Profile from '@/views/Profile.vue'
import FindRecipes from '@/views/FindRecipe.vue'
import Home from '@/views/HomeView.vue'

import {getAuth, onAuthStateChanged} from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
       path: '/:catchAll(.*)',
       redirect: '/SignIn'
    },
    {
      path: '/recipes',
      name: 'RecipeList',
      component: RecipeList,
      meta:{
        requireAuth: true
      }
    },
    {
      path: '/info/:recipe',
      name: 'Info',
      component: Info,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/findrecipes',
      name: 'FindRecipes',
      component: FindRecipes,
      
      },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requireAuth: true
      }
    }
  ]
})
const getCurrentUser = () => {
  return new Promise ((resolve, reject)=>{
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) =>{
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}
router.beforeEach(async(to, from, next)=> {
  const requireAuth = to.matched.some((record)=>record.meta.requireAuth)
  if(requireAuth) {
    if(await getCurrentUser()){
      console.log('authorized user to access the page')
        next()
    } else {
      console.log('Unauthorized user to access the page')
      next('signin')
    }
  } else {
    next()
  }
})



export default router