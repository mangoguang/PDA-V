<!-- <keep-alive> -->
<template>
  <div class="snList">
    <div @click="tableTrShow" v-show="errorShow">
      <ScanError></ScanError>
    </div>
    <div @click="putIn" v-show="putInShow">
      <PutIn></PutIn>
    </div>
    <div class="snDetail">
      <SNDetail></SNDetail>
    </div>
    <div class="headBox">
      <HeadComponent>
        <h1>采购入库操作</h1>
        <button @click="checkBoxShowFn(showCheckbox)" class="delBtn"></button>
      </HeadComponent>
      <ul class="snBox clearfix">
        <li>
          <p @click="test">单号：{{opNum}}</p>
        </li>
        <li>
          <input type="text" v-model="inputVal" placeholder="条码" v-focus="focusStatus">
          <button @click="clearInput" class="clearInput"></button>
        </li>
      </ul>
      <ul class="statusBox clearfix">
        <li @click="btn1" :class="{on: btnStatus[0]}">产品：{{status1}}</li>
        <li @click="btn2" :class="{on: btnStatus[1]}">应扫：{{status2}}</li>
        <li @click="btn3" :class="{on: btnStatus[2]}">已扫：{{status3}}</li>
        <li @click="btn4" :class="{on: btnStatus[3]}">未扫：{{status4}}</li>
      </ul>
    </div>
    <div class="table">
      <TableH></TableH>
      <TableTr class="contain" v-bind:style="{height: height+'px'}"></TableTr>
      <div @click="sureIn" v-if="!checkBoxShow && !btnStatus[0]"><Btn class="btn100 sure">确认入库</Btn></div>
      <ul class="delCancel clearfix">
        <li @click="delSN" v-if="checkBoxShow"><Btn class="btn100 del">删除</Btn></li>
        <li @click="cancel" v-if="checkBoxShow"><Btn class="btn100 gray cancel">取消</Btn></li>
      </ul>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import HeadComponent from '../../components/header'
