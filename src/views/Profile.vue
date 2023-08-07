<script>
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

export default {
    data(){
        return{
          user:{},
          err1:false,
          isGood:false,
          username:'',
          password:'',
          image:''
        }
    },
    methods: {
      goLogin(){
            this.$router.push({
			name: 'login'
		})
  },
    goRegister(){
            this.$router.push({
			name: 'register'
		})
        },
        oRegister(){
            this.$router.push({
			name: 'register'
		})
        },
        async save(evt) {
          evt.preventDefault();
            if (this.password!=''&&this.username!=''){
            let response = await axios.post('/profile/edit',{
              username:this.username,
              password:this.password,
              image:this.image,
              _id:this.getUser._id
            });
            if (response.data == 'err1'){
              this.err1 = true;
            }  else {
            this.isGood = true;
            this.err1 = false;
            this.$store.commit('updateUser',response.data);
          }}
          },
         
  },
  computed:{
		getUser(){
			return this.$store.getters.getUser;
		}
	},
    mounted(){
      this.username = this.getUser.username;
      this.password = this.getUser.password;
      this.image = this.getUser.image;
    }
}
</script>

<template>
<!-- Pills navs -->
<div class="row">
  <img :src="image" alt="" class="col-3">
<div class="col-7">
<div class="card">


    <form @submit="save">

      <!-- Email input -->
      <div class="all-3" >
          <h6>Username</h6>
      </div>
      <div class="form-outline ">
        <input v-model="username" type="text" id="loginName" class="form-control" placeholder="Username"/>
      </div>

      <!-- Password input -->
      <div class="all-3" >
        <h6>Пароль</h6>
      </div>
      <div class="form-outline ">
        <input v-model="password" type="text" id="loginPassword" class="form-control" placeholder="Пароль"/>
      </div>
      <!-- Image input -->
      <div class="all-3" >
          <h6>Аватарка</h6>
      </div>
      <div class="form-outline ">
        <input v-model="image" type="text" id="loginName" class="form-control" placeholder="Аватарка"/>
      </div>
      <div class="all" >
        <h5>Максимальная серия правильных ответов: {{ getUser.maxSeries }}</h5>
      </div>
      <div class="all" >
        <h5>Всего правильных ответов: {{ getUser.allTrue }}</h5>
      </div>

      <div class="all" v-if="err1">
        <h2>Ошибка</h2>
      </div>

      <!-- Submit button -->
      <div class="btnBlock">
      <button type="submit" class="btn btn-primary btn-block mb-4">Сохранить</button>
      </div>
      <!-- Register buttons -->
    </form>
    <div class="all good" v-if="isGood">
    <h3>Данные успешно сохранены</h3>
    </div>
  </div>
</div>
</div>
</template>


<style scoped>
img{
  border-radius: 38%;
  width: auto;
  height: auto;
}
h2{
  color:rgb(178, 0, 0)
}
.all, .btnBlock{
  display: flex;
    justify-content: center;
}
.all-3{
  display: flex;
    justify-content: flex-start;
    align-items: center;
}
h6{
  margin: 5px 20px;
}
.card-body{
  width: auto;
    font-size: 20px;
font-weight: bolder;
font-family: Verdana, Geneva, Tahoma, sans-serif;
color:#8B8BAE;
text-align: center;
}
.card{
    margin: 5px;
    border-radius: 20px;
    width: auto;
    
}
.form-outline{
  display: flex;
    justify-content: center;
    margin: 10px;
}
.card-title{
    font-size: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color:#0854A7;
    font-style: italic;

}
.btn{
  background-color: #1A99A1;
  color: #541D7F;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  margin: 10px;
}
.row{
  justify-content: space-around;
}
.choosen{
  background-color: #0854A7;
  color:#8B8BAE
}
.good{
  background-color: rgb(15, 204, 24);
  border-radius: 20px;
}
</style>