const router = require('koa-router')();
const uuidV1 = require('uuid/v1');
let utils = require('../../utils.js')
const workModel = require('../../mysql.js');
const checkToken = require('../../token/checkToken.js');
// 审批延时 任务
router.post('/auditWork',checkToken, async (ctx, next) => {
  var auditTime;
  let work = ctx.request.body, content;
  await workModel.findProgress(work.w_id).then(async (res) => {
    if (!res.length) { // length > 1 说明 表中有数据
      try {
        throw Error('审批失败')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '审批失败',
        data: []
      }
    } else {
      auditTime = res[0].p_delaytime
      if (work.p_statu == '3') {
        content = '用户【' + work.pname + '】通过了【'+work.w_title+'】任务延迟至【'+utils.dateTime(auditTime, 'date')+'】的申请。'
      } else {
        content = '用户【' + work.pname + '】驳回了【'+work.w_title+'】任务延迟至【'+utils.dateTime(auditTime, 'date')+'】的申请。'
      }
      if (work.p_statu == '4') {
        await workModel.insetProgress([uuidV1(), content, work.p_audit, work.w_userid, work.p_statu, work.w_id, auditTime, new Date()]).then((res) => {
          if (!res.affectedRows) {
            try {
              throw Error('审批失败')
            } catch (err) {
              console.log(err)
            }
            ctx.body = {
              state: 0,
              msg: '审批失败!',
              data: []
            }
          } else {
            ctx.body = {
              state: 1,
              msg: '审批成功',
              data: []
            }
          }
        })
      } else {
        await workModel.insetProgress([uuidV1(), content, work.p_audit, work.w_userid, work.p_statu, work.w_id, auditTime, new Date()]).then((res) => {
          if (!res.affectedRows) {
            try {
              throw Error('审批失败')
            } catch (err) {
              console.log(err)
            }
            ctx.body = {
              state: 0,
              msg: '审批失败!',
              data: []
            }
          }
        })
        await workModel.updateWorkEndTime(utils.formatTime(auditTime), work.w_id).then((res) => {
          if (!res.affectedRows) {
            try {
              throw Error('审批失败')
            } catch (err) {
              console.log(err)
            }
            ctx.body = {
              state: 0,
              msg: '审批失败!',
              data: []
            }
          } else {
            console.log('2')
            ctx.body = {
              state: 1,
              msg: '审批成功',
              data: []
            }
          }
        })
      }
    }

  })

})

module.exports = router