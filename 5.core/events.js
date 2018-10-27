function EventEmitter() {
   this._events = Object.create(null);
}
// {水开了:[吃泡面Fn,洗脸Fn]}
EventEmitter.defaultMaxListeners = 10;
// 返回事件的名字
EventEmitter.prototype.eventNames = function(){
  return Object.keys(this._events);
}
EventEmitter.prototype.setMaxListeners = function (n) {
  this.count = n;
}
EventEmitter.prototype.getMaxListeners = function () {
  return this.count || EventEmitter.defaultMaxListeners;
}
EventEmitter.prototype.once = function (eventName,callback,flag) {
  let one = (...args)=>{
    callback(...args);
    this.removeListener(eventName,one);
  }
  one.g = callback; // 自定义属性
  this.on(eventName, one,flag );
}
EventEmitter.prototype.prependOnceListener = function (eventName,callback) {
  this.once(eventName, callback,true);
}
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (eventName,callback,flag) {
  if (!this._events) { this._events = Object.create(null) }
  // 实现监听新函数
  if(eventName!=='newListener'){
    if (this._events['newListener'] && this._events['newListener'].length){
      this._events['newListener'].forEach(fn => fn(eventName));
    }
  }
  if(this._events[eventName]){
    if(flag){
      this._events[eventName].unshift(callback);
    }else{
      this._events[eventName].push(callback);
    }
  }else{
    this._events[eventName] = [callback];
  }
  if(this._events[eventName].length-1   == this.getMaxListeners()){
    console.warn(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${this._events[eventName].length} ${eventName} listeners added. Use emitter.setMaxListeners() to increase limit`);
  }
}
// 删除全部监听
EventEmitter.prototype.prependListener = function (eventName,callback) {
  this.on(eventName,callback,true);
}
EventEmitter.prototype.removeAllListeners = function (eventName) {
  this._events[eventName] = [];
}
// 删除某个监听函数
EventEmitter.prototype.removeListener = function (eventName,callback) {
  this._events[eventName] = this._events[eventName].filter(fn=>fn!=callback&&fn.g!=callback);
}
EventEmitter.prototype.emit = function (eventName,...args) {
  if (this._events[eventName]){
    this._events[eventName].forEach(fn => fn.call(this,...args));
  }
}
module.exports = EventEmitter;