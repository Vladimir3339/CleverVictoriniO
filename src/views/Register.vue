<script>
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

export default {
    data(){
        return{
          user:{},
          username:'',
          pas1:'',
          pas2:'',
          err2:false,
          err3:false,
          isGood:false
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
        async send(evt) {
          evt.preventDefault();
if (this.pas1==this.pas2 && this.pas1!=''&&this.username!=''){
            let response = await axios.post('/register/add',{
              username:this.username,
              password:this.pas2
            });
            this.pas1 = '';
            this.pas2 = '';
            this.username = ''
            this.user = response.data
            if (this.user == 'err3'){
              this.err3 = true;
              this.user = {};
            } 
          }
          else {
            this.err2 = true;
          }
          if (this.user._id){
            this.isGood = true;
            this.err2 = false;
            this.err3 = false;
            this.$store.commit('updateUser',this.user);
          }
          },
    err2Change(){
      this.err2=false
    },
    err3Change(){
      this.err3=false
    },
  },
    mounted(){
    }
}
</script>

<template>
<div class="all">
<div class="card">
 <div class="row">
<button @click="goLogin" class="choose btn btn-success col-4">
            Вход
        </button>
        <button class="choosen choose  btn btn-primary col-4">
            Регистрация
        </button>
      </div>


    <form @submit="send">

      <!-- Email input -->
      <div class="form-outline ">
        <input @input="err3Change" v-model="username" type="text" id="loginName" class="form-control" placeholder="Введите username"/>
      </div>

      <!-- Password input -->
      <div class="form-outline ">
        <input @input="err2Change" v-model="pas1" type="password" id="loginPassword" class="form-control" placeholder="Введите пароль"/>
      </div>
      <div class="form-outline " :class="{error1:!(pas1==pas2&&pas1!='')}">
        <input @input="err2Change" v-model="pas2" type="password" id="loginPassword" class="form-control" placeholder="Повторите пароль"/>
        <h5 v-if="!(pas1==pas2&&pas1!='')" class="sov">Пароли не совпадают!</h5>
      </div>

      <div class="all" v-if="err2||err3">
<h2 v-if="err2">Все поля обязательны для заполнения</h2>
<h2 v-if="err3">Имя должно быть уникальным</h2>
</div>
      <!-- Submit button -->
      <div class="btnBlock">
      <button type="submit" class="btn btn-success btn-block mb-4"> Регистрация</button>
      </div>
      <!-- Register buttons -->
    </form>
    <div class="all good" v-if="isGood">
<h3>Регистрация выполнена успешно</h3>
</div>
  </div>
</div>
</template>


<style scoped>
.sov{
  margin: 10px;
  color: #000;
}
.all, .btnBlock{
  display: flex;
    justify-content: center;
}
.card-body{
    font-size: 20px;
font-weight: 300;
font-family: Verdana, Geneva, Tahoma, sans-serif;
color:#8B8BAE;
text-align: center;
}
.card{
    margin: 5px;
    border-radius: 20px;
    width: 70%;
    
}
.form-outline{
  display: flex;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
}
.card-title{
    font-size: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color:#0854A7;
    font-style: italic;

}
.btn{
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
}
.error1{
  background-color: red;
}
h2{
  color:rgb(178, 0, 0)
}
.good{
  background-color: rgb(15, 204, 24);
  border-radius: 20px;
}
</style>