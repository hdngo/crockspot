import Recipes from '../../../../data/recipes.json'

const DATABASE = {
    recipes: Recipes,
}

const state = {
    recipes: DATABASE.recipes
}

const getters = {
    getRecipes: state => state.recipes,
    getSet: state => Object.assign({}, state.recipes)
}

export default {
    state,
    getters
}