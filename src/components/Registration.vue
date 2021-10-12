<template>
  <div>
    <form class="registration"
          @submit.prevent
    >
      <fieldset class="fieldset-form">
        <legend class="caption">
          Авторизация
        </legend>
        <label class="label-form"
               for="email"
        >
          Введите email
        </label>
        <input v-model="user.email"
              class="input" id="email"
              type="text"
        >
        <label class="label-form"
              for="password"
        >
          Введите пароль
        </label>
        <input v-model="user.password"
              class="input" id="password"
              type="password"
        >
        <label class="label-form"
              for="confirmPassword"
        >
          Подтвердить пароль
        </label>
        <input class="input"
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
        >
      </fieldset>
        <span class="non-password"
              v-if="this.user.password !== this.confirmPassword"
        >
           Пароли не совпадают!
        </span>
        <button @click="getUser"
                class="btn"
        >
          Войти
        </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      confirmPassword: '',
    };
  },
  methods: {
    async getUser() {
      if (this.user.password === this.confirmPassword) {
        try {
          await axios.post('/registration', {
            email: this.user.email,
            password: this.user.password,
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>

<style scope>
.registration {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px auto;
  background-color: #7d7a7a;
  border-radius: 10px;
  width: 50%;
}

.fieldset-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  text-align: center;
}

.caption {
  padding: 15px 0;
  font-size: 32px;
  font-weight: 700;
  border-radius: 10px;
  color: #121111;
}

.label-form {
  font-weight: 500;
  font-size: 26px;
  margin: 25px 0;
}

.input {
  width: 100%;
  height: 25px;
  background-color: #decece;
  outline: none;
  border-color: #decece;
  font-size: 16px;
  border-radius: 10px;
}

.btn {
  width: 20%;
  background-color: #000000;
  color: #decece;
  border-radius: 10px;
  padding: 10px;
  margin: 15px;
  font-size: 22px;
}

.non-password {
  font-size: 18px;
  font-weight: 700;
  margin: 15px;
}
</style>
