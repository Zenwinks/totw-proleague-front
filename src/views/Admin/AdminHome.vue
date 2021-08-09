<template>
  <admin-layout>
    <div class="container">
      <div class="go-back" @click="$router.push('/')"><i class="fas fa-long-arrow-alt-left"/>&nbsp;Quitter l'administration</div>
      <div class="menus">
        <div class="menu" @click="$router.push('/admin/teams')">
          Gérer les équipes
        </div>
        <div class="menu" @click="$router.push('/admin/countries')">
          Gérer les nationalités
        </div>
        <div class="menu" @click="$router.push('/admin/players')">
          Gérer les joueurs
        </div>
        <div class="menu" @click="$router.push('/admin/positions')">
          Gérer les postes
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from "../../layouts/AdminLayout";

export default {
  name: "AdminHome",
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
    text-align: center;

    &:hover {
      background-color: gray;
    }
  }

  .menus {
    width: 50%;
    height: 70%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;

    .menu {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 40%;
      margin-right: 2.5%;
      margin-left: 2.5%;
      border-radius: 10px;
      cursor: pointer;
      color: #040586;
      font-size: x-large;
      font-weight: bold;
      box-shadow: 0 0 10px #040586;
      user-select: none;
      text-align: center;

      &:hover {
        background-color: #040586;
        color: gold;
      }
    }

    .active {
      background-color: #040586;
      color: gold;
    }
  }
}
</style>
