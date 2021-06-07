<template>
  <div class="wrapper">
    <div class="popup">
      <div class="header">Sélectionnez le joueur de la semaine</div>
      <i class="fas fa-times close" @click="$emit('close')"/>
      <div class="body">
        <div class="potw">
          <label>Liste des titulaires</label>
          <select name="pick-potw" v-model="potwIdSelected">
            <option :value="player.id" v-for="player in players" :key="player.id">
              [{{ player.position.label }}] {{ player.name }} - {{ player.team }}
            </option>
          </select>
        </div>
      </div>
      <div class="footer">
        <button class="cancel" @click="$emit('close')"><i class="fas fa-long-arrow-alt-left"/>&nbsp;Annuler</button>
        <button class="confirm" @click="selectPotw()"><i class="fas fa-check-circle"/>&nbsp;Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  name: "PotwPopup",
  data () {
    return {
      potwIdSelected: ''
    }
  },
  methods: {
    selectPotw () {
      this.$emit('updatePotw', this.potwIdSelected)
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

  .popup {
    position: absolute;
    left: 37.5%;
    top: 25%;
    width: 25%;
    height: 40%;
    background-color: white;
    border-radius: 10px;

    .header {
      width: 99%;
      height: 10%;
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
      height: 78%;
      display: flex;
      align-items: center;
      justify-content: center;

      .potw {
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

          option {
            font-weight: bold;
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
        width: 25%;
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
