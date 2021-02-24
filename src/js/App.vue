<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style lang="scss">
@use 'node_modules/modern-normalize/modern-normalize.css';
@use '../scss/index';

html,
body {
	height: 100%;
	width: 100%
}

#app {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	padding-top: 200px;
	padding-left: 80px;
	padding-right: 80px;
}
</style>