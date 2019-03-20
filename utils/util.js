// 输出时间戳
function timestamp(time) {
  var time = time.replace(/\-/g, "/");
  return Date.parse(new Date(time))
}
// 方法调用
module.exports = {
  timestamp: timestamp
}