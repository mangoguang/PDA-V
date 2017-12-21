<template>
  <tr @click="snDetail()">
    <td>{{index + 1}}</td>
    <td v-for="name in arr" :key="name"><p>{{name}}</p></td>
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
      // evenArr() {
      //   return this.arr.filter((index) => {
      //     return index = (this.arr.length - 1)
      //   })
      // }
    },
    methods: {
      snDetail() {
      }
    },
    mounted() {
      // console.log(this.evenArr)
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
  td{
    padding: 0 .2rem;
    white-space: nowrap;
  }
}
</style>
