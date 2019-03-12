<template>
   <div class="navbar">
      <nav class="nav-extended purple darken-2">
         <div class="container nav-content">
            <router-link :to="{name: 'Index'}">
               <span class="nav-title">Smoothies</span> 
            </router-link>
            <a href="#" class="btn-floating btn-large halfway-fab green">
               <router-link :to="{name: 'AddSmoothie'}">
                  <i class="material-icons">add</i>
               </router-link>
            </a>
         </div>
      </nav>
   </div>
</template>

<script>
   export default {
      name: 'Navbar',
      data(){
         return {

         }
      }
   }
</script>

<style>
   
</style>