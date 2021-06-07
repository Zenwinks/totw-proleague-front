<template>
  <div class="home">
    <div class="navbar">
      <img alt="Vue logo" src="../assets/logo.png">
      <h1>TOTW Manager</h1>
      <div class="icons">
        <div class="profile" @click="profile">
          <span v-if="currentUser">{{ currentUser.name }}</span>&nbsp;&nbsp;
          <i class="fas fa-user fa-lg"/>
        </div>
        <i class="fas fa-power-off fa-lg" @click="logout"/>
      </div>
    </div>
    <div class="container">
      <div class="menus">
        <div :class="[currentMenu === 'stats' ? 'active' : '', 'menu']" @click="currentMenu = 'stats'">
          Stats joueurs
        </div>
        <div :class="[currentMenu === 'list' ? 'active' : '', 'menu']" @click="currentMenu = 'list'">
          Liste des TOTW
        </div>
        <div :class="[currentMenu === 'add' ? 'active' : '', 'menu']" @click="currentMenu = 'add'">
          Ajouter une nouvelle TOTW
        </div>
      </div>
      <hr>
      <div class="content">
        <player-stats v-if="currentMenu === 'stats'"/>
        <totw-list v-else-if="currentMenu === 'list'"/>
        <add-totw v-else-if="currentMenu === 'add'" @goToStats="currentMenu = 'stats'"/>
      </div>
    </div>
  </div>
</template>

<script>

import PlayerStats from "../components/PlayerStats";
import TotwList from "../components/TotwList";
import AddTotw from "../components/AddTotw";

export default {
  name: 'Home',
  data () {
    return {
      currentMenu: 'stats'
    }
  },
  components: {AddTotw, TotwList, PlayerStats},
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    }
  },
  created () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  },
  methods: {
    logout: function () {
      this.$logout()
    },
    profile () {
      this.$router.push('/profile')
    }
  },
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .navbar {
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #040586;

    img {
      height: 100%;
    }

    h1 {
      font-size: 30px;
      color: gold;
    }

    .icons {
      width: 8%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .profile {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: gold;
        cursor: pointer;
      }

      .fa-power-off {
        color: red;
        cursor: pointer;
      }
    }
  }

  .container {
    width: 100%;
    height: 90%;

    .menus {
      width: 100%;
      height: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1%;

      .menu {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        height: 60%;
        margin-right: 2.5%;
        margin-left: 2.5%;
        border-radius: 10px;
        cursor: pointer;
        color: #040586;
        font-size: x-large;
        font-weight: bold;
        box-shadow: 0 0 10px #040586;

        &:hover {
          background-color: #040586;
          color: gold;
        }
      }

      .active {
        background-color: #040586;
        color: gold;
      }
    }

    hr {
      width: 40%;
      border: 1px solid #040586;
    }

    .content {
      width: 100%;
      height: 77%;
      margin-top: 2%;
    }
  }
}
</style>
