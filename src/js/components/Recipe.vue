<template>
<div class="recipe__page">
    <h1 class="recipe__name">
        {{ this.recipe.name }}
    </h1>
    <div class="recipe__content">
        <figure class="recipe__figure">
            <img 
                :src="`/images/${loDash(recipe.name)}.png`"
                class="recipe__image"
            />
        </figure>
        <div class="recipe__info">
            <div class="stats">
                <div class="stats--nutrition">
                    <ul class="results__stats">
                        <li
                            v-for="statKey in Object.keys(recipe.stats)"
                            class="results__stat"
                            :key="`${loDash(statKey)}-${statKey}`"
                        >
                            <!-- {{ `${statKey} : ${recipe.stats[statKey]}` }} -->
                            <img 
                                :src="`/images/${statKey}.png`"
                                class="stat__image"
                            />
                            <span class="stat__value">{{ recipe.stats[statKey] }}</span>
                        </li>
                    </ul>
                </div>
                <div class="stats--time">
                    <ul class="results__stats--time">
                        <li class="results__stat results__stat--time">
                            <img 
                                src="/images/crockpot.png"
                                class="stat__image"
                            />
                            <span class="stat__value">{{ `${this.recipe.cookTime}s` }}</span>
                        </li>

                        <li class="results__stat results__stat--time">
                            <img 
                                src="/images/rot.png"
                                class="stat__image"
                            />
                            <span class="stat__value">{{ `${this.recipe.perishTime}s` }}</span>
                        </li>
                    </ul>
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
                        <div class="ingredient__item">
                            <div class="ingredient__image__wrapper">
                                <img 
                                    :src="`/images/${loDash(ingredient.name)}.png`"
                                    :alt="`name: ${ingredient.name}`"
                                    class="ingredient__image"
                                />
                            </div>
                            <p class="ingredient__quantity"><span class="x">X</span>{{ `${ingredient.quantity}` }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <section 
            v-if="recipe.restrictions && recipe.restrictions.length"
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
                            <div class="restriction__item">
                                <div class="restriction__image__wrapper">
                                    <img 
                                        :src="`/images/${loDash(restriction.name)}.png`"
                                        :alt="`name: ${restriction.name}`"
                                        class="restriction__image"
                                    />
                                </div>
                                <p 
                                    v-if="restriction.limit"
                                    class="restriction__limit"
                                >
                                    <span class="x">X</span>
                                    {{ `${restriction.limit}` }}
                                </p>
                            </div>
                        </router-link>
                    </template>
                    <template 
                        v-else
                    >
                        <router-link
                            :to="`/items/${loDash(restriction)}`"
                        >
                            <div class="ingredient__item">
                                <div class="ingredient__image__wrapper">
                                    <img 
                                        :src="`/images/${loDash(restriction)}.png`"
                                        :alt="`name: ${restriction}`"
                                        class="ingredient__image"
                                    />
                                </div>
                            </div>
                        </router-link>
                    </template>
                </li>
            </ul>
        </section>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertParamToName, loDash } from '../helpers'
import * as Images from '../mixins/images'

export default {
    name: 'Recipe',
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

<style lang="scss" scoped>
@use "../../scss/index";

.recipe__page {
    width: 100%;
    padding: 50px;
    background-color: lighten(moccasin, 15%);
    border: 4px solid indigo;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include index.breakpoint('l') {
        margin-left: 166px;
    }
}

.recipe__name {
    font-size: 2.5em;
    text-align: center;
    margin-top: 0;
}

.recipe__figure {
    display: block;
    text-align: center;
}

.recipe__info {
}

.stats {
    margin: 0 auto;
}

.recipe__image {
    height: 200px;
    width: 200px;
    
    @include index.breakpoint('l') {
        height: 140px;
        width: 140px;
    }
}

.stats--nutrition,
.stats--time {
    display: inline-block;
}

.stat__image {
    width: 44px;
    height: 44px;
    margin-left: 0;
    margin-right: 5px;
}

.results__stat {
    display: inline-flex;
    margin-right: 10px;
}

.section__title {
    font-size: 2em;
    text-align: center;
    margin: 10px 0;
}

.section--ingredients,
.section--restrictions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 15px 0;

    ul {
        display: flex;
        justify-content: center;
    }
}

.ingredient, .restriction {
    text-align: center;
}

.ingredient__image__wrapper,
.restriction__image__wrapper {
    border: 1px solid black;
    margin: 5px;
    background-color: lighten(moccasin, 10%);

    &:hover {
        background-color: darken(moccasin, 15%);
        cursor: pointer;
    }
}

.ingredient__image,
.restriction__image {
    margin: 5px 15px;
    height: 66px;
    width: 66px;
}

.ingredient__quantity,
.restriction__limit {
    font-size: 1.7em;
    font-weight: 700;
    margin: 0;
}

.x {
    font-size: 0.6em;
    margin-right: 2px;
}

</style>