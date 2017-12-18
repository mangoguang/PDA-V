<template>
  <ul>
    <LiComponent 
    :val=printPlanSelNum
    :list=printPlanList
    ></LiComponent>
    <li>
      <label for="scanPlan">打印方案</label>
      <select id="scanPlan" v-model="printPlanSelNum" @change="changePrintPlan">
        <option v-for="obj in printPlanList" :value="obj.ZBQXH" :key="obj.ZBQXH">{{ obj.ZBQMC }}</option>
      </select>
      <span></span>
    </li>
      <!-- <li>
        <label for="department">部门</label>
        <select id="department" v-model="departmentVal" @change="changeDepartment">
          <option v-for="name in departmentList" :value="name" :key="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="line">生产线</label>
        <select id="line" v-model="lineVal" @change="changeLine">
          <option v-for="name in lineList" :value="name" :key="name">{{ name }}</option>
        </select>
        <span></span>
      </li>
      <li>
        <label for="print">打印机</label>
        <select id="print" v-model="printVal" @change="changePrint">
          <option v-for="obj in printList" :value="obj.PRINT_NAME" :key="obj.PRINT_NAME">{{ obj.PRINT_NAME }}</option>
        </select>
        <span></span>
      </li> -->
  </ul>
</template>
<script>
import {path, getPrintPlanMsg, ajax} from '../../js/variable.js'
  import LiComponent from '../../components/setting/li'
  export default {
    name: 'BQPrint',
    components: {LiComponent},
    data() {
      return {
        printPlanSelNum: '',
        printPlanSel: '',
        printPlanList: []
      }
    },
    methods: {
      getModule() {
        let _this = this
        let url = path.sap + 'securitycode/getmodule'
        ajax('GET', url, null).then((data) => {
          data = data.MT_SecurityCode_GetModule_Resp.Item
          console.log('222', data)
          _this.printPlanList = data.map((obj) => {
              return {
                name: obj.ZBQMC,
                code: obj.ZBQXH
              }
            })
          console.log('1111111', _this.printPlanList)
          let temp = localStorage.getItem('printPlanMsg')
          if (!temp) {
            _this.printPlanSelNum = data[0].ZBQXH
            localStorage.setItem('printPlanMsg', JSON.stringify(data[0]))
          }
        }).catch(() => {
          alert('请求超时！')
            _this.loadingShow(false)
        })
      }
    },
    mounted() {
      this.getModule()
      getPrintPlanMsg(this)
    }
  }
</script>
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
@import "../../assets/css/common.css";


</style>
