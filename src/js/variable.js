import $ from 'n-zepto'
function Path() {
	// this.oa = 'http://10.12.0.61/api/pda/v1/userperm'
	this.oa = 'http://10.12.0.190/api/pda/v1/userperm'
	// this.oa = 'http://10.11.8.7:8081/api/pda/v1/userperm'
	// this.oa = 'http://10.12.0.54/derucci/workflow/jsp'
	// this.oa = 'http://10.11.9.220:10083/derucci/workflow/jsp'
	// this.oa = 'http://10.12.0.53:8900/derucci/workflow/jsp'
	this.local = 'http://localhost/PDA-V/static/json'
	// this.local = 'http://mangoguang.cn/PDA/static/json'
	this.sap = 'http://10.12.0.153:50100/RESTAdapter/'
	// this.sap = 'http://10.12.0.154:50100/RESTAdapter/'
	this.appTest = 'http://10.11.8.223:8081/api/v1/stocktake/'
	// this.app = 'http://10.12.0.61/api/pda/v1/stocktake/'
	this.app = 'http://10.12.0.190/api/pda/v1/stocktake/'
}
let path = new Path()
// 网页版为'web'，app版为'app'
let version = 'web'

var cloneObj = function(obj) {
	let str = obj.constructor === Array ? [] : {}
	let newobj = obj.constructor === Array ? [] : {}
	if (typeof obj !== 'object') {
		return
	} else if (window.JSON) {
		str = JSON.stringify(obj) // 系列化对象
		newobj = JSON.parse(str) // 还原
	} else {
		for (var i in obj) {
			newobj[i] = typeof obj[i] === 'object' ?
			cloneObj(obj[i]) : obj[i]
		}
	}
	return newobj
}

function VueAjax() {
	// 创建XMLHttpRequest对象（如果是IE5，IE6，则创建ActiveXObject对象）
	let xmlhttp
	if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest()
	} else {
	// code for IE6, IE5
		xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
	}

	this.post = function(url, params) {
		// let t = null
		// 用于设置请求超时
		// function connecttoFail() {
		// 	if (xmlhttp) xmlhttp.abort()
		// 	// alert('请求超时!')
		// }

		let ajax = new Promise(function(resolve, reject) {
			let sendStr = ''
			let gettype = Object.prototype.toString
			if (gettype.call(params) === '[object String]') {
				sendStr = params
			} else {
				for (let i in params) {
					sendStr = sendStr.concat(i, '=', params[i], '&')
				}
			}

			xmlhttp.open('POST', url, true)
			xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
			xmlhttp.send(sendStr)
			// t = setTimeout(connecttoFail, 8000)

			xmlhttp.onreadystatechange = function() {
				/* if(xmlhttp.readyState === 0) {
		  		console.log("请求初始化")
		  	}else if(xmlhttp.readyState === 1) {
		  		console.log("服务器链接已建立")
		  	}else if(xmlhttp.readyState === 2) {
		  		console.log("请求已接收")
		  	}else if(xmlhttp.readyState === 3) {
		  		console.log("请求处理中")
		  	}else */if (xmlhttp.readyState === 4) {
					if (xmlhttp.status === 200) {
						// clearTimeout(t)
						resolve(JSON.parse(xmlhttp.responseText))
					} else {
						reject(xmlhttp)
					}
				}
			}
		})
		return ajax
	}

	this.get = function(url, params) {
		let ajax = new Promise(function(resolve, reject) {
			if (params) {
				let sendStr = ''
				for (let i in params) {
					sendStr = sendStr.concat(i, '=', params[i], '&')
				}
				xmlhttp.open('GET', url + '?' + sendStr, true)
				xmlhttp.send()
			} else {
				xmlhttp.open('GET', url, true)
				xmlhttp.send()
			}

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState === 4) {
					if (xmlhttp.status === 200) {
						resolve(xmlhttp)
						// alert('success')
						// console.log(xmlhttp.responseText)
					} else {
						reject(xmlhttp)
					}
				}
			}
		})
		return ajax
	}
}
let V = new VueAjax()

function getFactorySel(_this) {
  // 获取本地存储默认工厂
  let factoryMsg = localStorage.getItem('factoryMsg')
  let factoryObj = eval('(' + factoryMsg + ')')
  if (factoryMsg) {
    _this.factory = factoryObj.factory
    _this.factoryNum = factoryObj.factoryNum
    _this.warehouse = factoryObj.warehouse
    _this.warehouseNum = factoryObj.warehouseNum
  } else {
    // this.factorySel = this.factorys[0].account
  }
}

function getPrintPlanMsg(_this) {
	let printPlanMsg = localStorage.getItem('printPlanMsg')
	let printPlanObj = eval('(' + printPlanMsg + ')')
	if (printPlanMsg) {
		_this.printPlanSel = printPlanObj.ZBQMC
		_this.printPlanSelNum = printPlanObj.ZBQXH
	}
}

