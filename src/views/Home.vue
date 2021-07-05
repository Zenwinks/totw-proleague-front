<template>
  <standard-layout>
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
          Classement PL FR &nbsp;<i class="fas fa-external-link-alt"/>
        </div>
      </div>
      <hr>
      <div class="content">
        <player-stats v-if="currentMenu === 'stats'"/>
        <totw-list v-else-if="currentMenu === 'list'"/>
        <add-totw v-else-if="currentMenu === 'add'" @goToStats="currentMenu = 'stats'"/>
      </div>
    </div>
  </standard-layout>
</template>

<script>

import PlayerStats from "../components/PlayerStats";
import TotwList from "../components/TotwList";
import AddTotw from "../components/AddTotw";
import StandardLayout from "../layouts/StandardLayout";

export default {
  name: 'Home',
  data () {
    return {
      currentMenu: 'stats'
    }
  },
  components: {StandardLayout, AddTotw, TotwList, PlayerStats},
  methods: {
    openClassement () {
      window.open('https://proleague.de/league.php?league=fra1#table', '_blank')
    }
  },
}
</script>

<style scoped lang="scss">
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
</style>
