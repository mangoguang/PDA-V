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
      <table border="1">
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
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {path, ajax, getaccount, version} from '../../js/variable.js'
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
      factoryVal: '',
      warehouseVal: '',
      tableHList: ['序号', 'SN', '状态'],
      snList: [
        ['12312423415243515', '='],
        ['1231242341524351543123124234152435154', '='],
        ['12312423415243515431231242341524351543', '=']
      ],
      material: '',
      materialShow: false,
      account: '',
      name: localStorage.getItem('name'),
      key: true,
      pandianType: '通盘',
      type: null,
      sn: '',
      tipShow: false
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
    this.checkOpen()
    // getFactorySel(this)
  },
  updated() {
    console.log(this.snList)
  },
  mounted() {
    this.setData()
    // localStorage.removeItem('settingData')
    getaccount(this)
    this.loadingShow(false)
    if (!localStorage.getItem('settingData')) {
      console.log(localStorage.getItem('settingData'))
      alert('请先设置盘点参数。')
      this.toSetting()
    }
  },
  methods: {
    loadingShow: function(x) {
      this.$store.commit('loadingShow', x)
    },
    toSetting() {
      this.$router.push({path: '/checkSetting'})
    },
    test() {
      // this.sn = '111111'
    },
    // 显示条码详情
    showSNDetail(index) {
      alert(index)
    },
    // 关闭弹框
    closeAlert() {
      this.materialShow = false
      this.clearHeadBottInput()
    },
    closeTip() {
      this.tipShow = false
    },
    setData() {
      let temp = localStorage.getItem('settingData')
      if (temp) {
        this.type = JSON.parse(temp).typeVal
        this.factoryVal = JSON.parse(temp).factoryVal
        this.warehouseVal = JSON.parse(temp).warehouseVal
      }
    },
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
      }
      console.log(this.snList)
    },
    // 教验条码
    verify(sn) {
      let [_this, url, len, params] = [
        this,
        path.app + 'scan',
        sn.length, {
          type: this.type,
          factory: this.factoryVal,
          wareHouse: this.warehouseVal,
          sn: sn,
          account: this.account,
          name: this.name
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
        factory: this.factoryVal,
        wareHouse: this.warehouseVal,
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
