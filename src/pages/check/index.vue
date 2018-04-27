<!-- <keep-alive> -->
<template>
  <div class="check" v-bind:style="{height: height - 25 +'px'}">
    <div class="h25"></div>
    <div class="header">
      <div class="headBox">
        <HeadComponent :settingShow="true">
          <h1 @click="test">盘点({{pandianType}})</h1>
          <SetIcon @click.native="toSetting"></SetIcon>
          <HeadBott ref="headBott" @verify="verify" class="headBott">
            <p>已扫：<span>{{snList.length}}</span></p>
          </HeadBott>
        </HeadComponent>
      </div>
    </div>
    <div class="tableBox">
      <table border="0" rules="none" frame="void">
        <TableH :list=tableHList></TableH>
        <TableD
        v-for="(arr, index) in snList.slice(0, 100)" 
        :index=index 
        :arr=arr 
        :key="arr[0]"
        @click.native="showSNDetail(index)"></TableD>
      </table>
    </div>
    <Alert v-show="materialShow" @closeAlert="closeAlert">
      <p>条码不存在</p>
      <p>请输入物料号进行确认。</p>
      <div class="materialBox" slot="mid">
        <label>物料号</label>
        <input v-model="material" ref="materialInput" type="text">
      </div>
      <button @click="sendMaterial" slot="btn">确认</button>
    </Alert>
    <Alert class="tip" v-if="tipShow" @closeAlert="closeTip">
      <img src="" alt="">
      <p>本月盘点暂未开放</p>
      <p>请联系流程信息部相关人员</p>
    </Alert>
    <Alert class="factoryAlert" v-if="factoryAlertShow" @closeAlert="closeFactoryAlert">
      <p>该条码【{{sn}}】所在的工厂【{{oldFactoryVal}}】仓库【{{oldWareHouseVal}}】与你选择的工厂【{{factoryNum}}】仓库【{{warehouseNum}}】不一致，是否继续录入？</p>
      <button class="half" @click="verify(sn, 1)" slot="btn">确认</button>
      <button class="half" @click="closeFactoryAlert" slot="btn">取消</button>
    </Alert>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import mango, {path, ajax, getFactorySel, getaccount, version} from '../../js/variable.js'
import HeadComponent from '../../components/check/header'
import SetIcon from '../../components/check/setIcon'
import HeadBott from '../../components/check/headBott'
import TableH from '../../components/common/table-h'
import TableD from '../../components/common/table-d'
import Btn from '../../components/btn'
import Alert from '../../components/common/alert'
// import {pathOA} from '../../js/variable.js'
Vue.use(VueRouter)
Vue.use(Vuex)

