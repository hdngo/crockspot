<template>
    <div>
        <MainSearchBar />
		<router-link to="/recipes">Recipes</router-link>
        <router-link to="/items">Items</router-link>
    </div>
</template>

<script>
import MainSearchBar from './MainSearchBar.vue';

export default {
    name: 'Home',
    components: {
        MainSearchBar
    }
}
</script>