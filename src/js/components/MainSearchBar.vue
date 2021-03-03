<template>
	<div class="search search--main">
		<form 
			class="form form--main"
			@submit.prevent
		>
			<input 
				class="form__input form__search"
				type="text"
				placeholder="Search"
				autocomplete="off"
				v-model="searchQuery"
				@input="handleChange"
				@keyup.enter="handleSubmit"
				@focus="handleFocus"
				@keydown.up="cycleUp"
				@keydown.down="cycleDown"
				@blur="handleBlur"
			>
		</form>
		<div 
			class="search--results__wrapper"
			v-if="results.length"
		>
			<SortItemButtons
				:dataset="results"
				@sorted="sortResults"
			/>
			<ul class="search--results">
				<SearchResult
					v-for="(item, i) in results"
					:key="`item-${i}`"
					:class="[
						{ 'focused' : focusedResultIndex === i }
					]"
					:name="highlightTextMatches(results[i].name)"
					:itemData="results[i]"
				/>
			</ul>
		</div>
	</div>
</template>

<script>
import SearchResult from './SearchResult.vue'
import SortItemButtons from './SortButtons.vue'
import { filterResults,  highlightTextMatches } from '../mixins/search'
import { mapGetters } from 'vuex'
import { sortByPropsAsc, sortByPropsDesc } from '../helpers'

export default {
	name: 'MainSearchBar',
	components: {
		SearchResult,
		SortItemButtons
	},
	data () {
		return {
			searchQuery: '',
			results: [],
			focusedResultIndex: 0,
			sorted: false,
			sortProperty: '',
			sortConfig: {}
		}
	},
	computed: {
		...mapGetters([
			"getRecipes"
		]),
		recipes() {
			return this.getRecipes
		},
	},
	methods: {
		handleChange(e) {
			if (this.searchQuery.length) {
				let filteredResults = filterResults(this.searchQuery, this.recipes)

				if (this.results && this.sorted) {
					let results = this.sortConfig.sortMethod.apply(null, [this.recipes, ...this.sortConfig.args])
					filteredResults = filterResults(this.searchQuery, results)
				}

				this.results = filteredResults.map(result => result)
			} else {
				this.reset()
			}
		},
		handleSubmit(e) {
			// console.log(this.recipes)
		},
		highlightTextMatches(word) {
			return highlightTextMatches(this.searchQuery, word)
		},
		handleFocus(e) {
			console.log('focused')
		},
		cycleUp(e) {
			let nextItemIndex = this.focusedResultIndex - 1

			if (nextItemIndex < 0) {
				if (this.results.length) {
					nextItemIndex = this.results.length - 1
				}
			}

			this.focusedResultIndex = nextItemIndex
		},
		cycleDown(e) {
			let nextItemIndex = this.focusedResultIndex + 1 % this.results.length
			this.focusedResultIndex = nextItemIndex % this.results.length
		},
		sortResults(value) {
            this.sorted = true
            this.results = filterResults(this.searchQuery, value.results).map(result => result)
			this.sortConfig = {...value}
        },
		handleBlur() {
			this.reset()
			// this.$emit('inputBlur', {focused: false})
		},
		reset() {
			this.searchQuery = ''
			this.results = []
			this.focusedResultIndex= 0
			this.sorted= false
			this.sortProperty = ''
			this.sortConfig = {}
		}
	}
}
</script>

<style lang="scss">
.search--main {
	text-align: center;
	position: relative;
}

.form__search {
	font-size: 1.4em;
	min-width: 17.8em;
	padding: 0.8em;

	/* @include breakpoint('s') {
		min-width: 20em;
	} */
}

.bold {
	font-weight: 600;
}

.search--results__wrapper {
	position: absolute;
	width: 100%;
	overflow: scroll;
	-ms-overflow-style: none;
	scroll-behavior: smooth;

	&::-webkit-scrollbar {
		display: none;
	}
}

.search--results {
	padding: 0;
}
</style>