<template>
  <admin-layout>
    <div class="container">
      <div class="go-back" @click="$router.push('/admin')"><i class="fas fa-long-arrow-alt-left"/>&nbsp;Quitter l'administration</div>
      <div class="add-country">
        <span>{{ countries.length }} nationalité(s) enregistrée(s).</span>
        <button class="add-btn" @click="showAddPopup = true"><i class="fas fa-plus-circle"/>&nbsp;Ajouter une nationalité</button>
      </div>
      <div class="countries-table">
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
          <tr v-for="country in sortedCountries" :key="country.id">
            <td class="id">{{ country.id }}</td>
            <td class="name editable" v-if="editMode === country.id"><input type="text" v-model="country.name" autofocus></td>
            <td class="name" v-else><b>{{ country.name }}</b></td>
            <td class="actions">
              <i class="fas fa-save save" v-if="editMode === country.id" @click="updateCountry(country)"/>
              <i class="fas fa-edit update" v-else @click="editMode = country.id"/>
              <i class="fas fa-trash delete" v-if="parseInt(country.nbplayers, 10) === 0" @click="deleteCountry(country)"/>
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
    <add-country-popup v-if="showAddPopup" @addNewCountry="createCountry($event)" @cancel="showAddPopup = false"/>
  </admin-layout>
</template>

<script>
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import AddCountryPopup from "../../components/Popup/AddCountryPopup";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "AdminCountries",
  components: {AddCountryPopup, AdminLayout},
  data () {
    return {
      countries: [],
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
    this.getCountries()
  },
  computed: {
    sortedCountries () {
      let sortedCountries = this.countries
      return sortedCountries.sort((a, b) => {
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
    getCountries () {
      axios.get(process.env.VUE_APP_BACK + "countries")
          .then(response => {
            this.countries = response.data
            this.maxPage = Math.ceil(this.countries.length / this.pageSize)
          })
          .catch(() => {
            createToast('Une erreur est survenue à la récupération des pays', {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
    },
    createCountry (newCountry) {
      axios.post(process.env.VUE_APP_BACK + "countries", {name: newCountry})
          .then(response => {
            this.showAddPopup = false
            this.countries = response.data
            this.maxPage = Math.ceil(this.countries.length / this.pageSize)
            createToast("Nationalité ajoutée avec succès", {
              type: 'success',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
          .catch(() => {
            createToast('Une erreur est survenue à l\'ajout d\'une nationalité', {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
    },
    updateCountry (country) {
      axios.patch(process.env.VUE_APP_BACK + "countries/" + country.id, country)
          .then(() => {
            this.editMode = "0"
            createToast("Nationalité mise à jour avec succès", {
              type: 'success',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
          .catch(() => {
            createToast('Une erreur est survenue à la mise à jour d\'une nationalité', {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
    },
    deleteCountry (country) {
      axios.delete(process.env.VUE_APP_BACK + "countries/" + country.id)
          .then(() => {
            this.countries.splice(this.countries.indexOf(country), 1)
            createToast("Nationalité supprimée avec succès", {
              type: 'success',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
          })
          .catch(() => {
            createToast("Une erreur est survenue à la suppression d'une nationalité", {
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
      if ((this.currentPage * this.pageSize) < this.countries.length) this.currentPage++;
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

  .add-country {
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

  .countries-table {
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
