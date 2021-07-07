<template>
  <div class="wrapper">
    <div class="popup-add">
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
        <button class="cancel" @click="cancel()">
          <i class="fas fa-long-arrow-alt-left"/>&nbsp;Retour
        </button>
        <button class="confirm" @click="addNewPlayer()"><i class="fas fa-plus-circle"/>&nbsp;Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teams: {
      type: Array,
      required: true
    },
    countries: {
      type: Array,
      required: true
    }
  },
  name: "AddPlayerPopup",
  data () {
    return {
      newPlayer: {
        name: "",
        team: {},
        country: {}
      }
    }
  },
  methods: {
    addNewPlayer () {
      this.$emit('addNewPlayer', this.newPlayer)
      this.newPlayer = {
        name: '',
        team: {},
        country: {}
      }
    },
    cancel () {
      this.newPlayer = {
        name: '',
        team: {},
        country: {}
      }
      this.$emit('cancel')
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

  .popup-add {
    position: absolute;
    background-color: white;
    border-radius: 10px;
    left: 40%;
    top: 25%;
    width: 20%;
    height: 40%;

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
        width: 30%;
        height: 100%;
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
}
</style>
