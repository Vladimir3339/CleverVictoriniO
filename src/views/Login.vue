<script>
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

export default {
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  },
  data() {
    return {
      user: {},
      username: '',
      password: '',
      err1: false,
      isGood: false
    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        name: 'login'
      })
    },
    goRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    oRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    async send(evt) {
      evt.preventDefault();
      if (this.password != '' && this.username != '') {
        let response = await axios.post('/login/find', {
          username: this.username,
          password: this.password
        });
        this.password = '';
        this.username = ''
        this.user = response.data
        if (this.user == 'err1') {
          this.err1 = true;
          this.user = {};
        }
        if (this.user._id) {
          this.isGood = true;
          this.err1 = false;
          this.$store.commit('updateUser', this.user);
        }
      }
    },
  },
  mounted() {
  }
}
</script>

<template>
  <!-- Pills navs -->
  <div class="all">
    <div class="card">
      <div class="row">
        <button class="choosen choose btn btn-primary col-4">
          Вход
        </button>
        <button @click="goRegister" class="choose btn btn-success col-4">
          Регистрация
        </button>
      </div>


      <form @submit="send">

        <!-- Email input -->
        <div class="form-outline ">
          <input v-model="username" type="text" id="loginName" class="form-control" placeholder="Введите username" />
        </div>

        <!-- Password input -->
        <div class="form-outline ">
          <input v-model="password" type="password" id="loginPassword" class="form-control"
            placeholder="Введите пароль" />
        </div>

        <div class="all" v-if="err1">
          <h2>Логин или пароль введены неверно</h2>
        </div>

        <!-- Submit button -->
        <div class="btnBlock">
          <button type="submit" class="btn btn-success btn-block mb-4">Вход</button>
        </div>
        <!-- Register buttons -->
      </form>
      <div class="all good" v-if="isGood">
        <h3>Вход выполнен успешно</h3>
      </div>
    </div>
  </div>
</template>


<style scoped>
h2 {
  color: rgb(178, 0, 0)
}

.all,
.btnBlock {
  display: flex;
  justify-content: center;
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
  border-radius: 20px;
  width: 70%;

}

.form-outline {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.card-title {
  font-size: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #0854A7;
  font-style: italic;

}

.btn {


  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  margin: 10px;
}

.row {
  justify-content: space-around;
}

.choosen {
  background-color: #0854A7;

}

.good {
  background-color: rgb(15, 204, 24);
  border-radius: 20px;
}</style>