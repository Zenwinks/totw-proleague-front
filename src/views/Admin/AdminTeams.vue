<template>
  <admin-layout>
    <div class="container">
      <div class="go-back" @click="$router.push('/admin')"><i class="fas fa-long-arrow-alt-left"/>&nbsp;Quitter l'administration</div>
      <div class="add-team">
        <span>{{ teams.length }} équipe(s) enregistrée(s).</span>
        <button class="add-btn" @click="showAddPopup = true"><i class="fas fa-plus-circle"/>&nbsp;Ajouter une équipe</button>
      </div>
      <div class="teams-table">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th @click="sort('name')">
              Nom &nbsp;
              <i class="fas fa-sort-up" v-if="currentSort === 'name' && currentSortDir === 'asc'"/>
              <i class="fas fa-sort-down" v-else-if="currentSort === 'name' && currentSortDir === 'desc'"/>
              <i class="fas fa-sort" v-else/>
            </th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="team in sortedTeams" :key="team.id">
            <td class="id">{{ team.id }}</td>
            <td class="name editable" v-if="editMode === team.id"><input type="text" v-model="team.name" autofocus></td>
            <td class="name" v-else><b>{{ team.name }}</b></td>
            <td class="actions">
              <i class="fas fa-save save" v-if="editMode === team.id" @click="updateTeam(team)"/>
              <i class="fas fa-edit update" v-else @click="editMode = team.id"/>
              <i class="fas fa-trash delete" v-if="parseInt(team.nbplayers, 10) === 0" @click="deleteTeam(team)"/>
            </td>
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
    </div>
    <add-team-popup v-if="showAddPopup" @addNewTeam="createTeam($event)" @cancel="showAddPopup = false"/>
  </admin-layout>
</template>

<script>
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import AddTeamPopup from "../../components/Popup/AddTeamPopup";

export default {
  name: "AdminTeams",
  components: {AddTeamPopup, AdminLayout},
  data () {
    return {
      teams: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 20,
      currentPage: 1,
      maxPage: 1,
      editMode: '0',
      showAddPopup: false
    }
  },
  created () {
    this.getTeams()
  },
  computed: {
    sortedTeams () {
      let sortedTeams = this.teams
      return sortedTeams.sort((a, b) => {
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
  methods: {
    getTeams () {
      axios.get(process.env.VUE_APP_BACK + "teams")
          .then(response => {
            this.teams = response.data
            this.maxPage = Math.ceil(this.teams.length / this.pageSize)
          })
          .catch(error => {
            console.log(error)
          })
    },
    createTeam (newTeam) {
      axios.post(process.env.VUE_APP_BACK + "teams", {name: newTeam})
          .then(response => {
            this.showAddPopup = false
            this.teams = response.data
            this.maxPage = Math.ceil(this.teams.length / this.pageSize)
          })
          .catch(error => {
            console.log(error)
          })
    },
    updateTeam (team) {
      axios.patch(process.env.VUE_APP_BACK + "teams/" + team.id, team)
          .then(() => {
            this.editMode = "0"
            console.log("Équipe mise à jour.")
          })
          .catch(error => {
            console.log(error)
          })
    },
    deleteTeam (team) {
      axios.delete(process.env.VUE_APP_BACK + "teams/" + team.id)
          .then(() => {
            this.teams.splice(this.teams.indexOf(team), 1)
          })
          .catch(error => {
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
      if ((this.currentPage * this.pageSize) < this.teams.length) this.currentPage++;
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
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .go-back {
    cursor: pointer;
    height: 5%;
    width: 10%;
    margin: 0.5% 0 0 0.5%;
    background-color: lightgrey;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 10px;
  }

  .add-team {
    width: 55%;
    height: 8%;
    margin: auto;
    margin-top: 2%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    span {
      font-weight: bold;
    }

    button {
      width: 25%;
      height: 100%;
      cursor: pointer;
      color: white;
      font-size: large;
      font-weight: bold;
      border: none;
      background-color: limegreen;
      border-radius: 10px;
    }
  }

  .teams-table {
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5% auto 0 auto;

    table {
      width: 55%;
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

        td {
          border: 1px solid #040586;
        }

        .id {
          width: 35%;
        }

        .name {
          width: 50%;
        }

        .editable {
          background-color: #040586;
          color: gold;

          input {
            width: 90%;
            text-align: center;
            font-size: 16px;
            background-color: #040586;
            border: none;
            color: gold;
            font-weight: bold;
            outline: none;
          }
        }

        .actions {
          width: 15%;

          .save, .update, .delete {
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
          }

          .save {
            color: limegreen;
          }

          .update {
            color: dodgerblue;
          }

          .delete {
            color: red;
            margin-left: 20px;
          }
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
  }
}
</style>
