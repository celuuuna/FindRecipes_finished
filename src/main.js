import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {initializeApp} from 'firebase/app'
import store from './store'
import LoadScript from "vue-plugin-load-script";

import './assets/main.css'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuh-hewUQhzwfS5Zlv_m9PB1O2-jjyHS4",
    authDomain: "findrecipes-108e0.firebaseapp.com",
    projectId: "findrecipes-108e0",
    storageBucket: "findrecipes-108e0.appspot.com",
    messagingSenderId: "656552172400",
    appId: "1:656552172400:web:dd66922b0ccec4ee614db5",
    measurementId: "G-FV7ZBLHTF1"
  };
initializeApp(firebaseConfig)
const app = createApp(App)

app.use(router)
app.use(LoadScript);
app.use(store)
app.mount('#app')
