<template>
  <div class="sub-wrapper">
    <div class="titus">
      <div class="title">Titulaires</div>
      <div class="titu-players">
        <div class="player" v-for="(titu, index) in titus" :key="titu.id">
          <div class="index">{{ index + 1 }}</div>
          <div v-if="titu.id !== ''" class="player-info">
            <i class="fas fa-star potw" v-if="titu.isPotw">&nbsp;</i>
            <div class="player-name">[{{ titu.position.label }}] {{ titu.name }} - {{ titu.team }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="separator">
      <hr>
    </div>
    <div class="subs">
      <div class="title">Mentions honorables</div>
      <div class="sub-players">
        <div class="player" v-for="(sub, index) in subs" :key="sub.id">
          <div class="index">{{ index + 1 }}</div>
          <div v-if="sub.id !== ''" class="player-info">
            <div class="player-name">[{{ sub.position.label }}] {{ sub.name }} - {{ sub.team }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titus: {
      type: Array
    },
    subs: {
      type: Array
    }
  },
  name: "RecapTotw"
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
