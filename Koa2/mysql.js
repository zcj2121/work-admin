const mysql = require('mysql');
const utils = require('./utils');
const config = require('./config.js');

var pool = mysql.createPool(config.mysql);

const query = function (sql, val) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, val, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
          connection.release();
        })
      }
    })
  })
}

// 更改 任务表 超时 状态
const setIntWrok = () => {
  query(`UPDATE work SET w_statu='2' WHERE w_endtime< '${utils.formatTime(new Date())}' AND w_statu='1'`, []).then((res) => {
  }).catch((err) => {
  })
}

// 定时执行
setInterval(function () {
  setIntWrok()
}, 1000*30)

const insetUser = (val) => { // 注册
  let _sql = `INSERT INTO users (u_id, u_username, u_password, u_name, u_phone, u_sex, u_dep, u_roles, u_email, u_createtime) VALUES (?,?,?,?,?,?,?,?,?,?)`
  return query(_sql, val)
}

const findUser = (name,id) => { // 查找所有User
  let _sql= `SELECT * FROM users WHERE u_username = '${name}'`
  if (id) {
    _sql+= ` AND u_id = '${id}'`
  }
  return query(_sql)
}

const findUserId = (val) => { // 根据 id 获取个人信息
  let _sql = `SELECT * FROM users WHERE u_id = '${val}'`
  return query(_sql)
}

const updateUser = (val) => { // 修改 个人信息
  let _sql = `UPDATE users SET u_username=?, u_name=?, u_phone=?, u_sex=?, u_dep=?, u_roles=?, u_email=? WHERE u_id=?`
  return query(_sql, val)
}

const resetUser = (id, pwd) => { // 重置 用户密码
  let _sql = `UPDATE users SET u_password='${pwd ? pwd : 'e10adc3949ba59abbe56e057f20f883e'}' WHERE u_id='${id}'`
  return query(_sql)
}

const delUser = (val) => { // 删除 个人信息
  let _sql = `DELETE FROM users WHERE u_id = '${val}'`
  return query(_sql)
}

const getUserInfo = (val) => { // 获取 个人信息
  let _sql = `SELECT * FROM users WHERE u_username = '${val}'`
  return query(_sql)
}

const getUserList = (name, dep, page, size) => { // 查找所有 用户
  if (size || page) {
    _sql = `SELECT * FROM users WHERE 1=1 ${ name ? "AND u_name LIKE '%"+name+"%' " : ' '} ${dep ? "AND u_dep="+dep+"" : ' '}  ORDER BY u_createtime DESC limit ${page * size} , ${size}`
  } else {
    _sql = `SELECT COUNT(*) FROM users where 1=1 ${ name ? "AND u_name LIKE '%"+name+"%' " : ' '} ${dep ? "AND u_dep="+dep+"" : ' '}`
  }
  return query(_sql)
}

