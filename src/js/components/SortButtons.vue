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
    data() {
        return {}
    },
    props: {
        dataset: {
            type: Array,
            required: true
        }
    },
    methods: {
        sortByNameAsc() {
            this.updateActiveButton(event)
			let sortedResults = sortByPropsAsc(this.dataset, 'name')
            this.$emit('sorted', { results: sortedResults, sortMethod: sortByPropsAsc, args: ['name'] })
		},
		sortByNameDesc() {
            this.updateActiveButton(event)
			let sortedResults = sortByPropsDesc(this.dataset, 'name')
            this.$emit('sorted', { results: sortedResults, sortMethod: sortByPropsDesc, args: ['name'] })
		},
		sortByHealthAsc() {
            this.updateActiveButton(event)
			let sortedResults = sortByPropsAsc(this.dataset, 'stats', 'health')
            this.$emit('sorted', { results: sortedResults, sortMethod: sortByPropsAsc, args: ['stats', 'health'] })
		},
		sortByHealthDesc() {
            this.updateActiveButton(event)
			let sortedResults =  sortByPropsDesc(this.dataset, 'stats', 'health')
            this.$emit('sorted', { results: sortedResults, sortMethod: sortByPropsDesc, args: ['stats', 'health'] })
		},
		sortByHungerAsc() {
            this.updateActiveButton(event)
			let sortedResults = sortByPropsAsc(this.dataset, 'stats', 'hunger')
            this.$emit('sorted', { results: sortedResults, sortMethod: sortByPropsAsc, args: ['stats', 'hunger'] })
		},
		sortByHungerDesc() {
            this.updateActiveButton(event)
			let sortedResults = sortByPropsDesc(this.dataset, 'stats', 'hunger')
            this.$emit('sorted', { results: sortedResults, sortMethod: sortByPropsDesc, args: ['stats', 'hunger'] })
		},
		sortBySanityAsc() {
            this.updateActiveButton(event)
			let sortedResults = sortByPropsAsc(this.dataset, 'stats', 'sanity')
            this.$emit('sorted', { results: sortedResults, sortMethod: sortByPropsAsc, args: ['stats', 'sanity'] })
		},
		sortBySanityDesc() {
            this.updateActiveButton(event)
			let sortedResults = sortByPropsDesc(this.dataset, 'stats', 'sanity')
            this.$emit('sorted', { results: sortedResults, sortMethod: sortByPropsDesc, args: ['stats', 'hunger'] })
		},
        updateActiveButton(event) {
            let activeButton = this.$el.querySelector('.active')
            if (activeButton && activeButton !== event.target) {
                activeButton.classList.remove('active')
            }

            event.target.classList.add('active')
        }
    }
}
</script>

<style lang="scss" scoped>
button.active {
    background-color: green;
}
</style>