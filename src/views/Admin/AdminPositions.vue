<template>
  <admin-layout>
    <div class="container">
      <div class="go-back" @click="$router.push('/admin')"><i class="fas fa-long-arrow-alt-left"/>&nbsp;Retour</div>
      <div class="add-position">
        <span>{{ positions.length }} poste(s) enregistré(s).</span>
        <button class="add-btn" @click="showAddPopup = true"><i class="fas fa-plus-circle"/>&nbsp;Ajouter un poste</button>
      </div>
      <div class="positions-table">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th @click="sort('label')">
              Label &nbsp;
              <i class="fas fa-sort-up" v-if="currentSort === 'label' && currentSortDir === 'asc'"/>
              <i class="fas fa-sort-down" v-else-if="currentSort === 'label' && currentSortDir === 'desc'"/>
              <i class="fas fa-sort" v-else/>
            </th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="position in sortedPositions" :key="position.id">
            <td class="id">{{ position.id }}</td>
            <td class="label editable" v-if="editMode === position.id"><input type="text" v-model="position.label" autofocus></td>
            <td class="label" v-else><b>{{ position.label }}</b></td>
            <td class="actions">
              <i class="fas fa-save save" v-if="editMode === position.id" @click="updatePosition(position)"/>
              <i class="fas fa-edit update" v-else @click="editMode = position.id"/>
              <i class="fas fa-trash delete" v-if="parseInt(position.nbplayers, 10) === 0" @click="deletePosition(position)"/>
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
    <add-position-popup v-if="showAddPopup" @addNewPosition="createPosition($event)" @cancel="showAddPopup = false"/>
  </admin-layout>
</template>

<script>
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import AddPositionPopup from "../../components/Popup/AddPositionPopup";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "AdminPositions",
  components: {AddPositionPopup, AdminLayout},
  data () {
    return {
      positions: [],
      currentSort: 'label',
      currentSortDir: 'asc',
      pageSize: 20,
      currentPage: 1,
      maxPage: 1,
      editMode: '0',
      showAddPopup: false
    }
  },
  created () {
    this.getPositions()
  },
  computed: {
    sortedPositions () {
      let sortedPositions = this.positions
      return sortedPositions.sort((a, b) => {
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
  watch: {
    maxPage() {
      if(this.maxPage === 0) {
        this.currentPage = 0
      }
    }
  },
  methods: {
    getPositions () {
      axios.get(process.env.VUE_APP_BACK + "positions")
          .then(response => {
            this.positions = response.data
            this.maxPage = Math.ceil(this.positions.length / this.pageSize)
          })
          .catch(() => {
            createToast("Une erreur est survenue à la récupération des postes", {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
    },
    createPosition (newPosition) {
      axios.post(process.env.VUE_APP_BACK + "positions", {label: newPosition})
          .then(response => {
            this.showAddPopup = false
            this.positions = response.data
            this.maxPage = Math.ceil(this.positions.length / this.pageSize)
            createToast("Poste ajouté avec succès", {
              type: 'success',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
          .catch(() => {
            createToast("Une erreur est survenue à l'ajout du poste", {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
    },
    updatePosition (position) {
      axios.patch(process.env.VUE_APP_BACK + "positions/" + position.id, position)
          .then(() => {
            this.editMode = "0"
            createToast("Poste mis à jour avec succès", {
              type: 'success',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
          .catch(() => {
            createToast("Une erreur est survenue à la mise à jour du poste", {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
    },
    deletePosition (position) {
      axios.delete(process.env.VUE_APP_BACK + "positions/" + position.id)
          .then(() => {
            this.positions.splice(this.positions.indexOf(position), 1)
            createToast("Poste supprimé avec succès", {
              type: 'success',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
          .catch(() => {
            createToast("Une erreur est survenue à la suppression du poste", {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
    },
    sort (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    nextPage () {
      if ((this.currentPage * this.pageSize) < this.positions.length) this.currentPage++;
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
    text-align: center;
  }

  .add-position {
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

  .positions-table {
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

        .label {
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
