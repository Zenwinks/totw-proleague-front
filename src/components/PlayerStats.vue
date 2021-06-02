<template>
  <div class="wrapper" v-if="players.length > 0">
    <table>
      <thead>
      <tr>
        <th @click="sort('name')">
          Nom du joueur &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'name' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'name' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th>
          Postes
          <!--          <i class="fas fa-sort-up" v-if="currentSort === 'position' && currentSortDir === 'asc'"/>-->
          <!--          <i class="fas fa-sort-down" v-else-if="currentSort === 'position' && currentSortDir === 'desc'"/>-->
          <!--          <i class="fas fa-sort" v-else/>-->
        </th>
        <th @click="sort('team')">
          Équipe &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'team' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'team' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('country')">
          Nationalité &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'country' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'country' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('nb_titu')">
          Apparitions dans le XI &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'nb_titu' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'nb_titu' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('nb_sub')">
          Apparitions en MH &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'nb_sub' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'nb_sub' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('nb_total')">
          Apparitions totales &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'nb_total' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'nb_total' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="player in sortedPlayers" :key="player.id">
        <td class="name">{{ player.name }}</td>
        <td class="position">{{ player.positions }}</td>
        <td class="team">{{ player.team }}</td>
        <td class="country">{{ player.country }}</td>
        <td class="titu">{{ player.nb_titu }}</td>
        <td class="sub">{{ player.nb_sub }}</td>
        <td class="total">{{ player.nb_total }}</td>
      </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button class="previous" @click="prevPage"><i class="fas fa-step-backward"/>&nbsp;Précédent</button>
      <div class="page">{{ currentPage }}/{{ maxPage }}</div>
      <button class="next" @click="nextPage">Suivant &nbsp;<i class="fas fa-step-forward"></i></button>
    </div>
  </div>
  <div class="wrapper" v-else>
    <div class="no-player">Aucun joueur à afficher</div>
  </div>
</template>

<script>
import axios from "axios";
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "PlayerStats",
  data () {
    return {
      players: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 11,
      currentPage: 1,
      maxPage: 1
    }
  },
  computed: {
    sortedPlayers () {
      let sortedPlayers = this.players
      return sortedPlayers.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    }
  },
  mounted () {
    this.updatePlayersData()
  },
  methods: {
    updatePlayersData () {
      axios.get('http://localhost:3000/players')
          .then(response => {
            this.players = response.data
            this.maxPage = Math.ceil(this.players.length / this.pageSize)
          })
          .catch(error => {
            createToast('Un erreur est survenue à la récupération des joueurs', {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
            console.log(error)
          })
    },
    sort (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    nextPage () {
      if ((this.currentPage * this.pageSize) < this.players.length) this.currentPage++;
    },
    prevPage () {
      if (this.currentPage > 1) this.currentPage--;
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  table {
    width: 70%;
    height: 80%;
    border-collapse: collapse;
    text-align: center;

    tr {

      th {
        border: 1px solid #040586;
        background-color: #040586;
        color: gold;
        cursor: pointer;
        height: 50px;
      }

      td {
        border: 1px solid #040586;
        color: #040586;
      }

      .name, .total {
        font-weight: bold;
      }
    }
  }

  .pagination {
    width: 20%;
    height: 8%;
    margin-top: 1.5%;
    display: flex;
    justify-content: center;

    .page {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #040586;
      font-size: large;
      font-weight: bold;
      color: gold;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40%;
      height: 100%;
      border-radius: 10px 0 0 10px;
      cursor: pointer;
      color: #040586;
      font-size: large;
      font-weight: bold;
      //box-shadow: 0 0 10px #040586;
      border: 1px solid #040586;

      &:last-child {
        border-radius: 0 10px 10px 0;
      }

      &:hover {
        background-color: #040586;
        color: gold;
      }
    }
  }

  .no-player {
    font-size: 25px;
    font-weight: bold;
    color: #040586;
  }
}
</style>
