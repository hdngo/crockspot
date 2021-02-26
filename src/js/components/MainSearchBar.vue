<template>
	<div class="search--main">
		<form 
			class="form form--main"
			@submit.prevent
		>
			<input 
				class="form__input form__search"
				type="text"
				placeholder="Type something to get started"
				autocomplete="off"
				v-model="searchQuery"
				@input="handleChange"
				@keyup.enter="handleSubmit"
				@focus="handleFocus"
				@keydown.up="cycleUp"
				@keydown.down="cycleDown"
			>
		</form>
		<div 
			class="search--results__wrapper"
			v-if="results.length"
		>
			<button
				@click="sortByNameDesc(results)"
			>
				desc
			</button>
			<button
				@click="sortByNameAsc(results)"
			>
				asc
			</button>
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
import { filterResults, sortResults, highlightTextMatches } from '../mixins/search'
import { mapGetters } from 'vuex'

export default {
	name: 'MainSearchBar',
	components: {
		SearchResult
	},
	props: {},
	data () {
		return {
			searchQuery: '',
			results: [],
			focusedResultIndex: 0
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
				let filteredResults = filterResults(this.searchQuery, this.recipes);
				this.results = filteredResults.map(result => result)
			} else {
				this.results = [];
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
		sortByNameDesc(data) {
			this.results = data.sort((a, b) => {
				return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
			})
		},
		sortByNameAsc(data) {
			this.results = data.sort((a, b) => {
				return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
			})
		}
	}
}
</script>

<style lang="scss">
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

.search__results {
	padding: 0;
}
</style>