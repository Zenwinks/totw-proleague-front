<template>
  <div class="sub-wrapper" v-if="compos">
    <select name="choose-compo" id="choose-compo" v-model="newCompoId">
      <option disabled value="">Choisissez une compo...</option>
      <option :value="compo.id" v-for="compo in compos" :key="compo.id">{{ compo.label }}</option>
    </select>
  </div>
  <div class="sub-wrapper" v-else>
    <div class="no-compo">Aucun joueur à afficher</div>
  </div>
</template>

<script>

export default {
  name: "ChooseForma",
  props: {
    compoId: {
      type: String,
      required: true
    },
    compos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      newCompoId: '',
      firstChange: true
    }
  },
  created () {
    this.firstChange = true
    this.newCompoId = this.compoId
  },
  watch: {
    newCompoId () {
      this.$emit('changeCompo', this.newCompoId)
    }
  }
}
</script>

<style scoped lang="scss">
.sub-wrapper {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;

  select {
    width: 15%;
    height: 30%;
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
</style>
