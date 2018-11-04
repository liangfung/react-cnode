const router = require('express').Router()
const axios = require('axios')

/**
 * login要单独处理，因为login之后要把数据存在session中，
 * 而不是跟其他接口一样直接代理到cnode api
 */
const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, { accesstoken: req.body.accessToken })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        // 如果返回正确，保存到服务器内存session中
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginnane,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({  // login的结果返回给客户端
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {  // API服务有返回，属于业务逻辑的错误
        res.json({  // 将错误返回给客户端
          success: false,
          data: resp.resonse
        })
      } else {     // 属于网络错误
        next(err)  // 将错误抛给全局的错误处理器
      }
    })
})

module.exports = router
