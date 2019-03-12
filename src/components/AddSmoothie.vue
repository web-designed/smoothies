<template>
   <div class="add-smoothie container">
      <h2 class="center-align purple-text">Add Smoothie</h2>      
      <form @submit.prevent="addSmoothie">
         <div class="field title">
            <label for="title">Title</label>
            <input type="text" name="title" v-model="title">
            <p v-if="feedback.title" class="red-text">{{feedback.title}}</p>
         </div>
         <div class="field ingredient" v-for="(ingredient, index) in ingredients" :key="index">
            <label for="ingredient">Ingredient</label>
            <input type="text" name="ingredient" v-model="ingredients[index]" readonly>
            <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
         </div>
         <div class="field ingredient">
            <label for="ingredient">Add Ingredient</label>
            <input type="text" name="ingredient" @keydown.tab.prevent="addIng" v-model="another">
         </div>
         <div class="field center-align">
            <p v-if="feedback.ingredient" class="red-text">{{feedback.ingredient}}</p>
            <button class="btn green">Add Smoothie</button>
         </div>
      </form>
   </div>
</template>

<script>
   import db from '@/firebase/init'
   import slugify from 'slugify'
   export default {
      name: 'AddSmoothie',
      data(){
         return {
            title: null,
            another: null,
            ingredients: [],
            feedback: {
               title: null,
               ingredient: null,
               slug: null
            },
         }
      },
      methods: {
         addSmoothie(){

            if( this.title && this.ingredients.length > 0){
               this.feedback.title = null
               this.feedback.ingredient = null
               this.slug = slugify(this.title, {
                  replacement: '-',
                  remove: /[$*+_.()'"/!\-:@]/g,
                  lower: true
               })

               db.collection('smoothies').add({
                  title: this.title,
                  ingredients: this.ingredients,
                  slug: this.slug
               }).then(() => {
                  this.$router.push({name:'Index'})
               }).catch(error => {
                  console.log(error)
               })
            } else if (!this.title) {
               this.feedback.title = 'Add Title'
            } else if (this.ingredients.length < 1) {
               this.feedback.ingredient = 'Add at least one ingredient'
            }
         },
         addIng(){
            if(this.another){
               this.ingredients.push(this.another)
               this.another = null
               this.feedback.ingredient = null
            } else {
               this.feedback.ingredient = 'Fill this please'
            }
         },
         deleteIng(ing){
            this.ingredients = this.ingredients.filter( ingredient => {
               return ingredient != ing
            })
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