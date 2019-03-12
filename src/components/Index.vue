<template>
   <div class="index container">
      <div class="card" v-for="(smoothie, index) in smoothies" :key="index">
         <div class="card-content">
            <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
            <h2 class="indigo-text">{{ smoothie.title }}</h2>
            <ul class="ingredients">
               <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                  <span class="chip">{{ ingredient }}</span>
               </li>
            </ul>
         </div>
         <span class="btn-floating btn-large halfway-fab green">
            <router-link :to="{name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
               <i class="material-icons edit">edit</i>
            </router-link>
         </span>   
      </div>
   </div>
</template>

<script>
   import db from '@/firebase/init.js'
   
   export default {
      name: 'Index',
      methods: {
         deleteSmoothie(id){
            
            // delete from firestore
            db.collection('smoothies').doc(id).delete().then(() => {

               // delete from state
               this.smoothies = this.smoothies.filter( smoothie => {
                  return smoothie.id !== id
               })
            })
         }
      },
      data () {
         return {
            smoothies: []
         }
      },
      created() {
         db.collection('smoothies').get().then( snapshot => {
            snapshot.forEach( childSnapshot => {
               this.smoothies.push({
                  id: childSnapshot.id,
                  ...childSnapshot.data()
               })
            })
         })
      },
   }
</script>

<style>
   .index {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 1em;
      padding-top: 2em;
   }

   .index h2 {
      font-size: 1.8em;
   }

   .index .ingredients li {
      display: inline-block
   }

   .index .delete {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
      color: #aaa;
   }

</style>
