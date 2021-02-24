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
			>
		</form>
		<div 
			class="search--results__wrapper"
			v-if="results.length"
		>
			<ul class="search--results">
				<SearchResult
					v-for="(item, i) in results"
					:key="`item-${i}`"
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
			results: []
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
</style>