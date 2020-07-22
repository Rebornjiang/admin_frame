import axios from 'axios'
import apiPath from './index'
import AllApi from '@/api/api'
import { Loading, Message } from 'element-ui'

console.log(Loading)
const service = axios.create({
  baseURL: apiPath.baseUrl.dev,
  timeout: 5000
  // 这里还需要配置全局header
})

const Http = {}

for (const key in AllApi) {
  const curApi = AllApi[key]
  Http[key] = async function (params, config = {}, isFormData = false) {
    const { url, method } = curApi
    let newParams = null

    if (params && isFormData) {
      newParams = new FormData()

      for (const k in params) {
        newParams.append(k, params[k])
      }
    } else {
      newParams = params
    }

    let response = {}
    if (method === 'put' || method === 'patch' || method === 'post') {
      try {
        // if (newParams)
        response = await service[method](url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (method === 'delete' || method === 'get') {
      try {
        config[params] = newParams
        console.log(config[params], '是否有内容')
        response = await service[method](url, config)
      } catch (err) {
        response = err
      }
    }

    return response
  }
}

// 配置axios 拦截器

service.interceptors.request.use(config => {
  // let loadingInstance = Loading.service({})
  return config
}, err => {
  // 以服务的方式调用的 Loading 需要异步关闭
  // this.$nextTick(() => {
  // loadingInstance.close()
  // });
  // for debug
  console.log(err)
})

service.interceptors.response.use(res => {
  // this.$nextTick(() => {
  //   loadingInstance.close();
  // });
  return res.data
}, err => {
  // this.$nextTick(() => {
  //   loadingInstance.close();
  // });
  Message({
    message: err,
    type: 'error'
  })
})

export default Http
