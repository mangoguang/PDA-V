function Path() {
	this.oa = 'http://10.12.0.53:8900/derucci/workflow/jsp'
	this.local = 'http://localhost/PDA-V/static/json'
	// this.local = 'http://mangoguang.cn/PDA/static/json'
	this.sap = 'http://10.12.0.154:50100/RESTAdapter/'
}
let path = new Path()

var cloneObj = function(obj) {
    let str = obj.constructor === Array ? [] : {}
    let newobj = obj.constructor === Array ? [] : {ß}
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

export { path, V, cloneObj }
