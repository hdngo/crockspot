<template>
    <div>
        <RecipeList />
        <router-link to="/items">Items</router-link>
    </div>
</template>

<script>
import MainSearchBar from './MainSearchBar.vue';
import RecipeList from './RecipeList.vue'

export default {
    name: 'Home',
    components: {
        MainSearchBar,
        RecipeList
    }
}
</script>