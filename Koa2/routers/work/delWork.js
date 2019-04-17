const router = require('koa-router')();
const workModel = require('../../mysql.js');

// 删除 任务
router.get('/delWork', async (ctx, next) => {
  let id = ctx.request.query.w_id;
  await workModel.delWork(id).then(async (res) => {
    if (!res.affectedRows) {
      try {
        throw Error('删除失败')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '删除失败!',
        data: []
      }
    } else {
      await workModel.delProgress(id).then((res) => {
        ctx.body = {
          state: 1,
          msg: '删除成功',
          data: []
        }
      })
    }
  })

})

module.exports = router