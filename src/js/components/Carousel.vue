<template>
    <div
        ref="carousel"
        class="carousel"
    >
        <ul 
            class="carousel__items"
            v-if="selectedCategoryItems.length"
        >
            <li
                v-for="(item, i) in selectedCategoryItems"
                :key="`${loDash(selectedCategory)}-item-${i}`"
                class="carousel__item tooltip--parent"
                @click="handleClick"
                @mouseenter="showTooltip"
                @mouseleave="hideTooltip"
            >
                <router-link
                    :to="`/items/${loDash(item.name)}`"
                >
                    <Tooltip
                        :text="item.name"
                    />
                    <img
                        class="carousel__image"
                        :src="`/images/${loDash(item.name)}.png`"
                        :alt="item.name"
                    />
                </router-link>
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
        <div 
            class="carousel__control carousel__close"
            @click="closeCarousel"
        />
    </div>
</template>

<script>
import { loDash } from '../helpers'
import Tooltip from './Tooltip.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Carousel',
    components: {
        Tooltip
    },
    props: {
        selectedCategory: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            carousel: null,
            observers: []
        }
    },
    computed: {
        ...mapGetters([
            "getItemCategories",
            "getItems",
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
        },
    },
    mounted() {
        this.setupCarousel()
    },
    updated() {
       this.setupCarousel()
    },
    destroyed() {
        this.setCarouselOpenState(false)
        window.removeEventListener('keyup', this.closeOnEsc)
    },
    watch: {
        selectedCategory: function (oldCategory, newCategory) {
            if (this.carousel) {
                this.carousel.scrollArea.scrollTop = 0
            }
        }
    },
    methods: {
        ...mapActions([
            'setCarouselOpenState'
        ]),
        loDash(string) {
            return loDash(string)
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
            this.observers.push(observer)
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
        handleClick() {
            this.closeCarousel()
        },
        handlePrevClick() {
            this.scrollToPrev()
        },
        handleNextClick() {
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
                scrollArea.scrollTop = scrollArea.scrollTop + (nextItem.offsetTop - carouselBottom) - 1
            }
        },
        closeCarousel() {
            this.observers[0].disconnect()
            this.observers[1].disconnect()
            this.observers = []
            this.carousel = null;
            this.$emit('close')
        },
        closeOnEsc() {
            if (event.code === "Escape") {
                this.closeCarousel()
            }
        },
        setupCarousel() {
            if (this.$refs.carousel) {
                this.carousel = this.$refs.carousel
                this.setCarouselOpenState(true)
                window.addEventListener('keyup', this.closeOnEsc)
            }

            if (this.$refs.carousel && this.$refs.prevButton) {
                this.carousel.prevButton = this.$refs.prevButton
            }

            if (this.$refs.carousel &&this.$refs.nextButton) {
                this.carousel.nextButton = this.$refs.nextButton
            }

            if (this.$refs.prevButton || this.$refs.nextButton) {
                this.carousel.firstItem = this.carousel.querySelector('.carousel__item:first-of-type')
                this.carousel.lastItem = this.carousel.querySelector('.carousel__item:last-of-type')
                this.carousel.scrollArea = this.carousel.querySelector('.carousel__items')
                this.carousel.items = this.carousel.querySelectorAll('.carousel__item')
            }
            
            if (this.carousel.prevButton && this.$refs.carousel) {
                this.createObserver(this.$refs.carousel, this.carousel.firstItem)
            }

            if (this.carousel.nextButton && this.$refs.carousel) {
                this.createObserver(this.$refs.carousel, this.carousel.lastItem)
            }
        },
        showTooltip() {
            const tooltip = event.target.querySelector('.tooltip')
            tooltip.classList.add('visible')
        },
        hideTooltip() {
            const tooltip = event.target.querySelector('.tooltip')
            tooltip.classList.remove('visible')
        }
    }
}
</script>

<style lang="scss" scoped>
.carousel__image {
    height: 44px;
    width: 44px;
}

.carousel {
    background-color: purple;
    position: absolute;
    left: calc(100% + 20px);
    height: 100%;
    border-radius: 10px;
}

.carousel__items {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    overflow-x: visible;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
    padding: 5px;
    border: 4px solid black;
    border-radius: 10px;
    
    &::-webkit-scrollbar {
        display: none;
    }
}

.carousel__item {
    display: flex;
    margin: 10px;
    background-color: lighten(moccasin, 5%);
    border: 2px solid black;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: darken(moccasin, 15%);
    }

    a {
        padding: 5px;
    }
}

.carousel__control {
    position: absolute;
}

.carousel__control--prev,
.carousel__control--next {
    background-color: lighten(moccasin, 5%);
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 1.2em;
    color: plum;
    transition: all 0.4s ease-in-out;

    &:hover {
        &:not(:disabled) {
            background-color: darken(moccasin, 15%);
            cursor: pointer;
            color: indigo;
            font-weight: 700;
        }
    }

    &:focus {
        outline: none;
    }
}

.carousel__control:disabled {
    background-color: lighten(moccasin, 10%);
    border-color: moccasin;
    color: lightgrey;
}

.carousel__control--prev {
    bottom: calc(100% + 5px);
    left: calc(50% - 48px);
}

.carousel__control--next {
    top: calc(100% + 5px);
    left: calc(50% - 30px);
}

.carousel__close {
    width: 0px;
    height: 0px;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid purple;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    top: calc(50% - 10px);
    right: 100%;

    &:hover {
        border-right: 20px solid darken(violet, 70%);
        cursor: pointer;
    }
}

/* unfortunate absolute overflow clipping issue :( */
.tooltip--parent::v-deep .tooltip {
    font-size: 0.7em;
    word-break: break-all;
    bottom: auto;
    top: 85%;
    width: 100%;
    left: 0;
    color: darkmagenta;
    font-weight: 700;
}
</style>