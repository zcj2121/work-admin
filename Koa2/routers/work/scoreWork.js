const router = require('koa-router')();
const uuidV1 = require('uuid/v1');
const workModel = require('../../mysql.js');

// 任务 打分
router.post('/scoreWork', async (ctx, next) => {
  let work = ctx.request.body
  let w_score_sum = parseFloat(work.w_score_qua) * 0.3 + parseFloat(work.w_score_time) * 0.7;
  await workModel.updateWork([work.w_score_qua, work.w_score_time, w_score_sum, '4', work.w_id],'fil').then(async (res) => {
    if (!res.affectedRows) {
      try {
        throw Error('打分失败')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '打分失败!',
        data: []
      }
    } else {
      await workModel.insetProgress([uuidV1(), '用户【' + work.pname + '】为【'+work.w_title+'】任务进行了评分', work.p_audit, work.w_userid, work.p_statu, work.w_id, new Date()],'fil').then((res) => {
        ctx.body = {
          state: 1,
          msg: '打分成功',
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