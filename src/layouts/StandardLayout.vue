<template>
  <div class="home">
    <div class="navbar">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
      <div class="title">
        <h1 @click="$router.push('/')">TOTW Manager</h1>
      </div>
      <div class="icons">
        <div class="profile" @click="$router.push('/profile')" v-if="currentUser">
          <span>{{ currentUser.name }}</span>&nbsp;&nbsp;
          <i class="fas fa-user fa-lg"/>
        </div>
        <i class="fas fa-cogs fa-lg admin" @click="$router.push('/admin')" v-if="currentUser.isAdmin"/>
        <i class="fas fa-power-off fa-lg" @click="logout"/>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "StandardLayout",
  computed: {
    currentUser: function () {
      return this.$store.state.auth.user
    }
  },
  created () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  },
  methods: {
    logout: function () {
      this.$logout()
    },
  }
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
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #040586;

    .logo {
      width: 33%;
      height: 100%;

      img {
        height: 100%;
      }
    }

    .title {
      width: 33%;
      display: flex;
      justify-content: center;

      h1 {
        font-size: 30px;
        color: gold;
        cursor: pointer;
      }
    }

    .icons {
      width: 33%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .profile {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: gold;
        cursor: pointer;
      }

      .admin {
        color: gold;
        cursor: pointer;
        margin-left: 10px;
      }

      .fa-power-off {
        color: red;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
}
</style>
