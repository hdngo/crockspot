<template>
<div class="item__page">
    <h1 class="item__name">
        {{ this.item.name }}
    </h1>
    <p
        v-if="item.description"
        class="item__description"
    >
        <em>{{ item.description }}</em>
    </p>
    <div class="item__content">
        <figure class="item__figure">
            <img 
                :src="`/images/${loDash(item.name)}.png`"
                class="item__image"
            />
        </figure>
        
        <section class="section section--types">
            <h2 class="section__title">Food Values</h2>
            
            <ul class="types">
                <li
                    v-for="(type, i) in item.types.filter(type => type !== 'Food Group')"
                    :key="`${hypheneditemName}-type-${i}`"
                    class="type"
                >
                    <!-- <router-link
                        :to="`/items/${loDash(type)}`"
                    > -->
                        <div class="type__item">
                            <div class="type__image__wrapper">
                                <img 
                                    :src="`/images/${loDash(type)}.png`"
                                    :alt="`name: ${type}`"
                                    class="type__image"
                                />
                            </div>
                            <p 
                                v-if="(item.foodValues && Object.keys(item.foodValues).includes(type))"
                                class="type__quantity"
                            >
                                <span class="x">X</span>{{ `${item.foodValues[type]}` }}
                            </p>
                        </div>
                    <!-- </router-link> -->
                </li>
            </ul>
        </section>
        <section
            v-if="item.obtainedFrom.length"
            class="section section--sources"
        >
            <h2 class="section__title">Obtained From</h2>
            <ul class="sources">
                <li
                    v-for="(source, i) in item.obtainedFrom"
                    :key="`${hypheneditemName}-source-${i}`"
                    class="source"
                >
                    <!-- <router-link
                        :to="`/items/${loDash(source)}`"
                    > -->
                        <div class="source__item">
                            <div class="source__image__wrapper">
                                <img 
                                    :src="`/images/${loDash(source)}.png`"
                                    :alt="`name: ${source}`"
                                    class="source__image"
                                />
                            </div>
                        </div>
                    <!-- </router-link> -->
                </li>
            </ul>
        </section>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertParamToName, loDash } from '../helpers'
import * as Images from '../mixins/images'

export default {
    name: 'item',
    computed: {
        ...mapGetters([
            'getItems'
        ]),
        items() {
            return this.getItems
        },
        item() {
            const itemName = convertParamToName(this.$route.params.name)

            return this.items.filter(item => item.name === itemName)[0]
        },
        hypheneditemName() {
            return this.$route.params.name
        }
    },
    methods: {
        loDash(string) {
            return loDash(string)
        }
    }
}
</script>

<style lang="scss" scoped>
@use "../../scss/index";

.item__page {
    width: 100%;
    padding: 50px;
    background-color: lighten(moccasin, 15%);
    border: 4px solid indigo;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include index.breakpoint('l') {
        margin-left: 166px;
    }
}

.item__name {
    font-size: 2.5em;
    text-align: center;
    margin-top: 0;
}

.item__description {
    text-align: center;
    font-size: 1.6em;
    margin-top: 0;
}

.item__figure {
    display: block;
    text-align: center;
}

.item__info {
}

.stats {
    margin: 0 auto;
}

.item__image {
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

.section--types,
.section--sources {
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

.type {
    text-align: center;
}

.type__image__wrapper,
.source__image__wrapper {
    border: 1px solid black;
    margin: 5px;
    background-color: lighten(moccasin, 10%);

    &:hover {
        background-color: darken(moccasin, 15%);
        cursor: pointer;
    }
}

.type__image,
.source__image {
    margin: 5px 15px;
    height: 66px;
    width: 66px;
}

.type__quantity {
    font-size: 1.7em;
    font-weight: 700;
    margin: 0;
}

.x {
    font-size: 0.6em;
    margin-right: 2px;
}

</style>