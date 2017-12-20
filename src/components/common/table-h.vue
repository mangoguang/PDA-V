<template>
  <tr>
    <th v-for="name in list" :key="name">{{name}}</th>
  </tr>
</template>
<script>
  export default {
    name: 'TableH',
    props: ['list'],
    data() {
      return {

      }
    },
    methods: {
      clearInput() {

      }
    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

tr{
  height: $f30;
  border: none;
  outline: none;
  min-width: 10rem;
  box-shadow: 0 2px $f4 rgba(0,0,0,0.16);
  background: #f0f0f0;
  th{
    border: none;
    outline: none;
  }
}
</style>
