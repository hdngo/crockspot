<template>
	<div id="app">
		<NavBar />
		<Sidebar />
		<router-view></router-view>
		<div 
			v-if="hasScreen"
			class="screen"
		>
		</div>
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Sidebar from './components/SideBar.vue'
import { mapGetters } from 'vuex'

export default {
	name: 'App',
	components: {
		NavBar,
		Sidebar
	},
	computed: {
		...mapGetters([
			"getScreenActiveState"
		]),
		hasScreen() {
			return this.getScreenActiveState
		}
	}

};
</script>

<style lang="scss">
@use 'node_modules/modern-normalize/modern-normalize.css';
@use '../scss/index';

html,
body {
	width: 100%;
	height: 100%;
}

body {
	display: flex;
	flex-direction: column;
	
}

#app {
	flex: 1 1 auto;
	width: 100%;
	display: flex;
	justify-content: center;
	padding-top: 175px;
	padding-bottom: 60px;
	padding-left: 80px;
	padding-right: 80px;
	position: relative;
	background-image: -webkit-linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
	background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);

	@include index.breakpoint('l') {
		padding-top: 125px;
	}
}

a {
	text-decoration: none;
	transition: all 0.4s ease-out;
	text-shadow: 2px 1px 3px lavender;
	color: indigo;

        &:visited {
            color: lighten(indigo, 10%);
        }

        &:hover, &:focus {
            color: lighten(indigo, 10%);
            text-shadow: 2px 1px 3px plum;
        }
}

ul {
	list-style: none;
	padding-left: 0
}
</style>