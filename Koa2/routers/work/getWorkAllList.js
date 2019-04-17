let router = require('koa-router')();
let postsModel = require('../../mysql.js')
let utils = require('../../utils.js')
const checkToken = require('../../token/checkToken.js');

// 获取 全部任务列表
router.get('/getWorkAllList', checkToken, async (ctx, next) => {
  var count;
  let dep = '', nameid = '';
  let title= ''
  let w_userid= ''
  let statu= ''
  let starttime= ''
  let endtime=''
  let page= ctx.query.page - 1 || 0
  let size= 10000000

  await postsModel.getWorkCount(title, w_userid, dep, nameid, statu, starttime, endtime).then((res) => {
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

  await postsModel.getWorkList(title, w_userid, dep, nameid, statu, starttime, endtime, page, size).then((res) => {
    var result = [];
    var obj = {};
    for(var i =0; i<res.length; i++){
      if(!obj[res[i].w_id]){
        result.push(res[i]);
        obj[res[i].w_id] = true;
      }
    }

    for (let j =0; j<result.length; j++) {
      let arr = []
      let resultChild = result[j]
      for(var i =0; i<res.length; i++){
        let resChild = res[i]
        if (resChild.w_id == resultChild.w_id) {
          arr.push({
            p_id: resChild.p_id,
            p_content: resChild.p_content,
            p_time: parseInt((new Date(resChild.p_time)).getTime()),
            p_nameid: resChild.p_nameid,
            p_operator: resChild.p_operator,
            p_audit: resChild.p_audit,
            p_isaudit: resChild.p_isaudit,
            p_statu: resChild.p_statu,
            p_workid: resChild.p_workid
          })
        }
      }
      if (!arr[0].p_id){
        resultChild.list = []
      } else {
        resultChild.list = arr
      }
      (resultChild.list.sort(utils.compareTime('p_time'))).reverse();
    }
    result.sort(!utils.compare('w_createtime'));
    ctx.body = {
      state: 1,
      msg: '任务列表获取成功',
      data: {
        list: result,
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

})

module.exports = router