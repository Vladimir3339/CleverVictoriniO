<script>
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('ru');
dayjs.extend(relativeTime)

export default {
  data() {
    return {
      isStart: true,
      isRecord: false,
      isWrong: false,
      isRight: false,
      nowSeries : 0,
      question: {
        question: 'Ожидайте ',
        group: 'math',
        level: 1,
        trueValue: 0,
        answer: []
      },
      valueQuestion: Number,
      valueGroup: '',
      valueLevel: 0,
      groups: [{ title: 'любое', value: '' },
      { title: 'Математика', value: 'math' }],
      levels: [{ title: 'любая', value: 0 },
      { title: 'легко', value: 1 },]
    }
  },
  methods: {
    async loadGroups() {
      let response = await axios.get('/play/groups/all');
      this.groups = response.data
    },
    async loadLevels() {
      let response = await axios.get('/play/levels/all');
      this.levels = response.data
    },
    async loadQuestion() {
      let response = await axios.post('/play/question', {
          _id:this.getUser._id,
          group:this.valueGroup,
          level:this.valueLevel
        });
      this.question = response.data;
      this.nowSeries = '';
    },
    start(){
      this.isStart = false;
      this.loadQuestion();
    },
    checkQuestion1(){
      this.checkQuestion();
    },
    loadQuestion1(){
      this.loadQuestion();
      this.isStart = false;
          this.isRecord = false;
          this.isWrong = false;
          this.isRight = false;
          this.valueQuestion ='';
    },
    async checkQuestion(){
      if (this.valueQuestion >=0){
        let trueAnswer = false;
        if (this.valueQuestion == this.question.trueValue){
          trueAnswer = true;
          this.isStart = false;
          this.isRecord = false;
          this.isWrong = false;
          this.isRight = true;
        } else {
          this.isStart= false;
          this.isRecord= false;
          this.isWrong= true;
          this.isRight= false;
        }
        if (this.getUser._id){
          console.log(this.question._id)
          let response = await axios.post('/play/result', {
          _id:this.getUser._id,
          result:trueAnswer,
          idQuestion:this.question._id
        });
        console.log(response.data)
          this.nowSeries = response.data.thisSeries;
          this.$store.commit('updateUser', response.data.user);
          if (response.data.isRecord)
          {this.isRecord = true}
        }
        
      }
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  },
  mounted() {
    this.loadGroups(),
    this.loadLevels()
  }
}
</script>

<template>
  <div class="allSelect">
    <div v-for="(item, index) in groups">
      <input v-model="valueGroup" type="radio" class="btn-check" :id="'groupbtnradio' + index" :value="item.value"
        autocomplete="off">
      <label class="btn btn-outline-primary" :for="'groupbtnradio' + index">{{ item.title }}</label>
    </div>
  </div>
  <div class="allSelect">
    <div v-for="(item, index) in levels">
      <input v-model="valueLevel" type="radio" class="btn-check" :id="'levelbtnradio' + index" :value="item.value"
        autocomplete="off">
      <label class="btn btn-outline-primary" :for="'levelbtnradio' + index">{{ item.title }}</label>
    </div>
  </div>

  <div class="card all" v-if="!isStart && !isRecord && !isWrong && !isRight">
    <div class="card-title ">
      Вопрос:
    </div>
    <div class="card-title_3 ">
      {{ question.question }}
    </div>
    <div class="card-body row">
      <div class="card-title_2 ">
        Варианты ответов: </div>
      <div class="card-text" v-for="(item, index) in question.answer">
        <input v-model="valueQuestion" type="radio" class="btn-check" :id="'btnradio' + index" :value="index"
          autocomplete="off">
        <label class="btn btn-outline-success" :for="'btnradio' + index">{{ item }}</label>
      </div>
      <div class="all">
        <button type="button" class="btn btn-success" @click="checkQuestion1">Ответить</button>
      </div>
    </div>
  </div>
  <div class="card all" v-if="isStart">
    <div class="card-title ">
      Выберете настройки вопросов: тему и сложность
    </div>
      <div class="all">
        <button @click="start" type="button" class=" start btn btn-primary">Начать игру</button>
      </div>
  </div>
  <div class="card all" v-if="isRight">
    <div class="card-title ">
      Вы правильно ответили на вопрос :)
    </div>
      <div class="all">
        <button @click="loadQuestion1" type="button" class=" start btn btn-primary">Следующий вопрос</button>
      </div>
  </div>
  <div class="card all" v-if="isWrong">
    <div class="card-title ">
      Вы ошиблись, желаем вам удачи в следующий раз
    </div>
    <div class="all" >
    <div class="card-title " v-if="getUser._id">
      Вы ответили правильно на {{ nowSeries }} вопросов подряд
    </div>  
    <div class="card-title " v-if="! getUser._id">
      Если хотите узнавать свой результат, зарегистрируйтесь. Ну пожалуйста &#129402;
    </div>  
  </div>
  <div class="all " v-if="isRecord && getUser._id">
    <div class="card-title_2  ">
      Команда разработчиков поздраляет вас с вашим новым рекордом: {{ getUser.maxSeries }}
    </div>
  </div>
      <div class="all">
        <button @click="loadQuestion1" type="button" class=" start btn btn-primary">Начать заново</button>
      </div>
  </div>
</template>


<style scoped>
.start{
  margin:20px;
  font-size: 30px;
  border-radius: 30px;
}
label,
input {
  margin: 5px;
  font-weight: 500;
  border-radius: 20px;
}

.btn-success {
  margin: 10px auto;
  font-weight: bold;

}

.card-title {
  margin: 10px auto;
  font-weight: bold;
}
.card-title-2{
  margin: 10px auto;
  font-weight: bold;
}

.card-title_3 {
  margin: 10px auto;
  font-weight: 500;
  font-size: 30px;
  color: #1A99A1;
}

.card-title_2 {
  margin: 10px auto;
  font-weight: 800;
  font-size: 25px;
  color: #0854A7;
  font-style: italic;
}

.all {
  display: flex;
  justify-content: center;
}

.allSelect {
  display: flex;
  justify-content: flex-start;
}

.card-body {
  font-size: 20px;
  font-weight: bolder;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #8B8BAE;
  text-align: center;
}

.card {
  margin: 5px;
  border-radius: 50px;
}

.card-title {
  font-size: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #0854A7;
  font-style: italic;

}</style>