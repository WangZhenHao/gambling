<template>
	<div id="app">
        <router-view />
	</div>
</template>

<script>

export default {
	components: {},
	name: "App",
	data() {
		return {
            // this.$root
            userInfo: {}
		};
	},
	computed: {},
	watch: {
		
	},
	created() {
		
	},  
	beforeMount() {
		
	},
};
</script>

<style>
::-webkit-scrollbar {
	display: none;
}
html,
body {
	width: 100vw;
	min-height: 100vh !important;
}
#app {
	width: 100vw;
	min-height: 100vh;
}
</style>

<style lang="less">
@import './common/css/common.css';
</style>
