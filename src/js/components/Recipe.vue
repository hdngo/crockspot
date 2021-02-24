<template>
<div>
    {{ this.$route.params.name }}
</div>
</template>

<script>
export default {
    name: 'Recipe',
    beforeCreate() {
        console.log(this.$route.params)
    }
}
</script>