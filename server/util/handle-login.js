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
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginnane,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: resp.resonse
        })
      } else {
        next(err)
      }
    })
})

module.exports = router