export default {
  name: 'Check',
  components: {HeadComponent, Btn, SetIcon, HeadBott, TableH, TableD, Alert},
  data () {
    return {
      height: document.documentElement.clientHeight,
      numLength: 0,
      canVerify: true,
      factoryNum: '',
      warehouseNum: '',
      oldFactoryVal: '',
      oldWareHouseVal: '',
      tableHList: ['序号', 'SN', '状态'],
      snList: [],
      material: '',
      materialShow: false,
      account: '',
      name: localStorage.getItem('name'),
      key: true,
      pandianType: '',
      type: null,
      sn: '',
      tipShow: false,
      factoryAlertShow: false
    }
  },
  computed: {
    // inputVal() {
    //   return this.$store.state.inputVal
    // }
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

  created() {
    // this.PDType = storage.getStorage(11608050)[`mango11608050`].PDType
    // let temp = localStorage.getItem('settingData')
    // if (!temp) {
    //   this.PDType = 0
    //   mango.setLocalData('PDType', 0)
    // } else {
    //   // alert(`12334${JSON.parse(temp).PDType}`)
    //   this.PDType = JSON.parse(temp).PDType
    // }
    this.checkOpen()
    getFactorySel(this)
  },
  updated() {

  },
  watch: {
    'type': function() {
      if (parseInt(this.type) === 1) {
        this.pandianType = '精盘'
      } else {
        this.pandianType = '通盘'
      }
    }
  },
  mounted() {
    this.setData()
    getaccount(this)
    this.loadingShow(false)
    // 设置默认盘点模式
    let PDType = mango.storage.getStorage(this.account)['PDType']
    if (!PDType) {
      this.type = 0
      mango.storage.setStorage(this.account, 'PDType', 0)
    } else {
      this.type = PDType
    }
  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    toSetting() {
      this.$router.push({path: '/setting'})
    },
    test() {
      // this.sn = '111111'
    },
    // 显示条码详情
    showSNDetail(index) {
      // alert(index)
    },
    // 关闭弹框
    closeAlert() {
      this.materialShow = false
      this.clearHeadBottInput()
    },
    closeTip() {
      this.tipShow = false
    },
    closeFactoryAlert() {
      this.factoryAlertShow = false
    },

    // 设置仓库、工厂、盘点方式
    setData() {
      let temp = localStorage.getItem('settingData')
      if (temp) {
        this.type = parseInt(JSON.parse(temp).typeVal) ? 1 : 0
        console.log(666, parseInt(JSON.parse(temp).typeVal))
        // this.factoryVal = JSON.parse(temp).factoryVal
        // this.warehouseVal = JSON.parse(temp).warehouseVal
      }
    },

    // 检测是否开放盘点
    checkOpen() {
      this.$ajax.get(path.app + 'checkopen').then(function(res) {
        console.log(res)
      }).catch(function(err) {
        console.log(err)
      })
    },

    // 添加条码
    addLi(data, sn, _this) {
      switch (data.code) {
        case 0:
          _this.snList.unshift([sn, '='])
          this.factoryAlertShow = false
          this.clearHeadBottInput()
          break
        case 1:
          const temp = data.info
          alert(`条码重复扫描，扫描人：${temp.name}，工号：${temp.account}，条码：${temp.sn}，入库工厂/仓库：${temp.factory}/${temp.wareHouse}`)
          this.clearHeadBottInput()
          break
        case 2:
          _this.sn = sn
          _this.materialShow = true
          this.clearHeadBottInput()
          break
        case 3:
          alert(data.msg)
          this.clearHeadBottInput()
          break
        case 4:
          this.oldFactoryVal = data.info.factory
          this.oldWareHouseVal = data.info.wareHouse
          this.factoryAlertShow = true
          this.clearHeadBottInput()
          break
        default:
          alert(`scan接口code字段返回异常。`)
      }
      console.log(this.snList)
    },

    // 教验条码
    verify(sn, ifOK) {
      // type为true时仓库不同可以提交
      let [_this, url, len, params] = [
        this,
        path.app + 'scan',
        sn.length, {
          type: this.type,
          factory: this.factoryNum,
          wareHouse: this.warehouseNum,
          sn: sn,
          account: this.account,
          name: this.name,
          ok: ifOK
        }
      ]
      if (len < 6 || len > 40) {
        alert('请检查条码是否正确！')
        return
      }
      this.sn = sn
      this.loadingShow(true)
      // 给提交时间上锁
      if (this.key) {
        this.key = false
        if (sn === '') {
          return
        }
        this.$ajax.post(url, params).then(function(res) {
          let data = res.data
          _this.key = true
          _this.loadingShow(false)
          Vue.nextTick(function () {
            _this.$refs.materialInput.focus()
          })
          // 添加条码到列表
          _this.addLi(data, sn, _this)
        }).catch(function(err) {
          console.log(err)
          _this.key = true
        })
      }
    },

    // 输入物料号
    sendMaterial() {
      let [_this, url] = [
        this,
        path.app + 'material'
      ]
      // if (len < 6 || len > 40) {
      //   alert('请检查条码是否正确！')
      //   return
      // }
      let params = {
        type: this.type,
        factory: this.factoryNum,
        wareHouse: this.warehouseNum,
        sn: this.sn,
        account: this.account,
        name: this.name,
        material: this.material
      }
      _this.loadingShow(true)
      // 给提交时间上锁
      if (this.key) {
        this.key = false
        if (this.material === '') {
          return
        }
        this.$ajax.post(url, params).then(function(res) {
          let data = res.data
          _this.key = true
          _this.loadingShow(false)
          _this.material = ''
          _this.materialShow = false
          // 添加条码到列表
          _this.addLi(data, _this.sn, _this)
        }).catch(function() {
          _this.materialShow = false
          _this.key = true
        })
      }
    },
    clearHeadBottInput() {
      // 触发子组件headBott清空数入框的方法。
      this.$refs.headBott.$emit('clearInput')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/sass/variable.scss";
.check{
  .headBox{
    padding-bottom: .5rem;
  }
  input{
    display: block;
    width: 60%;
    height: $f20;
    margin: auto;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    font-size: $f16;
    text-align: center;
  }
  button.clearBtn{
    position: absolute;
    top: $f10;
    right: 20%;
    width: $f12;
    height: $f12;
    background: url(../../assets/img/purchase/6_delect.png) no-repeat;
    background-size: 100% 100%;
  }
  .headBott span{
    display: inline;
    color: #ff9600;
  }
  .materialBox{
    display: flex;
    justify-content: flex-start;
    padding: $f10 0;
    label{
      width: 30%;
      font-size: $f14;
    }
    input{
      width: 60%;
      color: #666;
      margin: 0;
      text-align: left;
      border-bottom: 1px solid #666;
    }
  }
  .factoryAlert{
    button.half{
      width: 50%;
    }
    p{
      padding: $f20 $f10 $f15 $f10;
    }
  }
  input::-webkit-input-placeholder {
    color: #fff;
    text-align: center;
  } input:-moz-placeholder{
    color: #fff;
    text-align: center;
  } input::-moz-placeholder{
    color: #fff;
    text-align: center;
  } input:-ms-input-placeholder{
    color: #fff;
    text-align: center;
  }
  .snList{
    li{
      height: 0.9375rem;
      line-height: 0.9375rem;
      font-size: 14px;
      color: #666;
      padding-left: .5rem;
      border-bottom: 1px solid #e1e1e1;
    }
  }
  .tableBox{
    width: 10rem;
    overflow: scroll;
  }
  .tip{
    img{
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      background: url(../../assets/img/forbid.png) no-repeat;
      background-size: 100% 100%;
      margin: 0 auto $f15 auto;
    }
    p:last-child{
      padding-bottom: $f20;
    }
  }
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
    .check{
      .headBox{
        background: $col;
      }
    }
  }
}
</style>
