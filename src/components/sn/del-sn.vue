<template>
  <button v-show="delBtn" @click="setChekboxShow(chekboxShow)" class="delBtn"></button>
</template>
<script>
  export default {
    name: 'DelSN',
    props: ['num'],
    data() {
      return {
        inputVal: ''
      }
    },
    computed: {
      delBtn() {
        return this.$store.state.delBtn
      },
      chekboxShow() {
        return this.$store.state.chekboxShow
      }
    },
    methods: {
      setChekboxShow(boole) {
        this.$store.commit('chekboxShow', !boole)
      }
    },
    mounted() {
      this.setChekboxShow(true)
    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

.delBtn{
  position: absolute;
  top: 0.46875rem;
  right: $f40;
  width: $f20;
  height: $f20;
  background: url(../../assets/img/purchase/2_dustbin.png) no-repeat;
  background-size: 100% 100%;
}
</style>

