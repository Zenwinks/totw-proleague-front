<template>
  <div class="sub-wrapper">
    TOTW {{ totw.totw }}
  </div>
</template>

<script>
export default {
  props: {
    totw: {
      type: Object,
      required: true
    }
  },
  name: "Totw"
}
</script>

<style scoped lang="scss">
.sub-wrapper {
  width: 100%;
  height: 100%;
}

</style>
