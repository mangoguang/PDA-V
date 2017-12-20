<template>
  <tr @click="toSNPages(arr[0])">
    <td>{{index + 1}}</td>
    <td v-for="name in arr" :key="name">{{name}}</td>
  </tr>
</template>
<script>
  export default {
    name: 'TableD',
    props: ['index', 'arr'],
    data() {
      return {

      }
    },
    computed: {
      moduleNameEN() {
        return this.$store.state.moduleNameEN
      }
    },
    methods: {
      toSNPages(num) {
        this.$router.push({ path: '/' + this.moduleNameEN + '/' + num })
      }
    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

tr{
  height: $f30;
  line-height: $f30;
  font-size: $textSize;
  color: $textCol;
  text-align: center;
  position: relative;
  padding: 0 $f4;
  box-sizing: border-box;
  overflow-y: hidden;
}
</style>
