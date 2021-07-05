<template>
  <div class="wrapper">
    <!--    POPUP DE SÉLECTION DE JOUEUR-->
    <div class="popup" v-if="pickPlayer">
      <div class="header">Sélectionner un joueur</div>
      <i class="fas fa-times close" @click="$emit('close')"/>
      <div class="body">
        <div class="select-player">
          <div class="players-list">
            <label>Liste des joueurs</label>
            <select name="pick-player" v-model="newPlayerIdSelected">
              <option :value="player.id" v-for="player in players" :key="player.id">{{ player.name }} - {{ player.team }}</option>
            </select>
          </div>
          <div class="positions-list">
            <label>Liste des postes</label>
            <select name="pick-position" v-model="newPositionIdSelected">
              <option :value="position.id" v-for="position in positions" :key="position.id">{{ position.label }}</option>
            </select>
          </div>
        </div>
        <div class="separator">
          <hr>
        </div>
        <div class="add-btn">
          <span>Le joueur que tu veux ajouter n'existe pas ? Ajoutez-le !</span>
          <button class="add" @click="getAllInfos()"><i class="fas fa-plus-circle"/>&nbsp;Ajouter un joueur</button>
        </div>
      </div>
      <div class="footer">
        <button class="cancel" @click="$emit('close')"><i class="fas fa-long-arrow-alt-left"/>&nbsp;Annuler</button>
        <button class="confirm" @click="selectPlayer()"><i class="fas fa-check-circle"/>&nbsp;Confirmer</button>
      </div>
    </div>
    <!--    POPUP DE CRÉATION DE JOUEUR-->
    <div class="popup-add" v-else>
      <div class="header">Ajouter un nouveau joueur</div>
      <div class="body">
        <div class="form">
          <div class="name">
            <label for="name">Pseudo</label>
            <input type="text" id="name" v-model="newPlayer.name">
          </div>
          <div class="team">
            <label for="team">Équipe</label>
            <select name="team" id="team" v-model="newPlayer.team">
              <option :value="team" v-for="team in teams" :key="team.id">{{ team.name }}</option>
            </select>
          </div>
          <div class="country">
            <label for="country">Nationalité</label>
            <select name="country" id="country" v-model="newPlayer.country">
              <option :value="country" v-for="country in countries" :key="country.id">{{ country.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="footer">
        <button class="cancel" @click="pickPlayer = true;newPlayer = { name: '', team: {}, country: {} }">
          <i class="fas fa-long-arrow-alt-left"/>&nbsp;Retour
        </button>
        <button class="confirm" @click="addNewPlayer()"><i class="fas fa-plus-circle"/>&nbsp;Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {createToast} from "mosha-vue-toastify";

export default {
  props: {
    playerSelected: {
      type: Object,
      required: true
    },
    positionSelected: {
      type: Object,
      required: true
    }
  },
  name: "SelectPlayerPopup",
  data () {
    return {
      pickPlayer: true,
      newPlayerIdSelected: '',
      newPositionIdSelected: '',
      newPlayer: {
        name: '',
        team: {},
        country: {}
      },
      players: [],
      positions: [],
      teams: [],
      countries: []
    }
  },
  created () {
    this.newPlayerIdSelected = this.playerSelected.id
    this.newPositionIdSelected = this.positionSelected.id
    this.getAllPlayers()
    this.getAllPositions()
  },
  methods: {
    getAllPlayers () {
      axios.get(process.env.VUE_APP_BACK + 'players')
          .then(response => this.players = response.data)
          .catch(error => {
            if (error.response.status === 401) {
              this.$logout()
            } else {
              createToast('Récupération des joueurs impossible', {
                type: 'danger',
                timeout: 3000,
                position: 'bottom-left',
                showIcon: true
              })
              console.log(error)
            }
          })
    },
    getAllPositions () {
      axios.get(process.env.VUE_APP_BACK + 'positions')
          .then(response => this.positions = response.data)
          .catch(error => {
            if (error.response.status === 401) {
              this.$logout()
            } else {
              createToast('Récupération des postes impossible', {
                type: 'danger',
                timeout: 3000,
                position: 'bottom-left',
                showIcon: true
              })
              console.log(error)
            }
          })
    },
    getAllInfos () {
      axios.get(process.env.VUE_APP_BACK + 'teams')
          .then(response => {
            this.teams = response.data
            axios.get(process.env.VUE_APP_BACK + 'countries')
                .then(response2 => {
                  this.countries = response2.data
                  this.pickPlayer = false;
                })
                .catch(error => {
                  if (error.response.status === 401) {
                    this.$logout()
                  } else {
                    createToast('Récupération des nationalités impossible', {
                      type: 'danger',
                      timeout: 3000,
                      position: 'bottom-left',
                      showIcon: true
                    })
                    console.log(error)
                  }
                })
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.$logout()
            } else {
              createToast('Récupération des équipes impossible', {
                type: 'danger',
                timeout: 3000,
                position: 'bottom-left',
                showIcon: true
              })
              console.log(error)
            }
          })
    },
    addNewPlayer () {
      if (this.newPlayer.name !== '' && this.newPlayer.team.id && this.newPlayer.country.id) {
        axios.post(process.env.VUE_APP_BACK + 'add-player', {
          name: this.newPlayer.name,
          team: this.newPlayer.team,
          country: this.newPlayer.country
        })
            .then(response => {
              this.pickPlayer = true
              this.players = response.data
              this.newPlayer = {
                name: '',
                team: '',
                country: ''
              }
              createToast('Nouveau joueur ajouté', {
                type: 'success',
                timeout: 2000,
                position: 'bottom-left',
                showIcon: true
              })
            })
            .catch(error => {
              createToast('Ajout du joueur impossible, vérifiez vos informations', {
                type: 'danger',
                timeout: 3000,
                position: 'bottom-left',
                showIcon: true
              })
              console.log(error)
            })
      } else {
        createToast('Tous les champs sont obligatoires', {
          type: 'warning',
          timeout: 2000,
          position: 'bottom-center',
          showIcon: true
        })
      }
    },
    selectPlayer () {
      if (this.newPlayerIdSelected !== '') {
        let player = this.players.find(elem => elem.id === this.newPlayerIdSelected)
        if (this.newPositionIdSelected !== '') {
          player.position = this.positions.find(elem => elem.id === this.newPositionIdSelected)
          this.$emit('playerPicked', player)
          this.$emit('close')
        } else {
          createToast('Vous devez sélectionner un poste', {
            type: 'warning',
            timeout: 2000,
            position: 'bottom-center',
            showIcon: true
          })
        }
      } else {
        createToast('Vous devez sélectionner un joueur', {
          type: 'warning',
          timeout: 2000,
          position: 'bottom-center',
          showIcon: true
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(40, 40, 40, 0.6);

  .popup, .popup-add {
    position: absolute;
    background-color: white;
    border-radius: 10px;

    .header {
      width: 99%;
      height: 8%;
      background-color: #040586;
      color: gold;
      display: flex;
      align-items: center;
      padding-left: 1%;
      border-radius: 10px 10px 0 0;
      font-weight: bold;
      font-size: large;
    }

    .body {
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: space-evenly;

      .select-player {
        width: 45%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .players-list, .positions-list {
          display: flex;
          flex-direction: column;

          label {
            font-size: small;
          }

          select {
            width: 200px;
            margin-top: 2.5%;
            padding: 12px 15px;
            font-size: 1rem;
            border-width: 3px;
            border-style: solid;
            border-color: #040586;
            border-radius: calc(6 * 1px);
            outline: transparent;
            transition: border-color calc(0.2 * 1s) ease;
          }
        }

        .positions-list {
          margin-top: 10px;
        }
      }

      .separator {
        width: 5%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        hr {
          width: 1%;
          height: 80%;
          margin: 0;
          padding: 0;
          background-color: black;
        }
      }

      .add-btn {
        width: 45%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        span {
          font-weight: bold;
          font-size: medium;
        }

        .add {
          margin-top: 10px;
          background-color: #040586;
          color: gold;
          border: none;
          width: 40%;
          height: 10%;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;

          &:hover {
            background-color: gold;
            color: #040586;
          }
        }
      }

      .form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        .name, .team, .country {
          display: flex;
          flex-direction: column;
          width: 60%;

          label {
            font-size: small;
          }

          input, select {
            padding: 10px 10px;
            font-size: 1rem;
            border-width: 2px;
            border-style: solid;
            border-color: #040586;
            border-radius: calc(6 * 1px);
            outline: transparent;
            width: 90%;
            transition: border-color calc(0.2 * 1s) ease;
          }

          select {
            width: 100%;
          }
        }
      }
    }

    .footer {
      width: 100%;
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;

      .cancel, .confirm {
        border: none;
        width: 15%;
        height: 75%;
        cursor: pointer;
        border-radius: 10px;
      }

      .cancel {
        background-color: lightgrey;
      }

      .confirm {
        margin-left: 2%;
        background-color: limegreen;
      }
    }

    .close {
      color: red;
      position: absolute;
      top: 0;
      right: 0;
      margin: 10px;
      cursor: pointer;
    }
  }

  .popup {
    left: 25%;
    top: 20%;
    width: 50%;
    height: 60%;
  }

  .popup-add {
    left: 40%;
    top: 25%;
    width: 20%;
    height: 40%;

    .footer {
      .cancel, .confirm {
        width: 30%;
        height: 100%;
      }
    }
  }
}
</style>
