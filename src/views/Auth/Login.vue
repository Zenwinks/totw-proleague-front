<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Connexion</h1>
      <label>Nom</label>
      <input required v-model="name" type="text" placeholder="Nom"/>
      <label>Mot de passe</label>
      <input required v-model="password" type="password" placeholder="Mot de passe"/>
      <hr/>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
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
      this.$store.dispatch('login', {name, password})
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
