<template>
    <div class="recipes">
        <router-link 
            v-for="(recipe, i) in recipes"
            :key="`recipe-${i}`"
            :to="`/recipes/${recipe.name.toLowerCase().split(' ').join('-')}`"
        >
            <div 
                class="recipe__item"
            >
                {{ recipe.name }}
            </div>
        </router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'RecipeList',
    computed: {
        ...mapGetters([
            "getRecipes"
        ]),
        recipes() {
            return this.getRecipes
        }
    }
}
</script>