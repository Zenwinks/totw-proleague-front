<template>
  <div class="wrapper">
    <div class="title">
      <h3><span v-if="step > 1">Récap' </span>{{ title }} {{ totwCount }}</h3>
    </div>
    <div class="content">
      <!--      <choose-forma v-if="step === 1" :compoId="compoId" :compos="compos" @changeCompo="compoId = $event"/>-->
      <choose-players v-if="step === 1" :titus="titus" :subs="subs"
                      @updateTitus="titus = $event" @updateSubs="subs = $event"/>
      <recap-totw v-else :titus="titus" :subs="subs"/>

      <div class="buttons">
        <button v-if="step > 1" class="page-btn previous" @click="previous()"><i class="fas fa-step-backward"/>&nbsp;Étape précédente</button>
        <button v-if="step < 2" class="page-btn next" @click="next()">Étape suivante&nbsp;<i class="fas fa-step-forward"/></button>
        <button v-else class="valid" @click="addTotw()"><i class="fas fa-check"/>&nbsp;Valider</button>
      </div>
    </div>
    <potw-popup v-if="showPotwPopup" :players="titus"
                @close="showPotwPopup = false" @updatePotw="addPotwPlayer($event)"/>
  </div>
</template>

<script>
import axios from "axios";
import ChoosePlayers from "./AddTotw/ChoosePlayers";
import RecapTotw from "./AddTotw/RecapTotw";
import {createToast} from "mosha-vue-toastify";
import PotwPopup from "./AddTotw/PotwPopup";

export default {
  name: "AddTotw",
  components: {PotwPopup, RecapTotw, ChoosePlayers},
  data () {
    return {
      title: 'TOTW',
      totwCount: 0,
      step: 1,
      // compos: [],
      // compoId: '',
      potwChosen: false,
      showPotwPopup: false,
      players: [],
      titus: [],
      subs: [],
      bckPlayerPotw: {},
      bckPlayerPotwIndex: 0
    }
  },
  created () {
    this.getTotwCount()
    // this.getAllFormations()
  },
  methods: {
    getTotwCount () {
      axios.get('http://localhost:3000/totw-count')
          .then(response => this.totwCount = parseInt(response.data))
          .catch(error => {
            if (error.response.status === 401) {
              this.$logout()
            } else {
              createToast('Récupération du compteur de TOTW impossible', {
                type: 'danger',
                timeout: 3000,
                position: 'bottom-left',
                showIcon: true
              })
              console.log(error)
            }
          })
    },
    addTotw () {
      axios.post('http://localhost:3000/add-totw', {
        titus: this.titus,
        subs: this.subs,
        totwCount: this.totwCount
      })
          .then(() => {
            createToast('TOTW créée avec succès', {
              type: 'success',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
            this.$emit('goToStats')
          })
          .catch(error => {
            createToast('Une erreur est survenue à la création de la TOTW', {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
            console.log(error)
          })
    },
    addPotwPlayer (potwId) {
      let index = 0
      let player = this.titus.find((elem, i) => {
        if (elem.id === potwId) {
          index = i
          return elem
        }
      })
      this.bckPlayerPotw = this.titus[index]
      this.bckPlayerPotwIndex = index
      player.isPotw = true
      this.titus[index] = player
      this.potwChosen = true
      this.showPotwPopup = false
      this.next()
    },
    previous () {
      if (this.step > 1) {
        this.step--
        this.titus[this.bckPlayerPotwIndex] = this.bckPlayerPotw
        this.potwChosen = false
      }
    },
    next () {
      if (this.step < 2 && this.titus.length === 11 && this.subs.length === 11 && this.potwChosen) {
        this.step++
      } else if (this.titus.length < 11 || this.subs.length < 11) {
        createToast('Veuillez sélectionner 22 joueurs avant de continuer', {
          type: 'warning',
          timeout: 2000,
          position: 'bottom-center',
          showIcon: true
        })
      } else if (!this.potwChosen) {
        this.showPotwPopup = true
      }
    },
    // getAllFormations () {
    //   axios.get('http://localhost:3000/formations')
    //       .then(response => {
    //         this.compos = response.data
    //       })
    //       .catch(error => {
    //         if (error.response.status === 401) {
    //           this.$logout()
    //         } else {
    //           createToast('Récupération des formations impossible', {
    //             type: 'danger',
    //             timeout: 3000,
    //             position: 'bottom-left',
    //             showIcon: true
    //           })
    //           console.log(error)
    //         }
    //       })
    // },
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

  .title {
    width: 100%;
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      padding: 0;
      margin: 0;
      font-size: x-large;
      text-decoration: underline;
    }
  }

  .content {
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 15%;

      .page-btn, .valid {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40%;
        height: 100%;
        border-radius: 10px;
        margin-right: 2.5%;
        margin-left: 2.5%;
        cursor: pointer;
        font-size: large;
        font-weight: bold;
      }

      .page-btn {
        color: #040586;
        border: 1px solid #040586;

        &:hover {
          background-color: #040586;
          color: gold;
        }
      }

      .valid {
        color: limegreen;
        border: 1px solid limegreen;

        &:hover {
          background-color: limegreen;
          color: white;
        }
      }
    }
  }
}
</style>
