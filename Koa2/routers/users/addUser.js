const router = require('koa-router')();
const uuidV1 = require('uuid/v1');
const userModel = require('../../mysql.js');
const fs = require('fs');

// 添加 用户
router.post('/addUser', async (ctx, next) => {
  let user = ctx.request.body;

  await userModel.findUser(user.u_username).then(async (res) => {
    if (res.length) { // length > 1 说明 表中有数据
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
    } else if (!user.u_username || user.u_password !== user.repeatPass) {
      ctx.body = {
        state: 0,
        msg: '密码输入错误',
        data: []
      }
    } else {  // 否者没有注册
      // if (user.u_avator) {
      //   let base64Data = user.u_avator.replace(/^data:image\/\w+;base64,/, "");
      //   let dataBuffer = new Buffer(base64Data, 'base64');
      //   let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now()
      //
      //   // 上传图片到 public/images 文件夹中
      //   await fs.writeFile('./public/images/' + getName + '.png', dataBuffer, err => {
      //       if (err) {
      //         console.log(err);
      //         return false
      //       }
      //   });
      // }
      await userModel.insetUser([uuidV1(), user.u_username, user.u_password, user.u_name, user.u_phone, user.u_sex, user.u_dep, user.u_roles, user.u_email, new Date()]).then((res) => {
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