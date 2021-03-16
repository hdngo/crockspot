<template>
	<div class="search search--main">
		<form 
			:class="{'active': searchQuery.length }"
			class="form form--main"
			@submit.prevent
		>
			<input 
				class="form__input form__search"
				type="text"
				placeholder="Search for an item"
				autocomplete="off"
				v-model="searchQuery"
				@input="handleChange"
			>
			<button 
				class="cancel"
				@click="reset"
			>X</button>
		</form>
		<div 
			class="search--results__wrapper"
			v-if="searchQuery.length"
		>
			<!-- <SortItemButtons
				:dataset="results"
				@sorted="sortResults"
			/> -->
			<ul 
				v-if="results.length"
				class="search--results"
			>
				<SearchResult
					v-for="(item, i) in results"
					:key="`item-${i}`"
					:name="highlightTextMatches(results[i].name)"
					:itemData="results[i]"
					@selected="handleSelected"
				/>
			</ul>
			<ul
				v-if="(!results.length && searchQuery.length)"
				class="search--results"
			>
				<li>
					<p>No results found for <em>{{ searchQuery }}</em></p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { loDash } from '../helpers'
import SearchResult from './SearchResult.vue'
import { filterResults,  highlightTextMatches } from '../mixins/search'
import { mapGetters, mapActions } from 'vuex'
// import SortItemButtons from './SortButtons.vue'
// import { sortByPropsAsc, sortByPropsDesc } from '../helpers'

export default {
	name: 'MainSearchBar',
	components: {
		SearchResult,
		// SortItemButtons
	},
	data () {
		return {
			searchQuery: '',
			results: [],
			// focusedResultIndex: 0,
			// sorted: false,
			// sortProperty: '',
			// sortConfig: {}
		}
	},
	computed: {
		...mapGetters([
			"getInventory",
			"getScreenActiveState"
		]),
		inventory() {
			return this.getInventory
		},
		hasScreen() {
			return this.getScreenActiveState
		}
	},
	mounted() {
		window.addEventListener('keyup', this.closeOnEsc)
	},
	methods: {
		...mapActions([
			'setScreenState'
		]),
		loDash(string) {
			return loDash(string)
		},
		handleChange(e) {
			if (this.searchQuery.length) {
				let filteredResults = filterResults(this.searchQuery, this.inventory)

				/* if (this.results && this.sorted) {
					let results = this.sortConfig.sortMethod.apply(null, [this.recipes, ...this.sortConfig.args])
					filteredResults = filterResults(this.searchQuery, results)
				} */

				this.results = filteredResults.map(result => result)
				if (this.results.length) {
					this.setScreenState(true)
				}
			} else {
				this.reset()
				this.setScreenState(false)
			}
		},
		/* handleSubmit(e) {
			let result = this.results[this.focusedResultIndex]
			if (result) {
				this.handleSelected()
				if (result.hasOwnProperty("types")) {
					this.$router.push(`/items/${loDash(result.name)}`)
				} else if (result.hasOwnProperty("ingredients")) {
					this.$router.push(`/recipes/${loDash(result.name)}`)
				}
			}
		}, */
		highlightTextMatches(word) {
			return highlightTextMatches(this.searchQuery, word)
		},
		/* cycleUp(e) {
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
		}, */
		/* sortResults(value) {
            this.sorted = true
            this.results = filterResults(this.searchQuery, value.results).map(result => result)
			this.sortConfig = {...value}
        }, */
		reset() {
			this.searchQuery = ''
			this.results = []
			this.setScreenState(false)
			// this.focusedResultIndex= 0
			/* this.sorted= false
			this.sortProperty = ''
			this.sortConfig = {} */
		},
		handleSelected() {
			this.reset()
			this.setScreenState(false)
		},
		closeOnEsc() {
			if (event.code === "Escape") {
				this.reset()
			}
		}
	}
}
</script>

<style lang="scss">
@use "../../scss/index";


.search--main {
	text-align: center;
	position: relative;
}

.form--main {
	position: relative;

	&.active {
		.cancel {
			opacity: 1;
			pointer-events: all;
			color: darken(violet, 10%);
			cursor: pointer;
			font-weight: 700;
		}
	}
}

.form__search {
	font-size: 1.4em;
	padding: 0.8em;
	min-width: 0;

	@include index.breakpoint('l') {
		min-width: 17.8em;
	}
}

.cancel {
	font-size: 1.6em;
	background: transparent;
	border: none;
	transition: all 0.3s ease-out;
	position: absolute;
	right: 10px;
	top: calc(1.6em / 6);
	opacity: 0;
	transition: all 0.4s ease-in;
	pointer-events: none;
	outline: none;

	&:hover {
		color: darken(violet, 10%);
		cursor: pointer;
		pointer-events: all;
	}
}

.bold {
	font-weight: 700;
	color: purple;
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

.screen {
	background-color: lighten(moccasin, 10%);
	opacity: 0.7;
	position: absolute;
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
}
</style>