<template>
  <div class="sub-wrapper">
    <div class="back" v-if="totw.totw">
      <button @click="$emit('goBack')"><i class="fas fa-long-arrow-alt-left"/>&nbsp;Retour</button>
    </div>
    <div :class="[totw.totw ? 'from-totw-list' : 'content']">
      <div class="titus" v-if="newTitus.length > 0">
        <div class="title">Titulaires</div>
        <div class="titu-players">
          <div class="player" v-for="(titu, index) in newTitus" :key="titu.id">
            <div class="index">{{ index + 1 }}</div>
            <div v-if="titu.id !== ''" class="player-info">
              <i class="fas fa-star potw" v-if="titu.isPotw">&nbsp;</i>
              <div class="player-name" v-if="typeof titu.position === 'string'">[{{ titu.position }}] {{ titu.name }} - {{ titu.team }}</div>
              <div class="player-name" v-else>[{{ titu.position.label }}] {{ titu.name }} - {{ titu.team }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="separator">
        <hr>
      </div>
      <div class="subs" v-if="newSubs.length > 0">
        <div class="title">Mentions honorables</div>
        <div class="sub-players">
          <div class="player" v-for="(sub, index) in newSubs" :key="sub.id">
            <div class="index">{{ index + 1 }}</div>
            <div v-if="sub.id !== ''" class="player-info">
              <div class="player-name" v-if="typeof sub.position === 'string'">[{{ sub.position }}] {{ sub.name }} - {{ sub.team }}</div>
              <div class="player-name" v-else>[{{ sub.position.label }}] {{ sub.name }} - {{ sub.team }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    titus: {
      type: Array
    },
    subs: {
      type: Array
    },
    totw: {
      type: Object
    }
  },
  name: "RecapTotw",
  data () {
    return {
      newTitus: [],
      newSubs: []
    }
  },
  created () {
    if (this.totw.totw) {
      this.getPlayers()
    } else {
      this.newTitus = this.titus
      this.newSubs = this.subs
    }
  },
  methods: {
    getPlayers () {
      axios.get('http://localhost:3000/players/' + this.totw.totw)
          .then(response => {
            console.log(response)
            this.newTitus = response.data.titus
            this.newSubs = response.data.subs
          })
          .catch(e => {
            console.log(e)
          })
    }
  }
}
</script>

<style scoped lang="scss">
.sub-wrapper {
  width: 100%;
  height: 100%;

  .back {
    width: 100%;
    height: 5%;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10%;
      height: 100%;
      border-radius: 10px;
      margin-left: 2.5%;
      cursor: pointer;
      font-size: large;
      font-weight: bold;
      color: #040586;
      border: 1px solid #040586;

      &:hover {
        background-color: #040586;
        color: gold;
      }
    }
  }

  .from-totw-list {
    width: 90%;
    height: 93%;
  }

  .content {
    width: 100%;
    height: 98%;
  }

  .content, .from-totw-list {
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .player {
          width: 98%;
          height: calc((100% / 11) - 2%);
          display: flex;
          align-items: center;
          margin: 1%;

          .index {
            height: 28px;
            width: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 1%;
            border-radius: 50%;
            background-color: #040586;
            color: gold;
          }

          .player-info {
            width: 92%;
            display: flex;
            //align-items: center;
            margin-left: 10px;
            font-weight: bold;

            .potw {
              color: gold;
            }
          }
        }
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
