<template>
    <aside
        class="sidebar"
    >
        <ul class="menu">
            <li
                v-for="(category, i) in categories"
                :key="`category-${category}-${i}`"
                class="menu__item"
                :class="{'menu__item--active': selectedCategory === category.name}"
                @click="handleClick(category.name)"
            >
                <img
                    :src="`/images/${category.imageName}`"
                    :alt="category.name"
                    class="menu__image"
                />
            </li>
        </ul>
        <Carousel
            v-if="selectedCategory"
            :selectedCategory="selectedCategory"
            @close="handleClose"
        />
    </aside>
</template>

<script>
import { loDash } from '../helpers'
import { mapGetters } from 'vuex'
import * as Images from '../mixins/images'
import Carousel from './Carousel.vue'

export default {
    name: 'Sidebar',
    components: { 
        Carousel 
    },
    data() {
        return {
            selectedCategory: null,
        }
    },
    computed: {
        ...mapGetters([
            "getItemCategories",
            "getItems"
        ]),
        items() {
            return this.getItems
        },
        categories() {
            return this.getItemCategories
        }
    },
    methods: {
        loDash(string) {
            return loDash(string)
        },
        handleClick(categoryName) {
            this.selectedCategory = categoryName
        },
        handleClose() {
            this.selectedCategory = null
        }
    },
}
</script>

<style lang="scss" scoped>
@use "../../scss/index";

.sidebar {
    display: none;

    @include index.breakpoint('l') {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 0 auto;
        padding: 5px 5px;
        background-color: white;
        border: 4px solid black;
        border-radius: 10px;
        position: fixed;
        left: 25px;
    }
}

.menu {
    background-color: purple;
    border: 2px solid black;
    border-radius: 10px;
    margin: 0;
}

.menu__item {
    background-color: lighten(moccasin, 10%);
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
    color: indigo;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: darken(moccasin, 15%);
        cursor: pointer;
    }
}

.menu__item--active {
    background-color: darken(moccasin, 25%);
    box-shadow: inset 0 0 2px rgba(0,0,0, .6);
}

.menu__image,
.carousel__image {
    height: 44px;
    width: 44px;
}
</style>