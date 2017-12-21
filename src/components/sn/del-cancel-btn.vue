<template>
  <ul class="delCancel clearfix">
    <li @click="delSN"><BtnComponent class="btn100 del">删除</BtnComponent></li>
    <li @click="cancel"><BtnComponent class="btn100 gray cancel">取消</BtnComponent></li>
  </ul>
</template>
<script>
import BtnComponent from '../btn'
  export default {
    name: 'DelCancelBtn',
    components: {BtnComponent},
    props: ['checkboxList'],
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      delSN() {
        console.log(this.checkboxList)
      },
      cancel() {
        this.$store.commit('chekboxShow', false)
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

ul.delCancel{
  position: absolute;
  bottom: $f20;
  li{
    position: relative;
    float: left;
    width: 5rem;
    height: $f40;
  }
}
</style>

