<template>
  <div>
    <h4>Enregistrement</h4>
    <form @submit.prevent="register">
      <label for="name">Nom</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus>
      </div>
      <label for="password">Mot de passe</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>
      <label for="password-confirm">Confirmation</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <label>Est administrateur</label>
      <div>
        <input id="is-admin-true" type="radio" v-model="isAdmin" :value="true"> <label for="is-admin-true">Oui</label>
        <input id="is-admin-false" type="radio" v-model="isAdmin" :value="false"> <label for="is-admin-false">Non</label>
      </div>
      <div>
        <button type="submit">S'enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data () {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      isAdmin: false
    }
  },
  methods: {
    register: function () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        isAdmin: this.isAdmin
      }
      this.$store.dispatch('register', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
