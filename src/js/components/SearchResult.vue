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
                    :key="`${statKey.toLowerCase().split(' ').join()}-${stat}`"
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