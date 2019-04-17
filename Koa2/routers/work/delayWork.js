const router = require('koa-router')();
const uuidV1 = require('uuid/v1');
const workModel = require('../../mysql.js');
const checkToken = require('../../token/checkToken.js');
// 申请延时 任务
router.post('/delayWork',checkToken, async (ctx, next) => {
  let work = ctx.request.body;

  await workModel.insetProgress([uuidV1(), work.p_content, work.p_audit, work.w_userid, '1', work.w_id, work.p_delaytime, new Date()]).then((res) => {
    if (!res.affectedRows) {
      try {
        throw Error('申请失败')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '申请失败!',
        data: []
      }
    }  else {
      ctx.body = {
        state: 1,
        msg: '申请成功',
        data: []
      }
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