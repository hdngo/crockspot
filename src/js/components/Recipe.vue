<template>
<div>
    {{ this.recipe.name }}
    <div class="recipe__info">
        <div class="stats">
            <div class="stats--nutrition">
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
            <div class="stats--time">
                {{ `cook time: ${this.recipe.cookTime} seconds` }}
                {{ `duration: ${this.recipe.perishTime} days` }}
            </div>
        </div>
    </div>
    <section class="section section--ingredients">
        <h2 class="section__title">Ingredients</h2>
        <ul class="ingredients">
            <li
                v-for="(ingredient, i) in recipe.ingredients"
                :key="`${hyphenedRecipeName}-ingredient-${i}`"
                class="ingredient"
            >
                <router-link
                    :to="`/items/${loDash(ingredient.name)}`"
                >
                    <div>
                        {{ `name: ${ingredient.name}` }}
                        {{ `value: ${ingredient.quantity}` }}
                    </div>
                </router-link>
            </li>
        </ul>
    </section>
    <section 
        v-if="recipe.restrictions.length"
        class="section section--restrictions"
    >
        <h2 class="section__title">Restrictions</h2>
        <ul class="restrictions">
            <li
                v-for="(restriction, i) in recipe.restrictions"
                :key="`${hyphenedRecipeName}-restriction-${i}`"
                class="restriction"
            >
                <template
                    v-if="(typeof restriction === 'object')"
                >
                    <router-link
                        :to="`${loDash(restriction.name)}`"
                    >
                        {{ restriction.name }}
                        {{ `max limit: ${restriction.limit}` }}
                    </router-link>
                </template>
                <template 
                    v-else
                >
                    <router-link
                        :to="`/items/${loDash(restriction)}`"
                    >
                        {{ restriction }}
                    </router-link>
                </template>
            </li>
        </ul>
    </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertParamToName, loDash } from '../helpers'

export default {
    name: 'Recipe',
    beforeCreate() {
        console.log('?')
    },
    computed: {
        ...mapGetters([
            'getRecipes'
        ]),
        recipes() {
            return this.getRecipes
        },
        recipe() {
            const recipeName = convertParamToName(this.$route.params.name)

            return this.recipes.filter(recipe => recipe.name === recipeName)[0]
        },
        hyphenedRecipeName() {
            return this.$route.params.name
        }
    },
    methods: {
        loDash(string) {
            return loDash(string)
        }
    }
}
</script>