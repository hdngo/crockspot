<template>
    <li 
        class="results__item"
        @click="handleClick"
    >
        <router-link
            v-if="(itemData.types && itemData.types.includes('Food Group'))"
            :to="`/categories/${loDash(itemData.name)}`"
        >
            <div class="results__info">
                <div class="results__details">
                    <h4
                        v-html="name"
                        class="results__name"
                    />
                    <img 
                        :src="`/images/${loDash(itemData.name)}.png`" 
                        class="results__image"
                    />
                    <span 
                        v-if="itemData.description"
                        class="results__description"
                    >
                        {{itemData.description}}
                    </span>
                </div>
                <ul 
                    v-if="itemData.stats"
                    class="results__stats"
                >
                    <li
                        v-for="statKey in Object.keys(itemData.stats)"
                        class="results__stat"
                        :key="`${loDash(statKey)}-${statKey}`"
                    >
                        <img 
                            :src="`/images/${statKey}.png`"
                            class="results__stat__img"
                        />
                        <span class="results__stat__value">{{`${itemData.stats[statKey]}`}}</span>
                    </li>
                </ul>
            </div>
        </router-link>
        <router-link
            v-else
            :to="`/${ itemData.ingredients ? 'recipes' : 'items'}/${loDash(itemData.name)}`"
        >
            <div class="results__info">
                <div class="results__details">
                    <h4
                        v-html="name"
                        class="results__name"
                    />
                    <img 
                        :src="`/images/${loDash(itemData.name)}.png`" 
                        class="results__image"
                    />
                    <span 
                        v-if="itemData.description"
                        class="results__description"
                    >
                        {{itemData.description}}
                    </span>
                </div>
                <ul 
                    v-if="itemData.stats"
                    class="results__stats"
                >
                    <li
                        v-for="statKey in Object.keys(itemData.stats)"
                        class="results__stat"
                        :key="`${loDash(statKey)}-${statKey}`"
                    >
                        <img 
                            :src="`/images/${statKey}.png`"
                            class="results__stat__img"
                        />
                        <span class="results__stat__value">{{`${itemData.stats[statKey]}`}}</span>
                    </li>
                </ul>
            </div>
        </router-link>
    </li>
</template>

<script>
import { highlightTextMatches } from '../mixins/search'
import { loDash } from '../helpers'
import * as Images from '../mixins/images'

export default {
    name: 'SearchResult',
    props: {
        name: {
            type: String,
            required: true
        },
        itemData: {
            type: Object,
            required: true
        }
    },
    methods: {
        loDash(string) {
            return loDash(string)
        },
        handleClick() {
            this.$emit('selected')
        }
    }
}
</script>

<style lang="scss" scoped>
li {
    list-style-type: none;
}

.results__item {
    border: 2px solid lighten(indigo, 10%);
    background-color: lighten(moccasin, 10%);
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0.8em;
    transition: all 0.4s ease-in-out;

    &:hover {
        cursor: pointer;
        background: darken(moccasin, 15%);
    }
}

.results__name {
    margin-bottom: 5px;
    letter-spacing: 0.15em;
    color: lighten(purple, 10%);
    font-weight: 500;
}

.results__image {
    display: block;
    margin: 0 auto;
    height: 60px;
    width: 60px;
}

.results__stats {
    padding: 0;
    margin-top: 10px;
}

.results__stat {
    display: inline-block;
}

.results__stat__img {
    height: 28px;
    width: 28px;
}

.focused {
    border: 2px solid indigo;
    background: darken(moccasin, 15%);
}
</style>