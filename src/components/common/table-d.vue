<template>
  <tr @click="toSNPages(arr[0], arr[arr.length-1])">
    <td>{{index + 1}}</td>
    <slot></slot>
  </tr>
</template>
<script>
  export default {
    name: 'TableD',
    props: ['index', 'arr'],
    data() {
      return {
        name: this.$route.query.name
      }
    },
    computed: {
      evenArr() {
        return this.arr.filter((index) => {
          return index > (this.arr.length - 1)
        })
      }
    },
    methods: {
      toSNPages(num, ZDDLX) {
        this.$router.push({ path: '/' + this.name + '/' + num + '?ZDDLX=' + this.arr[this.arr.length - 1] })
      }
    },
    mounted() {
      console.log(this.name)
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
