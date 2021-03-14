<template>
    <div class="recipes__wrapper">
        <!-- <MainSearchBar/> -->
        <SortItemButtons
            :dataset="recipes"
            @sorted="sortRecipes"
        />
        <div class="recipes">
            <router-link 
                v-for="(recipe, i) in recipes"
                class="recipe__item"
                :key="`recipe-${i}`"
                :to="`/recipes/${loDash(recipe.name)}`"
            >
                <div class="recipe__info">
                    <div class="recipe__info--left">
                        <img
                            class="recipe__image"
                            :src="`/images/${loDash(recipe.name)}.png`"
                        />
                    </div>
                    <div class="recipe__info--right">
                        <h3 class="recipe__name">
                            {{ recipe.name }}
                        </h3>
                        <ul class="results__stats">
                            <li
                                v-for="statKey in Object.keys(recipe.stats)"
                                class="results__stat"
                                :key="`${loDash(statKey)}-${statKey}`"
                            >
                                <span class="stat__value">{{ recipe.stats[statKey] }}</span>
                                <img 
                                    :src="`/images/${statKey}.png`"
                                    class="stat__image"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import MainSearchBar from './MainSearchBar.vue'
import SortItemButtons from './SortButtons.vue'
import { mapGetters } from 'vuex'
import { loDash } from '../helpers'
import { health, hunger, sanity } from '../mixins/images'

export default {
    name: 'RecipeList',
    components: {
        MainSearchBar,
        SortItemButtons
    },
    data() {
        return {
            sorted: false,
            sortedRecipes: []
        }
    },
    computed: {
        ...mapGetters([
            "getRecipes"
        ]),
        recipes() {
            return this.sorted ? this.sortedRecipes : this.getRecipes
        }
    },
    methods: {
        loDash(string) {
            return loDash(string)
        },
        sortRecipes(value) {
            this.sorted = true
            this.sortedRecipes = value.results
        }
    }
}
</script>

<style lang="scss">
@use "../../scss/index";

.recipes__wrapper {
    margin: 0 auto;

    @include index.breakpoint('l') {
        margin-left: 156px;
    }
}

.recipes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    
    .recipe__item {
        display: flex;
        flex: 1 1 100%;
        justify-content: center;
        align-items: center;
        padding: 25px;
        background-color: lighten(moccasin, 10%);
        border: 2px solid indigo;
        margin: 10px;
        border-radius: 4px;

        @include index.breakpoint('m') {
            flex-basis: 45%;
        }

        @include index.breakpoint('l') {
            flex-basis: 30%;
        }

        &:hover {
            background: darken(moccasin, 15%);
        }
    }
}

.recipe__info {
    display: flex;
    justify-content: space-between;
    flex: 1 1 auto;
    align-items: stretch;
}

.recipe__info--left,
.recipe__info--right {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.recipe__info--left {
    justify-content: center;
    align-items: center;

    @include index.breakpoint('l') {
        align-items: flex-start;
    }

    @include index.breakpoint('xl') {
        align-items: center;
    }
}

.recipe__info--right {
    align-items: flex-end;
}

.recipe__image {
    height: 100px;
    width: 100px;

    @include index.breakpoint('l') {
        height: 80px;
        width: 80px;
    }

    @include index.breakpoint('xl') {
        height: 110px;
        width: 110px;
    }
}

.recipe__name {
    text-align: right;
    margin-bottom: 0;
}

.results__stat {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 5px 0;
}

.stat__image {
    height: 30px;
    width: 30px;
    margin-left: 20px;
}

.stat__value {
    font-size: 1.25em;
    font-weight: 600;
}
</style>