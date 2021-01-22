import http from './http'

const serve = { 
  // 用户注册
  register(data) {
    return http('/blog/register',{
      method: "post",
      data
    })
  },
  // 用户登录
  login(data) {
    return http('/blog/login',{
      method: "post",
      data
    })
  },
  // 获取文章列表
  article(data) {
    return http('/blog/article',{
      method: "post",
      data
    })
  },
  // 删除文章
  delete(data) {
    return http('/blog/delete',{
      method: "post",
      data
    })
  },
  // 文章详情
  detail(data) {
    return http('/blog/detail',{
      method: "post",
      data
    })
  },
  // 发布文章
  put(data) {
    return http('/blog/put',{
      method: "post",
      data
    })
  }
}

export default serve