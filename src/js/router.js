import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            component: About
        },
        {
            path: "/recipes",
            name: "recipe",
            component: () => 
                import(/* webpackChunkName: "recipeList" */ "./components/RecipeList.vue" )
        },
        {
            path: "/recipes/:name",
            name: "recipe",
            component: () => 
                import(/* webpackChunkName: "recipe" */ "./components/Recipe.vue")
        },

    ],
    mode: 'history'
})