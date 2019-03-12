import firebase from 'firebase'
import firestore from 'firebase/firestore'

const config = {
   apiKey: "AIzaSyCvta52U78TfSrZWDY8WTJHsVoy8zxXHI0",
   authDomain: "ninja-smoothie-a0e5e.firebaseapp.com",
   databaseURL: "https://ninja-smoothie-a0e5e.firebaseio.com",
   projectId: "ninja-smoothie-a0e5e",
   storageBucket: "ninja-smoothie-a0e5e.appspot.com",
   messagingSenderId: "781599268617"
}
const firebaseApp = firebase.initializeApp(config)
export default firebaseApp.firestore()