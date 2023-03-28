import { createStore } from 'vuex'
import {getFirestore, collection,getDocs, where, query} from 'firebase/firestore';


export default createStore({
  state: {
    userData: {
      userInfo: {}
    }
  },
  mutations: {
    setUserInfo(state, payload) {
        console.log("Setting user data:", payload);
        state.userData.userInfo = payload;
        console.log("New user data:", state.userData);
      }
    },
  actions: {
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
    }},
  modules: {}
});