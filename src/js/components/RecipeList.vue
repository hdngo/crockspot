<template>
    <div>
        <MainSearchBar/>
        <div class="recipes">
            <router-link 
                v-for="(recipe, i) in recipes"
                class="recipe__item"
                :key="`recipe-${i}`"
                :to="`/recipes/${loDash(recipe.name)}`"
            >
                <div>
                    {{ recipe.name }}
                    <ul class="results__stats">
                        <li
                            v-for="statKey in Object.keys(recipe.stats)"
                            class="results__stat"
                            :key="`${loDash(statKey)}-${statKey}`"
                        >
                            {{ `${statKey} : ${recipe.stats[statKey]}` }}
                        </li>
                    </ul>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import MainSearchBar from './MainSearchBar.vue'
import { mapGetters } from 'vuex'
import { loDash } from '../helpers'

export default {
    name: 'RecipeList',
    components: {
        MainSearchBar
    },
    computed: {
        ...mapGetters([
            "getRecipes"
        ]),
        recipes() {
            return this.getRecipes
        }
    },
    methods: {
        loDash(string) {
            return loDash(string)
        }
    }
}
</script>

<style lang="scss">
.recipes {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
    .recipe__item {
        display: flex;
        flex: 1 1 25%;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: moccasin;
        border: 2px solid indigo;
        margin: 5px;
        border-radius: 4px;
    }
}
</style>