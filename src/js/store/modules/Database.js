import Recipes from '../../../../data/recipes.json'
import Items from '../../../../data/items.json'
import { sortByPropsAsc } from '../../helpers'

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
    getInventory: (state) => {
        let inventory = []
        let inventoryObj = [...state.recipes, ...state.items]
        inventoryObj.forEach(item => inventory.push(item))

        return sortByPropsAsc(inventory, 'name')
    }
}

export default {
    state,
    getters
}