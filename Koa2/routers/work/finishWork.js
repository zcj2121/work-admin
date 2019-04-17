const router = require('koa-router')();
const uuidV1 = require('uuid/v1');
const workModel = require('../../mysql.js');

// 完成 任务
router.post('/finishWork', async (ctx, next) => {
  let work = ctx.request.body;
  await workModel.finishWork(work.w_id).then(async (res) => {
    if (!res.affectedRows) {
      try {
        throw Error('操作失败')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '操作失败!',
        data: []
      }
    } else {
      await workModel.insetProgress([uuidV1(), '用户【' + work.pname + '】操作完成了【'+work.w_title+'】任务', work.p_audit, work.w_userid, work.p_statu, work.w_id, new Date()],'fil').then((res) => {
        ctx.body = {
          state: 1,
          msg: '操作成功',
          data: []
        }
      })
    }
  }).catch((err) => {
    ctx.body = {
      state: 0,
      msg: err,
      data: []
    }
  })

})

module.exports = router