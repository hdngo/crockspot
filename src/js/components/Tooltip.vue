<template>
    <div 
        class="tooltip"
    >
        {{ text }}
    </div>
</template>

<script>
export default {
    name: "Tooltip",
    props: {
        text: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            "visible": false
        }
    }
}
</script>

<style lang="scss">
.tooltip {
    background-color: lighten(plum, 20%);
    border: 1px solid darken(purple, 5%);
    color: darken(purple, 10%);
    padding: 4px;
    border-radius: 10px;
    position: absolute;
    display: block;
    opacity: 0;
    bottom: 85%;
    z-index: 3;

    &.visible {
        opacity: 1;
    }
}
</style>