<template>
    <div class="sort__wrapper">
        <button
            @click="sortByHealthAsc()"
            class="button--sort button--health button--asc"
        >
            <img 
                src="/images/health.png"
                alt="Sort by health asc"
            />
            <div class="caret"></div>
        </button>
        <button
            @click="sortByHealthDesc()"
            class="button--sort button--health button--desc"
        >
            <img 
                src="/images/health.png"
                alt="Sort by health desc"
            />
            <div class="caret"></div>
        </button>
        <button
            @click="sortByHungerAsc()"
            class="button--sort button--hunger button--asc"
        >
            <img 
                src="/images/hunger.png"
                alt="Sort by Hunger asc"
            />
            <div class="caret"></div>
        </button>
        <button
            @click="sortByHungerDesc()"
            class="button--sort button--hunger button--desc"
        >
            <img 
                src="/images/hunger.png"
                alt="Sort by Hunger desc"
            />
            <div class="caret"></div>
        </button>
        <button
            @click="sortBySanityAsc()"
            class="button--sort button--sanity button--asc"
        >
            <img 
                src="/images/sanity.png"
                alt="Sort by Sanity asc"
            />
            <div class="caret"></div>
        </button>
        <button
            @click="sortBySanityDesc()"
            class="button--sort button--sanity button--desc"
        >
            <img 
                src="/images/sanity.png"
                alt="Sort by Sanity desc"
            />
            <div class="caret"></div>
        </button>
    </div>
</template>

<script>
import { sortByPropsAsc, sortByPropsDesc } from '../helpers'
import { health, hunger, sanity } from '../mixins/images'

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

            event.target.parentElement.classList.add('active')
        }
    }
}
</script>

<style lang="scss" scoped>
@use "../../scss/index";

.sort__wrapper {
    text-align: center;
    margin-bottom: 15px;

    @include index.breakpoint('l') {
        text-align: right;
        margin: 5px;
    }
}

button.active {
    .caret, &:hover .caret {
        border-right-color: darkmagenta;
    }
}

.button--sort {
    position: relative;
    background: none;
    border: none;

    &:hover {
        cursor: pointer;

        .caret {
            border-right-color: darken(plum, 25%);
        }
    }

    &:focus {
        outline: none;
    }
}

.button--desc {
    .caret {
        top: calc(100% - 8px);
        transform: rotate(-90deg);
    }
}

.button--asc {
    .caret {
        bottom: calc(100% - 6px);
        transform: rotate(90deg);
    }
}
.caret {
    z-index: 1;
    position: absolute;
    width: 0px;
    height: 0px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid plum;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    left: calc(50% - 5px);
}

.button--sort img {
    height: 44px;
    width: 44px;
}
</style>