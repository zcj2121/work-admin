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
    backData = `${y}/${num(m)}/${num(d)} ${num(h)}:${num(mm)}:${num(s)}`;
  } else {
    backData = `${y}/${num(m)}/${num(d)}`;
  }
  return backData;
}

function num(e) {
  return e<10? '0'+ e : e
}
/* 人民币 格式化*/
export function NumFormat(s, n) {
  if (!s) {s = '0.00'}
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  var t = "";
  for(let i = 0; i < l.length; i ++ )
  {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
