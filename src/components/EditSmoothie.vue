<template>
   <div v-if="smoothie" class="edit-smoothie container">
      <h2>Edit "{{ smoothie.title }}"</h2>  
      <form @submit.prevent="editSmoothie">
         <div class="field title">
            <label for="title">Title</label>
            <input type="text" name="title" v-model="smoothie.title">
            <p v-if="feedback.title" class="red-text">{{feedback.title}}</p>
         </div>
         <div class="field ingredient" v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <label for="ingredient">Ingredient</label>
            <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" readonly>
            <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
         </div>
         <div class="field ingredient">
            <label for="ingredient">Add Ingredient</label>
            <input type="text" name="ingredient" @keydown.tab.prevent="addIng" v-model="another">
         </div>
         <div class="field center-align">
            <p v-if="feedback.ingredient" class="red-text">{{feedback.ingredient}}</p>
            <button class="btn green">Update Smoothie</button>
         </div>
      </form>
   </div>
</template>

<script>
   import db from '@/firebase/init'
   import slugify from 'slugify'
   export default {
      name: 'EditSmoothie',
      data(){
         return {
            smoothie: null,
            another: null,
            feedback: {
               title: null,
               ingredient: null
            }
         }
      },
      created(){
         let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
         ref.get().then(snapshot => {
            snapshot.forEach(doc => {
               this.smoothie = {
                  id: doc.id,
                  ...doc.data()
               }
            })
         }).catch(error => {
            console.log(error)
         })
      },
      methods: {
         addIng(){
            if(this.another){
               this.smoothie.ingredients.push(this.another)
               this.another = null
               this.feedback.ingredient = null
            } else {
               this.feedback.ingredient = 'Fill this please'
            }
         },
         deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter( ingredient => {
               return ingredient != ing
            })
         },
         editSmoothie(){
            if( this.smoothie.title && this.smoothie.ingredients.length > 0){
               this.feedback.title = null
               this.feedback.ingredient = null
               this.smoothie.slug = slugify(this.smoothie.title, {
                  replacement: '-',
                  remove: /[$*+_.()'"/!\-:@]/g,
                  lower: true
               })

               db.collection('smoothies').doc(this.smoothie.id).update({
                  title: this.smoothie.title,
                  ingredients: this.smoothie.ingredients,
                  slug: this.smoothie.slug
               }).then(() => {
                  this.$router.push({name:'Index'})
               }).catch(error => {
                  console.log(error)
               })
            } else if (!this.title) {
               this.feedback.title = 'Add Title'
            } else if (this.smoothie.ingredients.length < 1) {
               this.feedback.ingredient = 'Add at least one ingredient'
            }
         }
      }
   }
</script>

<style>
   .delete {
      color: #aaa;
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom:16px;
   }

   .ingredient {
      position: relative;
   }
</style>