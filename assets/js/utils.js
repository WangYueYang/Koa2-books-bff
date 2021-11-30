(function () {


  var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    Function('return this')() || {};


  // 节流函数
  // 每隔一段时间，执行一次函数
  // 第一次触发会立即执行
  // 如果在间隔时间内出发，会在间隔末尾再执行一次
  root.throttle = function (callback, timer) {
    let isFirst = true;
    let execDate = +new Date();
    let throttleId = null;
    return function () {

      if (isFirst) {
        callback();
        execDate = +new Date();
        isFirst = false;
      } else {
        const currentTime = +new Date();
        if (currentTime - execDate >= timer) {
          callback();
          execDate = +new Date();
        } else {
          if (throttleId) {
            clearTimeout(throttleId);
          }
          // 还需要再等的时间
          const timeWait = execDate + timer - (+new Date());

          throttleId = setTimeout(() => {
            callback();
            execDate = +new Date();
          }, timeWait);
        }
      }
    }

  }
})();