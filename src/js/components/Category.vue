<template>
<div class="category__page">
    <h1 class="category__name">
        {{ this.category.name }}
    </h1>
    <div class="category__content">
        <figure class="category__figure">
            <img 
                :src="`/images/${loDash(category.name)}.png`"
                class="category__image"
            />
        </figure>
        <div class="recipe__info">
        </div>

        <section
            v-if="categoryItems"
            class="section section--items"
        >
            <h2 class="section__title">Items</h2>
            <ul class="items">
                <li
                    v-for="(item, i) in categoryItems"
                    :key="`${hyphenedCategoryName}-item-${i}`"
                    class="item"
                >
                    <router-link
                        :to="`/items/${loDash(item.name)}`"
                    >
                        <div class="category__item">
                            <div class="category__item__image__wrapper">
                                <img 
                                    :src="`/images/${loDash(item.name)}.png`"
                                    :alt="`name: ${item.name}`"
                                    class="category__item__image"
                                />
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
</div>
</template>

<script>
import { loDash, convertParamToName } from '../helpers'
import { mapGetters } from 'vuex'

export default {
    name: "Categories",
    computed: {
        ...mapGetters([
            'getItems'
        ]),
        items() {
            return this.getItems
        },
        category() {
            const categoryName = convertParamToName(this.$route.params.name)

            return this.items.filter(item => item.name === categoryName)[0]
        },
        hyphenedCategoryName() {
            return this.$route.params.name
        },
        categoryItems() {
            let items = []
            items = [...this.getCategoryItems()]
            return items
        },
    },
    methods: {
        loDash(string) {
            return loDash(string)
        },
        getCategoryItems() {
            return this.items.
                filter(item => 
                    item.types.includes(this.category.name)
                )
        },
        convertParamToName(param) {
            return convertParamToName(param)
        }
    }
}
</script>

<style lang="scss" scoped>
@use "../../scss/index";

.category__page {
    width: 100%;
    padding: 50px;
    background-color: lighten(moccasin, 15%);
    border: 4px solid indigo;
    border-radius: 10px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include index.breakpoint('l') {
        margin-left: 166px;
    }
}

.category__name {
    font-size: 2.5em;
    text-align: center;
    margin-top: 0;
}

.category__figure {
    display: block;
    text-align: center;
}

.category__info {
}

.category__image {
    height: 200px;
    width: 200px;
    
    @include index.breakpoint('l') {
        height: 140px;
        width: 140px;
    }
}


.section__title {
    font-size: 2em;
    text-align: center;
    margin: 10px 0;
}

.section--items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 15px 0;

    ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
}

.category__item {
    text-align: center;
}

.category__item__image__wrapper {
    border: 2px solid darken(moccasin, 10%);
    border-radius: 10px;
    margin: 5px;
    background-color: lighten(moccasin, 10%);
    transition: all 0.5s ease-in-out;

    &:hover {
        background-color: darken(moccasin, 15%);
        cursor: pointer;
    }
}

.ingredient__image,
.restriction__image {
    margin: 5px 15px;
    height: 66px;
    width: 66px;
}

.ingredient__quantity,
.restriction__limit {
    font-size: 1.7em;
    font-weight: 700;
    margin: 0;
}

.x {
    font-size: 0.6em;
    margin-right: 2px;
}
</style>