<template>
  <table border="1">
    <TableH :list=tableHList></TableH>
    <TableDSN 
    v-for="(arr, index) in list" 
    :index=index 
    :arr=arr 
    :key="arr[0]"
    ></TableDSN>
  </table>
</template>
<script>
import TableH from './table-h'
import TableDSN from './table-d-sn'
  export default {
    name: 'TableComponent',
    components: { TableH, TableDSN },
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

