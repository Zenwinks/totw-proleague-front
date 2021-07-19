<template>
  <standard-layout>
    <div class="container">
      <fieldset>
        <legend>Données personnelles</legend>
        <div class="infos">
          <div class="name"><b>Pseudo :</b>&nbsp;{{ currentUser.name }}</div>
          <div class="team"><b>Équipe :</b>&nbsp;
            <span v-if="team">{{ team }}</span>
            <span v-else><i>Donnée inexistante</i></span>
          </div>
          <div class="buttons">
            <button>Modifier mon mot de passe</button>
          </div>
        </div>
      </fieldset>
    </div>
  </standard-layout>
</template>

<script>
import StandardLayout from "../layouts/StandardLayout";
import axios from "axios";

export default {
  name: "Profile",
  components: {StandardLayout},
  data () {
    return {
      team: ""
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.state.auth.user
    }
  },
  created () {
    this.getTeam()
  },
  methods: {
    getTeam () {
      axios.get(process.env.VUE_APP_BACK + "getTeamByUserName/" + this.currentUser.name)
          .then(result => {
            if(result.data.name) {
              this.team = result.data.name
            }
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  fieldset {
    width: 20%;
    height: 20%;
    margin-top: 5%;
    border: 2px solid #040586;

    legend {
      font-size: 25px;
      font-weight: bold;
      color: #040586;
    }

    .infos {
      width: 90%;
      height: 90%;
      margin: 5%;
      font-size: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
