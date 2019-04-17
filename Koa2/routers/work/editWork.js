const router = require('koa-router')();
const uuidV1 = require('uuid/v1');
const workModel = require('../../mysql.js');

// 修改 任务
router.post('/editWork', async (ctx, next) => {
  let work = ctx.request.body
  await workModel.findWork(work.w_title, work.w_starttime).then(async (res) => {
    if (!res.length) { // length > 1 说明 表中有数据
      await workModel.insetProgress([uuidV1(), work.progress,'', work.userid, '1', work.w_id, new Date()],'fil').then((res) => {
        if (!res.affectedRows) {
          try {
            throw Error('修改失败')
          } catch (err) {
            console.log(err)
          }
          ctx.body = {
            state: 0,
            msg: '修改失败!',
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
      await workModel.updateWork([work.w_title, work.w_content, work.w_source, work.userid, new Date(work.w_starttime), new Date(work.w_endtime), work.w_statu, work.w_operator, work.w_operator_name, work.w_id]).then((res) => {
        if (!res.affectedRows) {
          workModel.delProgressFirst(work.userid, work.w_id).then((res) => {
          }).catch((err) => {
          })
          try {
            throw Error('修改失败')
          } catch (err) {
            console.log(err)
          }
          ctx.body = {
            state: 0,
            msg: '修改失败!',
            data: []
          }
        } else {
          ctx.body = {
            state: 1,
            msg: '修改成功',
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

    } else {
      for (let val of res) {
        if (val.w_id != user.w_id) {
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
          await workModel.insetProgress([uuidV1(), work.progress,'', work.userid, '1', work.w_id, new Date()],'fil').then((res) => {
            if (!res.affectedRows) {
              try {
                throw Error('修改失败')
              } catch (err) {
                console.log(err)
              }
              ctx.body = {
                state: 0,
                msg: '修改失败!',
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
          await workModel.updateWork([work.w_title, work.w_content, work.w_source, work.userid, new Date(work.w_starttime), new Date(work.w_endtime), work.w_statu, work.w_operator, work.w_operator_name, work.w_id]).then((res) => {
            if (!res.affectedRows) {
              workModel.delProgressFirst(work.userid, work.w_id).then((res) => {
              }).catch((err) => {
              })
              try {
                throw Error('修改失败')
              } catch (err) {
                console.log(err)
              }
              ctx.body = {
                state: 0,
                msg: '修改失败!',
                data: []
              }
            } else {
              ctx.body = {
                state: 1,
                msg: '修改成功',
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
        }
      }
    }

  })
})

module.exports = router