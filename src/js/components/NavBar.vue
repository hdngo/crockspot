<template>
    <nav 
        class="nav"
    >
        <router-link 
            to="/"
            class="home"
        >
            CROCKSPOT
        </router-link>
        <MainSearchBar 
            ref="navSearch"
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
    }
}
</script>

<style lang="scss" scoped>
@use "../../scss/index";
.home {
    color: white;
    font-weight: 600;
    font-size: 2.3em;
    margin-bottom: 10px;

    @include index.breakpoint('l') {
        margin-bottom: 0;
    }
}

.nav {
    position: fixed;
    width: 100%;
    background-color: white;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 80px;
    z-index: 99;
    border-bottom: 2px solid purple;
    background-color: darken(purple, 5%);
    flex-wrap: wrap;
}

.nav::v-deep {
    .search {
        margin: 5px 0px;
    }

    .search--main{
        width: 100%;

        @include index.breakpoint('l') {
            width: auto;
        }
    }

    .form__search {
        font-size: 1.2em;
        width: 100%;
        padding: 0.5em 3em;
        border-radius: 10px;
        border: 1px solid indigo;
        box-shadow: 0 0 3pt 2pt transparent;
        transition: all 0.4s ease-in-out;
        outline: none;
        color: plum;

        &:focus {
            outline: none;
            box-shadow: 0 0 3pt 2pt plum;
            color: purple;
            font-weight: 600;
        }

        @include index.breakpoint('l'){
            min-width: 20em;
            width: auto;
        }

        &::placeholder {
            color: purple;
            letter-spacing: 0.1em;
        }
    }

    .search--results__wrapper {
        top: calc(100% + 11px);
        max-height: 550px;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: lighten(moccasin, 35%);
        border: 4px solid indigo;
        border-radius: 10px;
        padding: 0px 10px;
    }

    .results__item {
        font-size: 0.9em;
    }
}
</style>