<template>
  <div class="wrapper">
    <recap-totw v-if="totwSelected.totw" :totw="totwSelected" @goBack="totwSelected = {}"/>
    <div class="totws" v-else>
      <div class="totw" v-for="totw in totws" :key="totw.totw" @click="totwSelected = totw">
        <div class="preview">
          <img v-if="totw.pic" :src="'data:image/jpeg;base64,' + totw.pic" alt="preview TOTW" class="preview-TOTW">
          <img v-else src="../assets/logo.png" alt="logo PLFR" class="logo-plfr">
        </div>
        <div class="title">
          TOTW {{ totw.totw }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {createToast} from "mosha-vue-toastify";
import RecapTotw from "./AddTotw/RecapTotw";

export default {
  name: "TotwList",
  components: {RecapTotw},
  data () {
    return {
      totws: [],
      totwSelected: {}
    }
  },
  created () {
    this.getTotws()
  },
  methods: {
    getTotws () {
      axios.get(process.env.VUE_APP_BACK + 'totws')
          .then(response => {
            this.totws = response.data
          })
          .catch(error => {
            console.log(error)
            createToast('Un erreur est survenue à la récupération des TOTW', {
              type: 'danger',
              timeout: 3000,
              position: 'bottom-left',
              showIcon: true
            })
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
  align-items: center;
  justify-content: center;

  .totws {
    width: 95%;
    height: 95%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;

    .totw {
      width: calc(100% / 7 - 2%);
      height: calc(100% / 2 - 6%);
      margin: 1%;
      box-shadow: 0 0 10px #040586;
      border-radius: 10px;
      cursor: pointer;

      .preview {
        width: 100%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px 10px 0 0;
        background-color: ghostwhite;

        .logo-plfr {
          width: 80%;
          height: 80%;
        }

        .preview-TOTW {
          width: 100%;
          height: 100%;
          border-radius: 10px 10px 0 0;
        }
      }

      .title {
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #040586;
        color: gold;
        font-size: x-large;
        font-weight: bold;
        border-radius: 0 0 10px 10px;
      }
    }

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #040586;
      border-radius: 15px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: white;
    }

    &::-webkit-scrollbar-track {
      background: white;
      border-radius: 10px;
      box-shadow: inset 7px 10px 12px #f0f0f0;
    }
  }
}
</style>
