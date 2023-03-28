// Importing the necessary modules
import { createStore } from 'vuex'
import {getFirestore, collection,getDocs, where, query} from 'firebase/firestore';

// Creating and exporting the Vuex store
export default createStore({
  // The state object contains the initial state of the application
  state: {
    userData: {
      userInfo: {}
    }
  },
  // Mutations are used to modify the state
  mutations: {
    // This mutation sets the user data in the state
    setUserInfo(state, payload) {
      console.log("Setting user data:", payload); // Add this line to log the value of the payload
      state.userData.userInfo = payload;
      console.log("New user data:", state.userData); // Add this line to log the new value of userData
    }
  },
  // Actions are used to perform asynchronous operations and commit mutations
  actions: {
    // This action fetches user data from Firestore
    async getUserData({ commit }, email) {
      const db = getFirestore();
      const q1 = query(collection(db, "User"), where("Email", "==", email));
      
      try {
        const querySnapshot1 = await getDocs(q1);
        const userData = querySnapshot1.docs.map(doc => doc.data());
        console.log("userData from Firestore:", userData); // Add this line to check the value of userData
        commit('setUserInfo', userData[0]);
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {}
});
