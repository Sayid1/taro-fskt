import Taro from '@tarojs/taro'

let Fly, baseURL, littleOsType, ostype, channel
const env = Taro.getEnv()

if (env === Taro.ENV_TYPE.WEAPP) {
  Fly=require("../libs/wxflyio")
  baseURL = 'https://xuexi-dev.fsstudy.com/api/'
  littleOsType = 102
  ostype = 1
  channel = -1
  
} else if (env === Taro.ENV_TYPE.WEB) {
  Fly = require("flyio/dist/npm/fly")
  baseURL = '/api/'
  littleOsType = 0
  ostype = 0
  channel = 0

}

const fly=new Fly

//添加请求拦截器
fly.interceptors.request.use((request)=>{
  //给所有请求添加自定义header
  request.headers = {
    ...request.headers,
    TOKEN: 'AB7758B8AA8E0DA2DCA6562FF83686C454123433E3C553EB',
    ostype,
    littleOsType,
    channel
  }
  request.baseURL = baseURL
  request.timeout = 10000
  //打印出请求体 get和post的参数都在body里面
  // console.log(request.body)
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        if (response.status === 200) {
          const data = JSON.parse(response.data)
          if (data.errorCode === 1) {
            return data.data
          }
          return Promise.resolve(new Error(data.data))
        }
        return Promise.resolve(new Error(response))
    },
    (err) => {
      console.log(err)
        //发生网络错误后会走到这里
        return Promise.resolve(new Error(err))
    }
)


export function get(url, data) {
  return fly.get(url, data)
}

export function post(url, data) {
  return fly.post(url, data)
}



