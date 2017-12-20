<template>
  <table border="1">
    <TableH :list=tableHList></TableH>
    <TableD 
    v-for="(arr, index) in list" 
    :index=index 
    :arr=arr 
    :key="arr[0]"
    ></TableD>
  </table>
</template>
<script>
import TableH from './table-h'
import TableD from './table-d'
  export default {
    name: 'TableComponent',
    components: { TableH, TableD },
    props: ['list', 'tableHList'],
    data() {
      return {

      }
    },
    methods: {
      clearInput() {

      }
    },
    mounted() {

    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";

table{
  border: none;
  outline: none;
  border-collapse: collapse;
  min-width: 10rem;
}
</style>
