<script>
export default {
    data(){
        return{
            user:{}
        }
    },
    computed:{
		getUser(){
			return this.$store.getters.getUser;
		}
	},
    methods: {
        goInstruction(){
            this.$router.push({
			name: 'instruction'
		})
        },
        goPlay(){
            this.$router.push({
			name: 'play'
		})
        },
        goRating(){
            this.$router.push({
			name: 'rating'
		})
        },
        goLogin(){
            this.$router.push({
			name: 'login'
		})
        },
        goProfile(){
            this.$router.push({
			name: 'profile'
		})
        },
        out(){
            this.$store.commit('updateUser',{});
            this.$router.push({
			name: 'instruction'
		});
          }
	}
}
</script>
<template>
    <div class="app-header row mb-3">
        <button class="btn logo col" @click="goInstruction">
            CleverVictoriniO
        </button>
        <button @click="goPlay" class="choose btn btn-outline-secondary col">
            Игра
        </button>

        <button @click="goRating" class="choose btn btn-outline-secondary col">
            Рейтинг
        </button>

        <button @click="goLogin" class="choose btn btn-outline-secondary col" v-if="!getUser._id">
            Авторизация
        </button>
        <button @click="out" class="choose btn btn-outline-secondary col" v-if="getUser._id">
            Выйти
        </button>
        <button @click="goProfile" class="choose btn btn-outline-secondary col" v-if="getUser._id">
            Профиль 
        </button>
        <img @click="goProfile" class=" image" :src="getUser.image" alt="avatar" v-if="getUser._id">
        
        

    </div>
    
</template>

<style scoped>
.image{
    transition: 500ms;
    height: 60px;
    width:auto;
    border-radius: 38%;
}
.image:hover{
    transition: 500ms;
    height: 120px;
}
.app-header {
margin: 5px;
    justify-content: center;
    padding: 5px 0;

    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #1A99A1;
    border-radius: 50px;
}

.choose {
    transition: 500ms;
    font-size: 20px;
font-weight: bolder;
font-family: Verdana, Geneva, Tahoma, sans-serif;
    border: 0;
    color: #0854A7;
}
.choose:hover{
    transition: 500ms;
    font-size: 25px;
font-weight: bolder;
font-family: Verdana, Geneva, Tahoma, sans-serif;
    border: 0;
    background-color: #8B8BAE;
    color:#541D7F;
    font-style: italic;
    border-radius: 100px;
}
.logo{
    transition: 500ms;
font-size: 30px;
font-weight: bolder;
font-family: Verdana, Geneva, Tahoma, sans-serif;
color:#541D7F;
font-style: italic;
}
.logo:hover{
    transition: 500ms;
font-size: 35px;
border: 0;
font-weight: bolder;
font-family: Verdana, Geneva, Tahoma, sans-serif;
color:#541D7F;
font-style: italic;
border-radius: 100%;
}
</style>