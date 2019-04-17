export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 手机号码*/
export function validatePhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

/* 手机号码*/
export function userNamePhone(str) {
  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/
  return reg.test(str)
}

/* 时间 格式化*/
export function dateTime(time, type) {
  // var date = new Date(time.replace(/-/g, '/'));
  // let gettime = time.getTime()
  let dateIndex = new Date(time)
  let y = dateIndex.getFullYear() | '';
  let m = dateIndex.getMonth() + 1 | '';
  let d = dateIndex.getDate() | '';
  let h = dateIndex.getHours() | '';
  let mm = dateIndex.getMinutes() | '';
  let s = dateIndex.getSeconds() | '';
  let backData
  if (type == 'date') {
    backData = `${y}年${num(m)}月${num(d)}日 ${num(h)}:${num(mm)}:${num(s)}`;
  } else {
    backData = `${y}年${num(m)}月${num(d)}日`;
  }
  return backData;
}

function num(e) {
  return e<10? '0'+ e : e
}
