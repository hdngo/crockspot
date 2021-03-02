<template>
    <nav 
        class="nav"
    >
        <MainSearchBar 
            ref="navSearch"
            @inputBlur="handleBlur"
        />
    </nav>
</template>

<script>
import MainSearchBar from './MainSearchBar.vue'
export default {
    name: 'NavBar',
    components: {
        MainSearchBar
    },
    mounted() {
        window.addEventListener('click', this.handleClick, {capture: true})
    },
    methods: {
        handleBlur(value) {
            console.log(value.focused)
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav {
        position: fixed;
        width: 100%;
        background-color: white;
        top: 0;
        display: flex;
        justify-content: flex-end;
        padding: 0 80px;
        height: 58px;
    }

    .nav::v-deep {
        .search {
            margin: 10px;
        }
        .form__search {
            font-size: 0.8em;
            min-width: 3em;
            padding: 0.8em;

            border-radius: 1.5em;
            border: 1px solid indigo;
            box-shadow: 0 0 3pt 2pt transparent;
            transition: all 0.4s ease-in-out;
            outline: none;

            &:focus {
                outline: none;
                box-shadow: 0 0 3pt 2pt plum;
            }
        }

        .search--results__wrapper {
            top: calc(100% + 11px);
            max-height: 550px;
            overflow-y: scroll;
            overflow-x: hidden;
            background-color: white;
            border: 1px solid indigo;
            border-radius: 5px;
        }

        .results__item {
            font-size: 0.9em;
        }
    }
</style>