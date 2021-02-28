<template>
	<div id="app">
		<Sidebar />
		<router-view></router-view>
	</div>
</template>

<script>
import Sidebar from './components/SideBar.vue'

export default {
	name: 'App',
	components: {
		Sidebar
	}

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
	position: relative;
	background: #41295a;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to bottom, #2F0743, #41295a);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to bottom, #2F0743, #41295a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

a {
	color: white;
	text-decoration: none;
	text-shadow: 2px 1px 3px lavender;
	transition: all 0.4s ease-out;
	
	&:visited {
		color: ivory;
	}

	&:hover, &:focus {
		color: lighten(plum, 10%);
		text-shadow: 2px 1px 3px darkorchid;
	}
}

ul {
	list-style: none;
	padding-left: 0
}
</style>