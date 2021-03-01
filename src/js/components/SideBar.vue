<template>
    <aside
        class="sidebar"
    >
        <ul class="menu">
            <li
                v-for="(category, i) in categories"
                :key="`category-${category}-${i}`"
                class="menu__item"
                @click="handleClick(category.name)"
            >
                <router-link
                    :to="`/items/${loDash(category.name)}`"
                >
                    {{ category.name }}
                </router-link>
            </li>
        </ul>
        <div
            ref="carousel"
            class="carousel carousel--hidden"
        >
            <ul 
                class="carousel__items"
                v-if="selectedCategoryItems.length"
                v-on:scroll="handleScroll"
            >
                <li
                    v-for="(item, i) in selectedCategoryItems"
                    :key="`${loDash(selectedCategory)}-item-${i}`"
                    class="carousel__item"
                >
                    {{ item.name }}
                </li>
            </ul>
            <button
                class="carousel__control carousel__control--prev"
                ref="prevButton"
                @click="handlePrevClick"
                disabled
            >
                Previous
            </button>
            <button
                class="carousel__control carousel__control--next"
                ref="nextButton"
                @click="handleNextClick"
                disabled
            >
                Next
            </button>
        </div>
    </aside>
</template>

<script>
import { loDash } from '../helpers'
import { mapGetters } from 'vuex'

export default {
    name: 'Sidebar',
    data() {
        return {
            selectedCategory: null,
            carousel: null,
        }
    },
    computed: {
        ...mapGetters([
            "getItemCategories",
            "getItems"
        ]),
        items() {
            return this.getItems
        },
        categories() {
            return this.getItemCategories
        },
        selectedCategoryItems() {
            let items = []
            if (this.selectedCategory) {
                items = [...this.getCategoryItems(this.selectedCategory)]
            }
            return items
        }
    },
    mounted() {
        if (this.$refs.carousel) {
            this.carousel = this.$refs.carousel
        }
    },
    updated() {
        if (this.$refs.prevButton) {
            this.carousel.prevButton = this.$refs.prevButton
        }

        if (this.$refs.nextButton) {
            this.carousel.nextButton = this.$refs.nextButton
        }

        if (this.$refs.prevButton || this.$refs.nextButton) {
            this.carousel.firstItem = this.carousel.querySelector('.carousel__item:first-of-type')
            this.carousel.lastItem = this.carousel.querySelector('.carousel__item:last-of-type')
            this.carousel.scrollArea = this.carousel.querySelector('.carousel__items')
            this.carousel.items = this.carousel.querySelectorAll('.carousel__item')
        }
        
        if (this.carousel.prevButton) {
            this.createObserver(this.$refs.carousel, this.carousel.firstItem)
        }

        if (this.carousel.nextButton) {
            this.createObserver(this.$refs.carousel, this.carousel.lastItem)
        }
    },
    methods: {
        loDash(string) {
            return loDash(string)
        },
        handleClick(categoryName) {
            if (this.carousel) {
                this.carousel.classList.remove('carousel--hidden')
            }
            this.selectedCategory = categoryName
        },
        getCategoryItems(categoryName) {
            return this.items.
                slice(this.categories.length).
                filter(item => 
                    item.types.includes(categoryName)
                )
        },
        createObserver(rootEl, el) {
            let observer;

            let options = {
                root: rootEl,
                rootMargin: "0px",
                threshold: [1]
            }

            observer = new IntersectionObserver(this.handleIntersect, options)
            observer.observe(el)
        },
        handleIntersect(entries, observer) {
            let prevButton = this.carousel.prevButton
            const nextButton = this.carousel.nextButton
            let firstItem = this.carousel.firstItem
            let lastItem = this.carousel.lastItem
            entries.forEach((entry) => {
                if (entry.intersectionRatio === 1) {
                    if (entry.target === firstItem) {
                        prevButton.disabled = true
                    } else if (entry.target === lastItem) {
                        nextButton.disabled = true
                    }
                } else {
                    if (entry.target === firstItem) {
                        prevButton.disabled = false
                    } else if (entry.target === lastItem) {
                        nextButton.disabled = false
                    }
                }
            })
        },
        handleScroll() {
            console.log('scrolly')
        },
        handlePrevClick() {
            console.log('prev')
            this.scrollToPrev()
        },
        handleNextClick() {
            console.log('next')
            this.scrollToNext()
        },
        scrollToPrev() {
            const itemMargin = 10
            let items = this.carousel.items
            let scrollArea = this.carousel.scrollArea
            let clippedItem
            let prevItem

            let carouselTop = scrollArea.scrollTop

            for (let i = 0; i < items.length; i++) {
                let itemTop = items[i].offsetTop
                if (itemTop < carouselTop) {
                    clippedItem = items[i]
                } else {
                    clippedItem = items[i - 1]
                    break
                }
            }
            if (clippedItem) {
                scrollArea.scrollTop = clippedItem.offsetTop - itemMargin
            }
        },
        scrollToNext() {
            const itemMargin = 10
            let items = this.carousel.items
            let scrollArea = this.carousel.scrollArea
            let clippedItem
            let nextItem
            let carouselBottom = scrollArea.scrollTop ? scrollArea.offsetTop + scrollArea.offsetHeight + scrollArea.scrollTop : scrollArea.offsetTop + scrollArea.offsetHeight

            for (let i = 0; i < items.length; i++) {
                if (clippedItem) {
                    break
                }
                let itemBottom = items[i].offsetTop + items[i].offsetHeight
                if (itemBottom > carouselBottom) {
                    clippedItem = items[i]
                    if (i + 1 < items.length) {
                        nextItem = items[i + 1]
                    } else {
                        nextItem = null
                    }
                }
            }

            if (clippedItem && !nextItem) {
                scrollArea.scrollTop = scrollArea.scrollTop + clippedItem.offsetHeight + (itemMargin * 2)
            }

            if (nextItem) {
                scrollArea.scrollTop = scrollArea.scrollTop + (nextItem.offsetTop - carouselBottom)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
    padding: 10px 5px;
    background-color: rgb(104, 62, 48);
    border: 4px solid black;
    position: absolute;
    left: 0;
}

.menu {
    padding: 5px;
    background-color: rgb(41, 14, 4);
    border: 2px solid black;
}

.menu__item {
    background-color: moccasin;
    border: 2px solid black;
    padding: 5px;
    margin: 5px;
    color: indigo;

    a {
        color: indigo;

        &:visited {
            color: lighten(indigo, 10%);
        }

        &:hover, &:focus {
            color: lighten(indigo, 10%);
            text-shadow: 2px 1px 3px plum;
        }
    }
}

.carousel {
    background-color: rgb(41, 14, 4);
    position: absolute;
    left: calc(100% + 20px);
    height: 100%;

    &.carousel--hidden {
        display: none;
    }
}

.carousel__items {
    height: 100%;
    margin: 0;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
        display: none;
    }
}

.carousel__item {
    padding: 5px;
    margin: 10px;
    background-color: moccasin;
}

.carousel__control {
    position: absolute;
}

.carousel__control--prev {
    bottom: 100%;
}

.carousel__control--next {
    top: 100%;
}
</style>