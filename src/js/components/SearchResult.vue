<template>
    <li 
        class="results__item"
    >
        <div class="results__info">
            <div class="results__details">
                <p
                    class="results__name"
                    v-html="name" 
                />
                <span class="results__description">

                </span>
            </div>
            <ul class="results__stats">
                <li
                    v-for="statKey in Object.keys(itemData.stats)"
                    class="results__stat"
                    :key="`${statKey.toLowerCase().split(' ').join()}-${statKey}`"
                >
                    {{ `${statKey} : ${itemData.stats[statKey]}` }}
                </li>
            </ul>
        </div>
    </li>
</template>

<script>
import { highlightTextMatches } from '../mixins/search'

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
}
</script>

<style lang="scss" scoped>
li {
    list-style-type: none;
}

.results__item {
    border: 2px solid transparent;
    border-radius: 4px;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    padding: 0.5em 0.8em;

    &:hover {
        cursor: pointer;
    }
}

.results__stat {
    display: inline-block;
}

.focused {
    border: 2px solid indigo;
}
</style>