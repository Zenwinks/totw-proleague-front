<template>
  <div class="sub-wrapper">
    <div class="titus">
      <div class="title">Titulaires</div>
      <div class="titu-players">
        <pick-player v-for="index in indexes" :key="index" :index="index" @updateTitus="newTitus[index] = $event"/>
      </div>
    </div>
    <div class="separator">
      <hr>
    </div>
    <div class="subs">
      <div class="title">Mentions honorables</div>
      <div class="sub-players">
        <pick-player v-for="index in indexes" :key="index" :index="index" :isTitu="false" @updateSubs="newSubs[index] = $event"/>
      </div>
    </div>
  </div>
</template>

<script>
import PickPlayer from "./ChoosePlayers/PickPlayer";

export default {
  components: {PickPlayer},
  props: {
    titus: {
      type: Array,
      required: true
    },
    subs: {
      type: Array,
      required: true
    },
  },
  name: "ChoosePlayers",
  data () {
    return {
      newTitus: [],
      newSubs: [],
      indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  created () {
    this.newTitus = this.titus
    this.newSubs = this.subs
  },
  watch: {
    newTitus () {
      this.$emit('updateTitus', this.newTitus)
    },
    newSubs () {
      this.$emit('updateSubs', this.newSubs)
    }
  }
}
</script>

<style scoped lang="scss">
.sub-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;

  .titus, .subs {
    width: 40%;
    height: 100%;

    .titu-players, .sub-players {
      width: 100%;
      height: 95%;
    }

    .title {
      width: 100%;
      height: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: large;
      text-align: center;
      text-decoration: underline;
    }
  }

  .separator {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    hr {
      width: 0.8%;
      height: 80%;
      margin: 0;
      padding: 0;
      background-color: black;
    }
  }
}
</style>
