<script>
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('ru');
dayjs.extend(relativeTime)

export default {
    data(){
        return{
            users:[],
        }
    },
    methods: {
    async loadUsers() {
        let response = await axios.get('/rating/all');
        this.users = response.data
    },
    timeFromNow(created){
      let time = dayjs(created).fromNow();
      return{
        time
      }
    }
    },
    mounted(){
      this.loadUsers();
      setInterval(()=> {this.loadUsers();},60000);
    }
}
</script>

<template>
    <div class="card">
  <div class="card-body row">
    <img class="col-2" src="../assets/smile.png" alt="">
    <p class="card-title col-3"> <strong>Имя игрока:</strong></p>
    <p class="card-text col-2">Максимальная серия:</p>
    <p class="card-text col-2"> Всего правильных ответов:</p>
    <p class="card-text col-3"> Зарегистрирован(а):</p>
  </div>
  
</div>
<div class="card" v-for="(item ) in users">
  <div class="card-body row">
    <img class="col-2" :src="item.image" alt="">
    <p class="card-title col-3"> <strong>{{ item.username }}</strong></p>
    <p class="card-text col-2">{{item.maxSeries}}</p>
    <p class="card-text col-2">{{item.allTrue }}</p>
    <p class="card-text col-3">{{timeFromNow(item.createdAt).time}}</p>
  </div>
</div>
<a class="white" href="https://ru.freepik.com/free-vector/cartoon-bright-emoticons-collection-with-hand-gestures-and-different-emotions-feelings-and-expressions-isolated_10347244.htm#query=%D0%BC%D0%B8%D0%BB%D1%8B%D0%B9%20%D1%81%D0%BC%D0%B0%D0%B9%D0%BB%D0%B8%D0%BA&position=2&from_view=keyword&track=ais">Изображение от macrovector на Freepik</a> 
</template>


<style scoped>
img{
  border-radius: 38%;
  height: 100px;
  width:auto
}
.white{
  color:#ffffff;
}
.card-body{
    font-size: 20px;
font-weight: bolder;
font-family: Verdana, Geneva, Tahoma, sans-serif;
color:#8B8BAE;
text-align: center;
}
.card{
    margin: 5px;
    border-radius: 50px;
}
.card-title{
    font-size: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color:#0854A7;
    font-style: italic;

}
</style>