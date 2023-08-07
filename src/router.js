import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import Instruction from './views/Instruction.vue';
import Play from './views/Play.vue';
import Rating from './views/Rating.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';


export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'instruction',
            component: Instruction,
        },
        {
            path: '/play',
            name: 'play',
            component: Play,
        },
        {
            path: '/rating',
            name: 'rating',
            component: Rating
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
    ]
})