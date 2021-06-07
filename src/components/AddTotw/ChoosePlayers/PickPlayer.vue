<template>
  <div class="player">
    <div class="index">{{ index + 1 }}</div>
    <div v-if="playerSelected.id !== ''" class="player-info">
      <div class="player-name">[{{ positionSelected.label }}] {{ playerSelected.name }} - {{ playerSelected.team }}</div>
      <div class="actions">
        <button @click="pickPlayer = true"><i class="fas fa-exchange-alt"/>&nbsp;Changer de joueur</button>
        <i class="fas fa-times reset" @click="resetData()"/>
      </div>
    </div>
    <div v-else class="no-player">
      <button @click="pickPlayer = true"><i class="fas fa-plus"/>&nbsp;Sélectionner un joueur</button>
    </div>
    <select-player-popup v-if="pickPlayer" :playerSelected="playerSelected" :positionSelected="positionSelected"
                         @close="pickPlayer = false"
                         @playerPicked="updatePlayerPicked($event)"/>
  </div>
</template>

<script>
import SelectPlayerPopup from "./SelectPlayerPopup";

export default {
  components: {SelectPlayerPopup},
  props: {
    index: {
      type: Number,
      required: true
    },
    isTitu: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  name: "PickPlayer",
  data () {
    return {
      playerSelected: {
        id: ''
      },
      positionSelected: {
        id: ''
      },
      pickPlayer: false
    }
  },
  methods: {
    resetData () {
      this.playerSelected = {
        id: ''
      }
      this.positionSelected = {
        id: ''
      }
    },
    updatePlayerPicked (event) {
      this.playerSelected = event.player
      this.positionSelected = event.position
      let player = this.playerSelected
      player.position = this.positionSelected
      if (this.isTitu) {
        player.isPotw = false
        this.$emit('updateTitus', player)
      } else {
        this.$emit('updateSubs', player)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.player {
  width: 98%;
  height: calc((100% / 11) - 2%);
  display: flex;
  align-items: center;
  margin: 1%;

  .index {
    height: 28px;
    width: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1%;
    border-radius: 50%;
    background-color: #040586;
    color: gold;
  }

  .player-info {
    width: 92%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
    background-color: limegreen;
    font-weight: bold;

    .actions {
      width: 30%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 5px;

      .reset, button {
        cursor: pointer;
      }

      .reset {
        color: red;
      }
    }
  }

  .no-player {
    margin-left: 10px;

    button {
      cursor: pointer;
    }
  }
}
</style>
