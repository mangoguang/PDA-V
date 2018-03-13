<template>
	<div class="sureBoxContain">
		<div class="sureBox">
			<div class="top">
			  <p>{{outinType}}数量少于计划{{outinType}}数量，是否继续{{outinType}}？</p>
			</div>
			<div class="bottom clearfix">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
  export default {
		name: 'SureBox',
		data () {
			return {

			}
		},
		computed: {
			outinType() {
				return this.$store.state.outinType
			}
		},
		mounted() {

		}
  }
</script>
<style scoped lang="scss">
@import "./../assets/sass/variable.scss";
@import "./../assets/css/common.css";

.sureBoxContain{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.5);
	z-index: 100;
}
.sureBox{
	position: absolute;
	width: 7rem;
	background: #fff;
	left: 50%;
	top: 50%;
	margin: -1.5rem 0 0 -3.25rem;
	.top{
		width: 100%;
		padding: $f20 $f10;
		box-sizing: border-box;
		line-height: 2em;
		p{
			width: 100%;
		}
	}
	button{
		width: 50%;
		height: $f40;
		padding: 0;
		float: left;
		border-radius: 0;
		color: #fff;
	}
	button:first-child{
		border-right: 1px solid #fff;
		box-sizing: border-box;
	}
}

@each $skin, $col, $subCol, $strongCol, $btnBgCol, $btnBgSubCol in $skin-data {
  .#{$skin} {
  	.sureBox{
  		button{
  			background: $btnBgCol;
  		}
  	}
  }
}
</style>
