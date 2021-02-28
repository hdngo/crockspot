import Recipes from '../../../../data/recipes.json'
import Items from '../../../../data/items.json'

const DATABASE = {
    recipes: Recipes,
    items: Items
}

const state = {
    recipes: DATABASE.recipes,
    items: DATABASE.items
}

const getters = {
    getRecipes: state => state.recipes,
    getItems: state => state.items,
    getItemCategories: state => {
        let categories = state.items.filter(
            (item) => item.types.includes("Food Group")
        )

        return categories
    },
    getSet: state => Object.assign({}, state.recipes, state.items)
}

export default {
    state,
    getters
}