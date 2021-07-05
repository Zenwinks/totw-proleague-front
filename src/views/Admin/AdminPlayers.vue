<template>
  <admin-layout>
    <div class="container">
      <div class="go-back" @click="$router.push('/admin')"><i class="fas fa-long-arrow-alt-left"/>&nbsp;Quitter l'administration</div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from "../../layouts/AdminLayout";

export default {
  name: "AdminPlayers",
  components: {AdminLayout}
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .go-back {
    cursor: pointer;
    height: 5%;
    width: 10%;
    margin: 0.5% 0 0 0.5%;
    background-color: lightgrey;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 10px;
  }
}
</style>
