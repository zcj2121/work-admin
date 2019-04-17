let router = require('koa-router')();
let postsModel = require('../../mysql.js')

// 获取 用户列表
router.get('/getUserList', async (ctx, next) => {
  var name = ctx.query.name || ''
  var dep = ctx.query.u_dep || ''
  var page = ctx.query.page - 1 || 0
  var size = ctx.query.size || 10
  var isdepuser = ctx.query.isDepUser || ''
  var count;
  await postsModel.getUserList(name, dep).then((res) => {
    if (res.length) {
      count = res[0]['COUNT(*)'];
    }
  }).catch((err) => {
    ctx.body = {
      state: 0,
      msg: err,
      data: []
    }
  })
  if (!isdepuser) {
    await postsModel.getUserList(name, dep, page, size).then((res) => {
      ctx.body = {
        state: 1,
        msg: '用户列表获取成功',
        data: {
          list: res,
          count: count
        }
      }
    }).catch((err) => {
      ctx.body = {
        state: 0,
        msg: err,
        data: []
      }
    })
  } else {
    await postsModel.getUserList('', dep, 0, 10000).then((res) => {
      ctx.body = {
        state: 1,
        msg: '用户列表获取成功',
        data: {
          list: res,
          count: count
        }
      }
    }).catch((err) => {
      ctx.body = {
        state: 0,
        msg: err,
        data: []
      }
    })
  }


})

module.exports = router