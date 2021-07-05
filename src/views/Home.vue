<template>
  <div class="home">
    <div class="navbar">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
      <div class="title">
        <h1>TOTW Manager</h1>
      </div>
      <div class="icons">
        <div class="profile" @click="$router.push('/profile')" v-if="currentUser">
          <span>{{ currentUser.name }}</span>&nbsp;&nbsp;
          <i class="fas fa-user fa-lg"/>
        </div>
        <i class="fas fa-cogs fa-lg admin" @click="$router.push('/admin')" v-if="currentUser.isAdmin"/>
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
        <div class="menu" @click="openClassement()">
          Classement PL FR &nbsp;<i class="fas fa-external-link-alt"></i>
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
      return this.$store.state.auth.user
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
    openClassement () {
      window.open('https://proleague.de/league.php?league=fra1#table', '_blank')
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
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #040586;

    .logo {
      width: 33%;
      height: 100%;

      img {
        height: 100%;
      }
    }

    .title {
      width: 33%;
      display: flex;
      justify-content: center;

      h1 {
        font-size: 30px;
        color: gold;
      }
    }

    .icons {
      width: 33%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .profile {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: gold;
        cursor: pointer;
      }

      .admin {
        color: gold;
        cursor: pointer;
        margin-left: 10px;
      }

      .fa-power-off {
        color: red;
        cursor: pointer;
        margin-left: 10px;
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
        user-select: none;

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