import TableH from '../../components/table-h'
import TableTr from '../../components/table-tr-sn'
import ScanError from '../../components/purchase/scan-error'
import PutIn from '../../components/purchase/put-in'
import SNDetail from '../../components/purchase/sn-detail'
import Btn from '../../components/btn'
import { path, V } from '../../js/variable.js'
// import {pathLocal, V} from '../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'snList',
  components: {HeadComponent, TableH, TableTr, ScanError, PutIn, SNDetail, Btn},
  data () {
    return {
      height: document.documentElement.clientHeight,
      focusStatus: true,
      opNum: this.$route.params.num,
      // 按钮对应的数据
      status1: 0,
      status2: 0,
      status3: 0,
      status4: 0,
      // 扫码错误弹框显示/隐藏
      errorShow: true,
      putInShow: false,
      inputVal: '',
      btnShow: true,
      showCheckbox: true,
      btnStatus: [true, false, false, false],
      // 用于判断是否添加sn数组的status属性
      addStatus: true,
      // ifVerify为true，即在应扫按钮亮是才可扫码校验
      ifVerify: false
    }
  },
  watch: {
    'inputVal': function() {
      if (this.ifVerify) {
        this.verify()
      } else {
        alert('请切换到应扫状态！')
      }
    }
  },
  computed: {
    checkBoxShow() {
      return this.$store.state.checkBoxShow
    },
    btnNum() {
      return this.status
    },
    snArr() {
      return this.$store.state.snArr
    },
    sns() {
      return this.$store.state.SN
    }
  },
  methods: {
    // 点击头部切换按钮
    btn1() {
      this.$store.commit('tableH', ['序号', '物料描述', '数量'])
      this.setIsTr3(true)
      this.btnStatus = [true, false, false, false]
      this.turnArr(this.snArr)
      this.ifVerify = false
    },
    btn2() {
      this.$store.commit('tableH', ['序号', '描述', '条码', '状态'])
      this.setIsTr3(false)
      this.btnStatus = [false, true, false, false]
      this.turnArr(this.snArr)
      this.ifVerify = true
    },
    btn3() {
      this.$store.commit('tableH', ['序号', '描述', '条码', '状态'])
      this.setIsTr3(false)
      this.btnStatus = [false, false, true, false]
      this.turnArr(this.snArr)
      this.filtrateArr(true)
      console.log(this.sns)
      this.ifVerify = false
    },
    btn4() {
      this.$store.commit('tableH', ['序号', '描述', '条码', '状态'])
      this.setIsTr3(false)
      this.btnStatus = [false, false, false, true]
      this.turnArr(this.snArr)
      this.filtrateArr(false)
      this.ifVerify = false
    },
    setIsTr3(x) {
      this.$store.commit('isTr3', x)
    },
    // 设置表头标题
    setTableH() {
      this.$store.commit('tableH', ['序号', '物料', '描述', '数量'])
    },
    // SN列表checkbox复选框显示/隐藏
    checkBoxShowFn(x) {
      this.btnShow = false
      this.showCheckbox = !this.showCheckbox
      this.$store.commit('checkBoxShow', x)
    },
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    tableTrShow() {
      this.errorShow = false
    },
    putIn() {
      this.putInShow = false
    },
    clearInput() {
      this.inputVal = ''
    },
    sureIn() {
      this.btnShow = false
    },
    delSN() {
      this.btnShow = true
    },
    cancel() {
      this.btnShow = true
    },
    setSN(arr) {
      this.$store.commit('setSN', arr)
    },
    test() {
      this.status = [1, 2, 3, 4]
      // let url = path.sap + 'purchase/confirm'
      // let params = '{"Item": {"BUS_NO": "4500000240","ZDDLX": "1","ZQRKZ": "1","ZGH": "1"}}'
      // $.post(url, params, function(response) {
      //   console.log(response)
      // })
    },
    getSNList() {
      let _this = this
      _this.loadingShow(true)
      let url = path.sap + 'purchase/getsn'
      let params = {
        BUS_NO: '4500000277',
        ZDDLX: 1,
        WERKS: '1010',
        LGORT: '1001'
      }
      V.get(url, params).then(function(data) {
        _this.loadingShow(false)
        data = JSON.parse(data.responseText)
        let arr = data.MT_Purchase_GetSN_Resp.Header
        // 讲sn码列表数组保存到store
        _this.$store.commit('snArr', arr)
        // 计算产品数量
        _this.status1 = arr.length
        _this.turnArr(arr)
        _this.addStatus = false
      }).catch((res) => {
        alert('请求超时！')
        _this.loadingShow(false)
      })
    },
    verify() {
      let num = this.inputVal
      // 过滤误操作
      if (num.length > 22) {
        let _this = this
        for (let i in _this.snArr) {
          if (_this.snArr[i].item === null || _this.snArr[i].item === undefined) {
            if (num == _this.snArr[i].ZTIAOM) {
              _this.snArr[i].status = true
              _this.$store.commit('snArr', _this.snArr)
              _this.turnArr(_this.snArr)
              _this.status3++
              _this.status4 = _this.status2 - _this.status3
            }
          } else {
            for (let j in _this.snArr[i].item) {
              if (num == _this.snArr[i].item[j].ZTIAOMA_FB) {
                _this.snArr[i].item[j].status = true
                _this.$store.commit('snArr', _this.snArr)
                _this.turnArr(_this.snArr)
                _this.status3++
                _this.status4 = _this.status2 - _this.status3
              }
            }
          }
        }
      }
    },
    // 转化成组件table-tr-sn.vue的通用数组数据
    turnArr(arr) {
      // 临时数组
      let trArr = []
      // 用于计算应扫数量
      let num = 0
      if (arr.length >= 0) {
        for (let i in arr) {
          num++
          // 用于获取数据时的第一次添加数组属性操作
          if (this.addStatus) {
            arr[i].status = false
          }
          let temp = {}
          // 是否分包
          if (arr[i].item === null || arr[i].item === undefined) {
            temp.status = false
            temp.arr = []
            temp.arr[0] = arr[i].MATKL
            temp.arr[1] = arr[i].ZTIAOM
            temp.arr[2] = arr[i].LGOBE
            temp.arr[3] = arr[i].BUS_NO
            temp.arr[4] = parseInt(arr[i].MENGE)
            temp.arr[5] = arr[i].status
          } else {
            temp.status = true
            temp.arr = []
            temp.arr[0] = arr[i].MATKL
            let arr1 = []
            let arr2 = []
            for (let j in arr[i].item) {
              num++
              if (this.addStatus) {
                arr2.push(false)
              } else {
                arr2.push(arr[i].item[j].status)
              }
              arr1.push(arr[i].item[j].ZTIAOMA_FB)
            }
            temp.arr[1] = arr1
            temp.arr[2] = arr2
            temp.arr[3] = arr[i].BUS_NO
            temp.arr[4] = parseInt(arr[i].MENGE)
            temp.arr[5] = arr[i].status
          }
          trArr.push(temp)
        }
      }
      // 标示SN码是否扫描的状态数组
      this.setSN(trArr)
      this.status2 = num
      if (this.addStatus) {
        this.status4 = num
      }
    },
    // ifScan参数为true则筛选已扫，为false则筛选未扫
    filtrateArr(ifScan) {
      let Arr = this.sns.concat()
      function delArr(arr) {
        let gettype = Object.prototype.toString
        for (let i in arr) {
          // 如果不是分包
          if (gettype.call(arr[i].arr[1]) === '[object String]') {
            if (ifScan) {
              if (!Arr[i].arr[5]) {
                arr.splice(i, 1)
                delArr(arr)
              }
            } else {
              if (Arr[i].arr[5]) {
                arr.splice(i, 1)
                delArr(arr)
              }
            }
          } else {
            for (let j in arr[i].arr[2]) {
              if (ifScan) {
                if (!arr[i].arr[2][j]) {
                  arr[i].arr[1].splice(j, 1)
                  arr[i].arr[2].splice(j, 1)
                  delArr(arr)
                }
              } else {
                if (arr[i].arr[2][j]) {
                  arr[i].arr[1].splice(j, 1)
                  arr[i].arr[2].splice(j, 1)
                  delArr(arr)
                }
              }
            }
          }
        }
        return arr
      }
      // 将分包的空数组去除
      function reDelArr(arr) {
        for (let i in arr) {
          if (arr[i].arr[1].length === 0) {
            arr.splice(i, 1)
            reDelArr(arr)
          }
        }
        return arr
      }
      // let gettype = Object.prototype.toString
      // let trArr = []
      // 筛选已扫描
      // if (ifScan) {
      //   for (let i in Arr) {
      //     // 如果不是分包
      //     if (gettype.call(Arr[i].arr[1]) === '[object String]') {
      //       if (Arr[i].arr[5]) {
      //         trArr.push(Arr[i])
      //       }
      //     // 如果为分包
      //     } else {
      //       for (let j in Arr[i].arr[2]) {
      //         // 如果已扫
      //         // if (Arr[i].arr[2][j]) {
      //         //   if (trArr.length > 0) {
      //         //     for (let x in trArr) {
      //         //       if (trArr[x].arr[1].indexOf(Arr[i].arr[1][j]) === -1) {
      //         //         trArr.push(Arr[i])
      //         //       }
      //         //     }
      //         //   } else {
      //         //     trArr.push(Arr[i])
      //         //   }
      //         // }
      //       }
      //     }
      //   }
      // }
      this.setSN(reDelArr(delArr(Arr)))
    },
    // 检测此分包是否有分包sn码被扫描
    checkSN(Arr, str, ifScan) {
      let temp = false
      let gettype = Object.prototype.toString
      // 第一次调用函数，Arr为空数组
      if (Arr.length > 0) {
        for (let i in Arr) {
          // 该元素是否为数组
          if (gettype.call(Arr[i].arr[1]) !== '[object String]') {
            // 筛选已扫的
            if (ifScan) {
              if (Arr[i].arr[1].indexOf(str) === -1) {
                temp = true
              }
            // 筛选未扫的
            } else {
              if (Arr[i].arr[1].indexOf(str) === -1) {
                temp = true
              }
            }
          }
        }
      } else {
        temp = true
      }
      return temp
    }
  },
  directives: {
    focus: {
      inserted: function (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  created: function () {
    this.getSNList()
    this.setTableH()
    this.$store.commit('loadingShow', false)
    this.$store.commit('tableH', ['序号', '物料描述', '数量'])
  },
  mounted() {
    this.$store.commit('isOP', false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
.snList{
  .delBtn{
    position: absolute;
    top: 0.46875rem;
    right: $f40;
    width: $f20;
    height: $f20;
    background: url(../../assets/img/purchase/2_dustbin.png) no-repeat;
    background-size: 100% 100%;
  }
  .sure{
    bottom: $f20;
  }
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
  .statusBox{
    width: 9.6875rem;
    height: $f50;
    margin: 0 auto;
    background: #fff;
    border-top-left-radius: $f4;
    border-top-right-radius: $f4;
    padding-left: $f10;
    box-sizing: border-box;
    li{
      float: left;
      width: 2.03125rem;
      height: $f30;
      margin: $f10 $f10 0 0 ;
      text-align: center;
      color: #fff;
      font-size: $f14;
      line-height: $f30;
      border-radius: $f4;
      background: #b8b8b8;
    }
  }
  .snBox{
    position: relative;
    height: $f30;
    padding: 0 $f15;
    box-sizing: border-box;
    li{
      width: 3.75rem;
      float: left;
      color: #fff;
      font-size: $f18;
    }
    li:nth-child(1){
      width: 5rem;
      margin-right: $f10;
    }
    .clearInput{
      position: absolute;
      top: $f4;
      right: $f15;
      width: $f12;
      height: $f12;
      background: url(../../assets/img/purchase/6_delect.png) no-repeat;
      background-size: $f12 $f12;
    }
    input{
      position: relative;
      border-bottom: 1px solid #fff;
      display: block;
      width: 100%;
      padding: $f5 $f15 0 0;
      box-sizing: border-box;
      line-height: $f20;
      color: #fff;
      font-size: $f16;
    }
    input::-webkit-input-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input:-moz-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input::-moz-placeholder{
      color: #66ffff;
      font-size: $f16;
    } input:-ms-input-placeholder{
      color: #66ffff;
      font-size: $f16;
    }
  }
  .contain{
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 4.90625rem;
    box-sizing: border-box;
    overflow-x: hidden;
    z-index: -1;
    padding-bottom: 2.1875rem;
  }
}
@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .snList{
      .headBox{
        background: $col;
      }
      .statusBox{
        li.on:nth-child(1){
          background: $btnBgCol;
        }
        li.on:nth-child(2){
          background: #ff9600;
        }
        li.on:nth-child(3){
          background: #38ce54;
        }
        li.on:nth-child(4){
          background: #666;
        }
      }
      .snBox{
        background: $col;
      }
    }
  }
}
</style>
