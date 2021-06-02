<template>
  <div class="wrapper">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <choose-forma v-if="step === 1"/>
    <choose-players v-else-if="step === 2"/>
    <recap-totw v-else/>
    <div class="buttons">
      <button @click="step > 1 ? step-- : step = 1">Précédent</button>
      <button @click="step < 3 ? step++ : step = 3">Suivant</button>
    </div>
  </div>
</template>

<script>
import ChooseForma from "./AddTotw/ChooseForma";
import axios from "axios";
import ChoosePlayers from "./AddTotw/ChoosePlayers";
import RecapTotw from "./AddTotw/RecapTotw";

export default {
  name: "AddTotw",
  components: {RecapTotw, ChoosePlayers, ChooseForma},
  data () {
    return {
      title: 'TOTW',
      step: 1
    }
  },
  mounted () {
    this.getTotwCount()
  },
  methods: {
    getTotwCount () {
      axios.get('http://localhost:3000/totw-count')
          .then(response => {
            console.log(response)
            this.title += ' ' + response.data
          })
          .catch(error => {
            console.log(error)
          })
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
}
</style>
