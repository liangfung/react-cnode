const axios = require('axios')
const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken  // 是否需要seesion token

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({  // 401 未登录
      success: false,  // 返回给客户端错误信息
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query)
  console.log(query)
  if (query.needAccessToken) delete query.needAccessToken

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: req.query,
    data: Object.assign({}, req.body, {
      accesstoken: user.accessToken
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencode'
    }
  })
    .then(resp => {
      if (resp.status === 200) {
        res.send(resp.data)
      } else {
        res.status(resp.status).send(resp.data)
      }
    })
    .catch(err => {
      if (err.response) {  // cnode API有响应，但有业务错误
        res.status(res.status).send(err.response.data)
      } else {
        res.status(500).send({  // 转发到cnode API有网络错误，node服务器报500
          success: false,
          message: '未知错误'
        })
      }
    })
}