function getaccount(_this) {
	// 获取本地存储账号信息
	let accountMsg = localStorage.getItem('accountMsg')
	if (accountMsg) {
		let obj = eval('(' + accountMsg + ')')
		_this.account = obj.account
	} else {
		console.log('没有本地存储')
	}
}

function ajax (type, url, params) {
  let data = new Promise((resolve, reject) => {
    $.ajax({
      type: type,
      url: url,
      data: params,
      dataType: 'json',
			// timeout: 300,
			// contentType: 'application/json;charset=UTF-8',
      context: $('body'),
      success: function (data) {
        resolve(data)
      },
      error: function (xhr, type) {
        reject(xhr)
      }
    })
  })
  return data
}

function setParams(obj) {
	if (version === 'web') {
		return obj
	} else {
		return {
			body: obj
		}
	}
}

let Mango = (function() {
	const localAccount = localStorage.getItem('account')
	return function() {
		// 设置本地存储
		// 本地存储在入口文件初始化initStorage方法
		let Storage = function() {}

		Storage.prototype = {
			// 初始化并获取mangoStorage
			initStorage: function(account) {
				// localStorage.removeItem('mangoStorage')
				let mangoStorage = localStorage.getItem('mangoStorage')
				if (mangoStorage) {
					mangoStorage = JSON.parse(mangoStorage)
				} else {
					// 给mangoStorage赋初值
					mangoStorage = {}
				}
				if (!mangoStorage[`mango${account}`]) {
					mangoStorage[`mango${account}`] = {}
					localStorage.setItem('mangoStorage', JSON.stringify(mangoStorage))
				}
			},
			// 获取本地存储
			getStorage: function(account) {
				return JSON.parse(localStorage.getItem('mangoStorage'))[`mango${account}`]
			},
			// 更改本地存储
			setStorage: function(account, key, val) {
				let tempStorage = JSON.parse(localStorage.getItem('mangoStorage'))
				let accountStorage = tempStorage[`mango${account}`]
				tempStorage[`mango${account}`][key] = val
				console.log('333', tempStorage)
				localStorage.setItem('mangoStorage', JSON.stringify(tempStorage))
				return this
			},
			// 获取本地缓存
			setData: function(_this, key) {
				let temp = JSON.parse(localStorage.getItem('mangoStorage'))[`mango${_this.account}`]
				console.log('sucsess', temp)
				_this[key] = temp[key]
				return this
			}
		}

		this.storage = new Storage()
		this.goIndex = function() {
			// this.$router.go(-1)
			this.$router.go(0 - parseInt(localStorage.getItem('routeIndex')))
		}
		// 获取当前日期
		this.currentTime = function() {
			let date = new Date()
			const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()]
			return `${this.turnDate(year)}-${this.turnDate(month + 1)}-${this.turnDate(day)}`
		}
		this.turnDate = function(num) {
			if (num < 10) {
				num = '0' + parseInt(num)
			}
			return num
		}
		this.setSkinCol = (_this) => {
			let temp = localStorage.getItem('account')
			let skinCol = mango.storage.getStorage(temp)['skinCol']
			if (skinCol) {
				_this.skinCol = mango.storage.getStorage(temp)['skinCol']
			} else {
				_this.skinCol = 'skinA'
				_this.$store.commit('changeSkin', 'skinA')
			}
		}
	}
}())

let mango = new Mango()
export default mango

// let Storage = (function() {
// 	// 静态私有变量
// 	const account = localStorage.getItem('account')

// 	function _storage() {
// 		// 初始化并获取mangoStorage
// 		this.init = function() {
// 			// localStorage.removeItem('mangoStorage')
// 			let mangoStorage = localStorage.getItem('mangoStorage')
// 			if (mangoStorage) {
// 				mangoStorage = JSON.parse(mangoStorage)
// 			} else {
// 				// 给mangoStorage赋初值
// 				mangoStorage = {}
// 			}
// 			if (!mangoStorage[`mango${account}`]) {
// 				mangoStorage[`mango${account}`] = {}
// 				localStorage.setItem('mangoStorage', JSON.stringify(mangoStorage))
// 			}
// 		}

// 		// 获取本地存储
// 		this.get = function() {
// 			return JSON.parse(localStorage.getItem('mangoStorage'))[`mango${account}`]
// 		}

// 		// 更改本地存储
// 		this.set = function(key, val) {
// 			let tempStorage = JSON.parse(localStorage.getItem('mangoStorage'))
// 			let accountStorage = tempStorage[`mango${account}`]
// 			tempStorage[`mango${account}`][key] = val
// 			console.log('333', tempStorage)
// 			localStorage.setItem('mangoStorage', JSON.stringify(tempStorage))
// 			return this
// 		}

// 		// 获取本地缓存
// 		this.setData = function(_this, key) {
// 			let temp = JSON.parse(localStorage.getItem('mangoStorage'))[`mango${localAccount}`]
// 			_this[key] = temp[key]
// 			return this
// 		}
// 	}

// 	return _storage
// }())
// export default new Storage()

export { path, V, cloneObj, getFactorySel, getPrintPlanMsg, getaccount, ajax, setParams, version }
