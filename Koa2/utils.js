// 排序
const compare = (name, minor) => {
  return function (o, p) {
    var a, b;
    if (o && p && typeof o === 'object' && typeof p === 'object') {
      a = o[name];
      b = p[name];
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      thro("error");
    }
  }
}


// 排序
const compareTime = (property) => {
  return function(a,b){
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}


let fillZero = (n) => {
  let result = (n).toString().length === 1 ? ('0' + n): n;
  return result;
}

// 时间转换
const formatTime = (t = new Date())=> {
  let d = new Date(t);
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let result = `${year}-${fillZero(month)}-${fillZero(date)} ${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)}`;
  return result;
}


/* 时间 格式化*/
const dateTime = (time, type) =>{
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


module.exports = {
  formatTime,
  compare,
  compareTime,
  dateTime
}