const insetWork = (val) => { // 添加 任务
  let _sql = `INSERT INTO work (w_id, w_title, w_content, w_source, w_userid, w_starttime, w_endtime, w_statu, w_operator, w_operator_name, w_createtime) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  return query(_sql, val)
}

const delWork = (val) => { // 删除 任务
  let _sql = `DELETE FROM work WHERE w_id = '${val}'`
  return query(_sql)
}

const updateWork = (val, fil) => { // 修改 任务
  let _sql;
  if (fil) {
    _sql = `UPDATE work SET w_score_qua=?, w_score_time=?, w_score_sum=?, w_statu=? WHERE w_id=?`
  } else {
    _sql = `UPDATE work SET w_title=?, w_content=?, w_source=?, w_userid=?, w_starttime=?, w_endtime=?, w_statu=?, w_operator=?, w_operator_name=? WHERE w_id=?`
  }
  return query(_sql, val)
}

const updateWorkEndTime = (time, id) => { // 修改 延时审批通过 任务
  let _sql = `UPDATE work SET w_endtime='${time}' WHERE w_id='${id}'`
  return query(_sql)
}

const finishWork = (val) => { // 完成 任务
  let _sql = `UPDATE work SET w_statu='3' WHERE w_id = '${val}'`
  return query(_sql, val)
}

const findWork = (name, time, id) => { // 查找所有 任务
  let _sql= `SELECT * FROM work WHERE w_starttime = '${time}' AND w_title = '${name}'`
  if (id) {
    _sql+= ` AND w_id = '${id}'`
  }
  return query(_sql)
}

const getWorkCount = (title, name, dep, nameid, statu, starttime, endtime) => { // 获取所有项目 条数
  if (starttime && endtime) {
    _sql = `SELECT COUNT(*) FROM work where 1=1 ${ title ? "AND w_title LIKE '%"+title+"%' " : ' '} ${ name ? "AND w_name LIKE '%"+name+"%' " : ' '} ${statu ? "AND w_statu='"+statu+"'" : ' '} ${dep ? "AND u_dep='"+dep+"'" : ' '} ${nameid ? "AND u_id='"+nameid+"'" : ' '} AND w_starttime between '${starttime}' and '${endtime}'`
  } else if (!starttime && endtime) {
    _sql = `SELECT COUNT(*) FROM work where 1=1 ${ title ? "AND w_title LIKE '%"+title+"%' " : ' '} ${ name ? "AND w_name LIKE '%"+name+"%' " : ' '} ${statu ? "AND w_statu='"+statu+"'" : ' '} ${dep ? "AND u_dep='"+dep+"'" : ' '} ${nameid ? "AND u_id='"+nameid+"'" : ' '} AND w_starttime< '${endtime}'`
  } else if (starttime && !endtime) {
    _sql = `SELECT COUNT(*) FROM work where 1=1 ${ title ? "AND w_title LIKE '%"+title+"%' " : ' '} ${ name ? "AND w_name LIKE '%"+name+"%' " : ' '} ${statu ? "AND w_statu='"+statu+"'" : ' '} ${dep ? "AND u_dep='"+dep+"'" : ' '} ${nameid ? "AND u_id='"+nameid+"'" : ' '} AND w_starttime> '${starttime}'`
  } else {
    _sql = `SELECT COUNT(*) FROM work where 1=1 ${ title ? "AND w_title LIKE '%"+title+"%' " : ' '} ${ name ? "AND w_name LIKE '%"+name+"%' " : ' '} ${statu ? "AND w_statu='"+statu+"'" : ' '} ${dep ? "AND u_dep='"+dep+"'" : ' '} ${nameid ? "AND u_id='"+nameid+"'" : ' '}`
  }
  return query(_sql)
}

const getWorkList = (title, name, dep, nameid, statu, starttime, endtime) => { // 获取所有项目
  // let _sql = `SELECT * FROM work T_work LEFT JOIN progress T_progress ON T_progress.p_workid = T_work.w_id WHERE 1=1 ${ title ? "and w_title LIKE '%"+title+"%' " : ' '} ${statu ? "AND w_statu="+statu+"" : ' '} ${dep ? "AND w_dep="+dep+"" : ' '} ${nameid ? "AND w_nameid="+nameid+"" : ' '} ORDER BY w_createtime DESC limit ${page * size} , ${size}`
    if (starttime && endtime) {
      _sql = `SELECT * FROM work T_work LEFT JOIN progress T_progress ON T_progress.p_workid = T_work.w_id LEFT JOIN users T_users ON T_work.w_userid = T_users.u_id WHERE 1=1 ${ title ? "AND w_title LIKE '%"+title+"%' " : ' '} ${ name ? "AND w_userid LIKE '%"+name+"%' " : ' '} ${statu ? "AND w_statu='"+statu+"'" : ' '} ${dep ? "AND u_dep='"+dep+"'" : ' '} ${nameid ? "AND u_id='"+nameid+"'" : ' '} AND w_starttime between '${starttime}' and '${endtime}' ORDER BY w_createtime DESC`
    } else if (!starttime && endtime) {
      _sql = `SELECT * FROM work T_work LEFT JOIN progress T_progress ON T_progress.p_workid = T_work.w_id LEFT JOIN users T_users ON T_work.w_userid = T_users.u_id WHERE 1=1 ${ title ? "AND w_title LIKE '%"+title+"%' " : ' '} ${ name ? "AND w_userid LIKE '%"+name+"%' " : ' '} ${statu ? "AND w_statu='"+statu+"'" : ' '} ${dep ? "AND u_dep='"+dep+"'" : ' '} ${nameid ? "AND u_id='"+nameid+"'" : ' '} AND w_starttime< '${endtime}' ORDER BY w_createtime DESC`
    } else if (starttime && !endtime) {
      _sql = `SELECT * FROM work T_work LEFT JOIN progress T_progress ON T_progress.p_workid = T_work.w_id LEFT JOIN users T_users ON T_work.w_userid = T_users.u_id WHERE 1=1 ${ title ? "AND w_title LIKE '%"+title+"%' " : ' '} ${ name ? "AND w_userid LIKE '%"+name+"%' " : ' '} ${statu ? "AND w_statu='"+statu+"'" : ' '} ${dep ? "AND u_dep='"+dep+"'" : ' '} ${nameid ? "AND u_id='"+nameid+"'" : ' '} AND w_starttime> '${starttime}' ORDER BY w_createtime DESC`
    } else {
      _sql = `SELECT * FROM work T_work LEFT JOIN progress T_progress ON T_progress.p_workid = T_work.w_id LEFT JOIN users T_users ON T_work.w_userid = T_users.u_id WHERE 1=1 ${ title ? "AND w_title LIKE '%"+title+"%' " : ' '} ${ name ? "AND w_userid LIKE '%"+name+"%' " : ' '} ${statu ? "AND w_statu='"+statu+"'" : ' '} ${dep ? "AND u_dep='"+dep+"'" : ' '} ${nameid ? "AND u_id='"+nameid+"'" : ' '} ORDER BY w_createtime DESC`
    }
  return query(_sql)
}

const insetProgress = (val, fil) => { // 添加 流程
  let _sql;
  if (fil) {
    _sql = `INSERT INTO progress (p_id, p_content, p_audit, p_nameid, p_statu, p_workid, p_time) VALUES (?,?,?,?,?,?,?)`

  } else {
    _sql = `INSERT INTO progress (p_id, p_content, p_audit, p_nameid, p_statu, p_workid, p_delaytime, p_time) VALUES (?,?,?,?,?,?,?,?)`
  }
  return query(_sql, val)
}

const delProgress = (workid) => { // 删除 任务相关流程
  let _sql = `delete from progress where p_workid='${workid}'`
  return query(_sql)
}

const delProgressFirst = (nameid, workid) => { // 按照条件 去掉最新一条 流程
  let _sql = `delete from progress where p_nameid='${nameid}' and p_workid='${workid}' order by p_time DESC limit 1`
  return query(_sql)
}

const findProgress = (id) => { // 查找 流程
  let _sql= `SELECT * FROM progress WHERE p_workid = '${id}' ORDER BY p_time DESC limit 1`
  return query(_sql)
}

module.exports =  {
  delUser,
  findUser,
  insetUser,
  resetUser,
  findUserId,
  updateUser,
  getUserInfo,
  getUserList,

  delWork,
  findWork,
  insetWork,
  updateWork,
  finishWork,
  getWorkCount,
  getWorkList,
  updateWorkEndTime,

  findProgress,
  insetProgress,
  delProgress,
  delProgressFirst
}