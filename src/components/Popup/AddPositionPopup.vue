<template>
  <div class="wrapper">
    <div class="popup-add">
      <div class="header">Ajouter une nouvelle nationalité</div>
      <div class="body">
        <div class="form">
          <div class="label">
            <label for="label">Label</label>
            <input type="text" id="label" v-model="newPosition">
          </div>
        </div>
      </div>
      <div class="footer">
        <button class="cancel" @click="cancel()">
          <i class="fas fa-long-arrow-alt-left"/>&nbsp;Retour
        </button>
        <button class="confirm" @click="addNewPosition()"><i class="fas fa-plus-circle"/>&nbsp;Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPositionPopup",
  data () {
    return {
      newPosition: ""
    }
  },
  methods: {
    addNewPosition () {
      this.$emit('addNewPosition', this.newPosition)
      this.newPosition = ""
    },
    cancel () {
      this.newPosition = ""
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

      .form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        .label {
          display: flex;
          flex-direction: column;
          width: 60%;

          label {
            font-size: small;
          }

          input {
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
