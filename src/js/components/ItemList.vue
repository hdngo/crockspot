<template>
    <div>
        <h1>Item List</h1>
        <MainSearchBar />
        <div class="items">
            <router-link 
                    v-for="(item, i) in items"
                    class="item__item"
                    :key="`item-${i}`"
                    :to="`/items/${loDash(item.name)}`"
                >
                    <div>
                        {{ item.name }}
                    </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainSearchBar from './MainSearchBar.vue'
import { loDash } from '../helpers'

export default {
    name: 'ItemList',
    components: {
        MainSearchBar
    },
    computed: {
        ...mapGetters([
            "getItems"
        ]),
        items() {
            return this.getItems
        }
    },
    methods: {
        loDash(string) {
            return loDash(string)
        }
    }
}
</script>

<style lang="scss">
.items {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
    .item__item {
        display: flex;
        flex: 1 1 25%;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: 2px solid indigo;
        margin: 5px;
        border-radius: 4px;
    }
}
</style>