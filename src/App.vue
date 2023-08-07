<script>
import 'es6-promise/auto';
// Компоненты
import AppHeader from './components/AppHeader.vue';
import { RouterView } from 'vue-router'

// Главная страница
export default {
	computed:{
		getUser(){
			return this.$store.getters.getUser;
		}
	},
	components: {
		AppHeader,
		RouterView
	}
};


</script>

<template>
	<div class="app">
		<!-- Шапка -->
		<app-header></app-header>

		<!-- Меняющаяся часть -->
		<router-view class="router" ></router-view>
	</div>
</template>

<style>
body{
	background-color: #CFEFE6;
}
    
</style>
