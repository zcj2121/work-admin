const router = require('koa-router')();
const uuidV1 = require('uuid/v1');
const workModel = require('../../mysql.js');
const checkToken = require('../../token/checkToken.js');

// 添加 任务
router.post('/addWork', checkToken, async (ctx, next) => {
  let work = ctx.request.body;
  await workModel.findWork(work.w_title, work.w_starttime).then(async (res) => {
    if (res.length) { // length > 1 说明 表中有数据
      try {
        throw Error('已存在相同时间点的同一个任务')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '已存在相同时间点的同一个任务!',
        data: []
      }
    } else {
      await workModel.insetWork([uuidV1(), work.w_title, work.w_content, work.w_source, work.userid, new Date(work.w_starttime), new Date(work.w_endtime), '1', work.w_operator, work.w_operator_name, new Date()]).then((res) => {
        ctx.body = {
          state: 1,
          msg: '添加成功',
          data: []
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

})

module.exports = router