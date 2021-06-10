<template>
  <div class="wrapper" v-if="players.length > 0">
    <table>
      <thead>
      <tr>
        <th colspan="4" class="no-border-top no-border-left">Infos joueurs</th>
        <th colspan="3" class="no-border-top">Titulaire</th>
        <th colspan="2" class="no-border-top">Sub</th>
        <th colspan="1" class="no-border-top">Total</th>
        <th colspan="2" class="no-border-top no-border-right th-tots">TOTS</th>
      </tr>
      <tr>
        <th @click="sort('name')" class="no-border-left no-border-bottom">
          Nom &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'name' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'name' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th class="no-border-bottom">
          Postes
          <!--          <i class="fas fa-sort-up" v-if="currentSort === 'position' && currentSortDir === 'asc'"/>-->
          <!--          <i class="fas fa-sort-down" v-else-if="currentSort === 'position' && currentSortDir === 'desc'"/>-->
          <!--          <i class="fas fa-sort" v-else/>-->
        </th>
        <th @click="sort('team')" class="no-border-bottom">
          Équipe &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'team' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'team' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('country')" class="no-border-bottom">
          Nationalité &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'country' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'country' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('nb_titu')" class="no-border-bottom">
          Apparitions &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'nb_titu' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'nb_titu' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('nb_potw')" class="no-border-bottom">
          POTW &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'nb_potw' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'nb_potw' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('noteTitu')" class="no-border-bottom">
          Prochaine note &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'noteTitu' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'noteTitu' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('nb_sub')" class="no-border-bottom">
          Apparitions &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'nb_sub' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'nb_sub' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('noteSub')" class="no-border-bottom">
          Prochaine note &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'noteSub' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'noteSub' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('nb_total')" class="no-border-bottom">
          Apparitions &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'nb_total' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'nb_total' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('noteTotsTitu')" class="no-border-bottom th-tots">
          Note titulaire &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'noteTotsTitu' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'noteTotsTitu' && currentSortDir === 'desc'"/>
          <i class="fas fa-sort" v-else/>
        </th>
        <th @click="sort('noteTotsSub')" class="no-border-bottom no-border-right th-tots">
          Note MH &nbsp;
          <i class="fas fa-sort-up" v-if="currentSort === 'noteTotsSub' && currentSortDir === 'asc'"/>
          <i class="fas fa-sort-down" v-else-if="currentSort === 'noteTotsSub' && currentSortDir === 'desc'"/>
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
        <td class="potw">{{ player.nb_potw }}</td>
        <td class="note-titu">{{ player.noteTitu }}</td>
        <td class="sub">{{ player.nb_sub }}</td>
        <td class="note-sub">{{ player.noteSub }}</td>
        <td class="total">{{ player.nb_total }}</td>
        <td class="note-tots-titu td-tots">{{ player.noteTotsTitu }}</td>
        <td class="note-tots-sub td-tots">{{ player.noteTotsSub }}</td>
      </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button class="fast-previous" @click="fastPrevPage"><i class="fas fa-fast-backward"/></button>
      <button class="previous" @click="prevPage"><i class="fas fa-step-backward"/>&nbsp;Précédent</button>
      <div class="page">{{ currentPage }}/{{ maxPage }}</div>
      <button class="next" @click="nextPage">Suivant &nbsp;<i class="fas fa-step-forward"></i></button>
      <button class="fast-next" @click="fastNextPage"><i class="fas fa-fast-forward"/></button>
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
      pageSize: 18,
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
        if (typeof a[this.currentSort] !== 'string') {
          if (a[this.currentSort] < b[this.currentSort]) {
            return -1 * modifier
          }
          if (a[this.currentSort] > b[this.currentSort]) {
            return modifier
          }
        } else {
          if (a[this.currentSort].toUpperCase() < b[this.currentSort].toUpperCase()) {
            return -1 * modifier
          }
          if (a[this.currentSort].toUpperCase() > b[this.currentSort].toUpperCase()) {
            return modifier
          }
        }
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
      axios.get('http://localhost:3000/playersWithPositions')
          .then(response => {
            response.data.forEach(elem => {
              elem.noteTitu = this.calcNextNote(true, elem.nb_titu, elem.nb_sub, elem.nb_potw)
              elem.noteSub = this.calcNextNote(false, elem.nb_titu, elem.nb_sub, elem.nb_potw)
              elem.noteTotsTitu = this.calcTotsNote(true, elem.nb_titu, elem.nb_sub, elem.nb_potw)
              elem.noteTotsSub = this.calcTotsNote(false, elem.nb_titu, elem.nb_sub, elem.nb_potw)
              this.players.push(elem)
            })
            this.maxPage = Math.ceil(this.players.length / this.pageSize)
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.$logout()
            } else {
              createToast('Un erreur est survenue à la récupération des joueurs', {
                type: 'danger',
                timeout: 3000,
                position: 'bottom-left',
                showIcon: true
              })
            }
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
    },
    fastNextPage () {
      this.currentPage = this.maxPage
    },
    fastPrevPage () {
      this.currentPage = 1
    },
    calcNextNote (isTitu, nbApparitionsTitu, nbApparitionsSub, nbApparitionsPotw) {
      if (isTitu) {
        return 90 + parseInt(nbApparitionsTitu) + parseInt(nbApparitionsPotw)
      } else {
        return Math.floor(85 + (parseInt(nbApparitionsTitu) + parseInt(nbApparitionsPotw)) + (parseInt(nbApparitionsSub) / 2))
      }
    },
    calcTotsNote (isTitu, nbApparitionsTitu, nbApparitionsSub, nbApparitionsPotw) {
      if (isTitu) {
        return Math.floor(89 + parseInt(nbApparitionsTitu) + parseInt(nbApparitionsPotw) + (parseInt(nbApparitionsSub) / 2) + 2)
      } else {
        return Math.floor(84.5 + parseInt(nbApparitionsTitu) + parseInt(nbApparitionsPotw) + (parseInt(nbApparitionsSub) / 2) + 2)
      }
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
    width: 98%;
    height: 85%;
    border-collapse: collapse;
    text-align: center;

    tr {
      color: #040586;

      th {
        border: 1px solid gold;
        background-color: #040586;
        color: gold;
        cursor: pointer;
        height: 40px;
        user-select: none;
      }

      .th-tots {
        background-color: gold;
        color: #040586;
        border-color: #040586;
      }

      .no-border-top {
        border-top: 1px solid #040586;
      }

      .no-border-right {
        border-right: 1px solid #040586;
      }

      .no-border-bottom {
        border-bottom: 1px solid #040586;
      }

      .no-border-left {
        border-left: 1px solid #040586;
      }

      td {
        border: 1px solid #040586;
      }

      .name, .total {
        font-weight: bold;
      }

      .potw {
        font-weight: bold;
        color: red;
      }

      .td-tots {
        background-color: #040586;
        color: gold;
        border-color: gold;
      }

      .note-tots-sub {
        border-right: 1px solid #040586;
      }

      .note-tots-titu {
        border-left: 1px solid #040586;
      }

      &:hover {
        background-color: #040586;
        color: gold;
      }
    }
  }

  .pagination {
    width: 25%;
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

    .previous, .next, .fast-previous, .fast-next {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;
      color: #040586;
      font-size: large;
      font-weight: bold;
      border: 1px solid #040586;

      &:hover {
        background-color: #040586;
        color: gold;
      }
    }

    .previous, .next {
      width: 30%;
    }

    .fast-previous, .fast-next {
      width: 10%;

      &:first-child {
        border-radius: 5px 0 0 5px;
        border-right: none;
      }

      &:last-child {
        border-radius: 0 5px 5px 0;
        border-left: none;
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
