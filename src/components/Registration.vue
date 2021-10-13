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
               :class="{ error_validate: errorValidationEmail }"
               placeholder="Введите почту"
        >
        <div v-if="this.errorValidationEmail === true"
             class="message-error"
        >
          Пожалуйста, введите корректный адрес почты! <br>
          Пример: ivanovIvan123@mail.ru
        </div>
        <label class="label-form"
               for="password"
        >
          Введите пароль
        </label>
        <input v-model="user.password"
               class="input"
               id="password"
               type="password"
               :class="{ error_validate: errorValidationPassword }"
               placeholder="Введите пароль"
        >
        <div v-if="this.errorValidationPassword === true"
        class="message-error">
          Пароль не должен начинаться с цифры и содержать спец.символов, <br>
          может состоять из букв и цифр
        </div>

        <label class="label-form"
               for="confirmPassword"
        >
          Подтвердить пароль
        </label>
        <input class="input"
               id="confirmPassword"
               v-model="confirmPassword"
               type="password"
               placeholder="Подтвердите пароль"
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
      errorValidationEmail: false,
      errorValidationPassword: false,
    };
  },
  methods: {
    async getUser() {
      if (this.user.password === this.confirmPassword
      && this.validateEmail(this.user.email)
      && this.validationPassword(this.user.password)) {
        try {
          await axios.post('/registration', {
            email: this.user.email,
            password: this.user.password,
          });

          this.errorValidationEmail = false;
        } catch (e) {
          console.log(e);
        }
      }
    },
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      if (re.test(email) === false) {
        this.errorValidationEmail = true;
      }
      return re.test(email);
    },
    validationPassword(password) {
      const startWithoutNumber = /^\D.*$/;
      const withoutSpecialChars = /^[^-() /]*$/;
      const containsLetters = /^.*[a-zA-Z]+.*$/;

      if (startWithoutNumber.test(password)
          && withoutSpecialChars.test(password)
          && containsLetters.test(password)) {
        this.errorValidationPassword = false;
        return true;
      }
      this.errorValidationPassword = true;

      return false;
    },
  },
};
</script>

<style scoped>
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
  color: #C22929;

}

.error_validate {
  border: solid 1px #C22929;
}

.message-error {
  background-color: #ffffff;
  color: #C22929;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 5px;
  border: solid 1px #C22929;
}
</style>
