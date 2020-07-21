/*
  此处加载所有的请求方法,
  注意点:
1.此处需要避免api重名，
*/
import login from './login'

const ALL_API_REQUEST = {
  ...login
}

export default ALL_API_REQUEST

