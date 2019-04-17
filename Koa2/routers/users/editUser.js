const router = require('koa-router')();
const userModel = require('../../mysql.js');
const fs = require('fs');

// 修改 用户
router.post('/editUser', async (ctx, next) => {
  let user = ctx.request.body
  await userModel.findUser(user.u_username).then(async (res) => {
    if (!res.length) {
      await userModel.updateUser([user.u_username, user.u_name, user.u_phone, user.u_sex, user.u_dep, user.u_roles, user.u_email, user.u_id]).then((res) => {
        console.log(res)
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
        if (val.u_id != user.u_id) {
          try {
            throw Error('用户已存在')
          } catch (err) {
            console.log(err)
          }
          ctx.body = {
            state: 0,
            msg: '用户已存在!',
            data: []
          }
        } else {
          await userModel.updateUser([user.u_username, user.u_name, user.u_phone, user.u_sex, user.u_dep, user.u_roles, user.u_email, user.u_id]).then((res) => {
            console.log(res)
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
      // if (user.u_avator) {
      //   let base64Data = user.u_avator.replace(/^data:image\/\w+;base64,/, "");
      //   let dataBuffer = new Buffer(base64Data, 'base64');
      //   let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now()
      //
      //   // 上传图片到 public/images 文件夹中
      //   await fs.writeFile('./public/images/' + getName + '.png', dataBuffer, err => {
      //     if (err) {
      //       console.log(err);
      //       return false
      //     }
      //   });
      // }

    }
  })

})

module.exports = router