<template>
    <form class="form form--main">
        <input 
            class="form__input form__search"
            type="text"
            placeholder="Type something to get started"
            autocomplete="off"
            @keyup="handleKeyup"
        >
    </form>
</template>

<script>

export default {
    name: 'MainSearchBar',
    components: {},
    props: {},
    data () {
        return {
            sample: 'haikyuu'
        }
    },
    methods: {
        handleKeyup(e) {
            console.log(e.code)
            console.log(this.sample)
        }
    }
}
</script>

<style lang="scss" scoped>
.form__search {
    font-size: 1.4em;
    min-width: 17.8em;
    padding: 0.8em;

    /* @include breakpoint('s') {
        min-width: 20em;
    } */
}
</style>