<template>
  <div class="home">
    <div class="navbar">
      <img alt="Vue logo" src="../assets/logo.png">
      <h1>TOTW Manager</h1>
      <div class="block"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LoginLayout"
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .navbar {
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #040586;

    img {
      height: 100%;
    }

    h1 {
      font-size: 30px;
      color: gold;
    }

    .block {
      width: 8%;
    }
  }
}
</style>
