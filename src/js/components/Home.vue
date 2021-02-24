<template>
    <div>
        <MainSearchBar />
		<router-link to="/recipes">Recipes</router-link>
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