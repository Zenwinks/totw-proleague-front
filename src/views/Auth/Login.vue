<template>
  <login-layout>
    <div class="form">
      <form class="login" @submit.prevent="login">
        <h3>Connexion</h3>
        <div class="data">
          <input required v-model="name" type="text" placeholder="Nom"/>
          <input required v-model="password" type="password" placeholder="Mot de passe"/>
        </div>
        <button type="submit" class="login-btn">Se connecter</button>
      </form>
    </div>
  </login-layout>
</template>

<script>
import LoginLayout from "../../layouts/LoginLayout";

export default {
  name: "Login",
  components: {LoginLayout},
  data () {
    return {
      name: "",
      password: ""
    }
  },
  methods: {
    login: function () {
      let name = this.name
      let password = this.password
      this.$store.dispatch('auth/login', {name, password})
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 1.5%;
    }

    .data {
      width: 15%;
      display: flex;
      flex-direction: column;
      margin-bottom: 1%;

      input {
        margin-bottom: 5%;
        padding: 12px 15px;
        font-size: 1rem;
        border-width: 3px;
        border-style: solid;
        border-color: #040586;
        border-radius: calc(6 * 1px);
        outline: transparent;
        width: 90%;
        transition: border-color calc(0.2 * 1s) ease;
      }
    }

    .login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10%;
      height: 6%;
      margin-right: 2.5%;
      margin-left: 2.5%;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      color: #040586;
      font-size: large;
      font-weight: bold;
      box-shadow: 0 0 10px #040586;

      &:hover {
        background-color: #040586;
        color: gold;
      }
    }
  }
}
</style>
