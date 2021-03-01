<template>
    <div class="sort--options">
        <button
            @click="sortByNameDesc()"
        >
            name desc
        </button>
        <button
            @click="sortByNameAsc()"
        >
            name asc
        </button>
        <button
            @click="sortByHealthDesc()"
        >
            health desc
        </button>
        <button
            @click="sortByHealthAsc()"
        >
            health asc
        </button>
        <button
            @click="sortByHungerDesc()"
        >
            Hunger desc
        </button>
        <button
            @click="sortByHungerAsc()"
        >
            Hunger asc
        </button>
        <button
            @click="sortBySanityDesc()"
        >
            Sanity desc
        </button>
        <button
            @click="sortBySanityAsc()"
        >
            Sanity asc
        </button>
    </div>
</template>

<script>
import { sortByPropsAsc, sortByPropsDesc } from '../helpers'

export default {
    name: 'SortItemButtons',
    props: {
        dataset: {
            type: Array,
            required: true
        }
    },
    methods: {
        sortByNameAsc() {
			let sortedResults =  sortByPropsAsc(this.dataset, 'name')
            this.$emit('sorted', sortedResults)
		},
		sortByNameDesc() {
			let sortedResults =  sortByPropsDesc(this.dataset, 'name')
            this.$emit('sorted', sortedResults)
		},
		sortByHealthAsc() {
			let sortedResults =   sortByPropsAsc(this.dataset, 'stats', 'health')
            this.$emit('sorted', sortedResults)
		},
		sortByHealthDesc() {
			let sortedResults =   sortByPropsDesc(this.dataset, 'stats', 'health')
            this.$emit('sorted', sortedResults)
		},
		sortByHungerAsc() {
			let sortedResults =   sortByPropsAsc(this.dataset, 'stats', 'hunger')
            this.$emit('sorted', sortedResults)
		},
		sortByHungerDesc() {
			let sortedResults =   sortByPropsDesc(this.dataset, 'stats', 'hunger')
            this.$emit('sorted', sortedResults)
		},
		sortBySanityAsc() {
			let sortedResults =   sortByPropsAsc(this.dataset, 'stats', 'sanity')
            this.$emit('sorted', sortedResults)
		},
		sortBySanityDesc() {
			let sortedResults =   sortByPropsDesc(this.dataset, 'stats', 'sanity')
            this.$emit('sorted', sortedResults)
		}
    }
}
</script>