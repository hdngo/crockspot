import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import FourOhFour from "./components/FourOhFour.vue";

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
            name: "recipes",
            component: () => 
               import(/* webpackChunkName: "recipeList" */ "./components/RecipeList.vue")
        },
        {
            path: "/recipes/:name",
            name: "recipe",
            component: () => 
                import(/* webpackChunkName: "recipe" */ "./components/Recipe.vue")
        },
        {
            path: "/items",
            name: "items",
            component: () =>
                import(/* webpackChunkName: "itemList" */ "./components/ItemList.vue")
        },
        {
            path: "/items/:name",
            name: "item",
            component: () =>
                import(/* webpackChunkName: "item" */ "./components/Item.vue")
        },
        {
            path: "/categories/:name",
            name: "category",
            component: () =>
                import(/* webpackChunkName: "category" */ "./components/Category.vue")
        },
        {
            path: "/*",
            component: FourOhFour
        },
    ],
    mode: 'history'
})