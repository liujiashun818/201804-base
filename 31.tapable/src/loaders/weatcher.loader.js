function loader() {
  //从一个接口中读取数据
}
loader.pitch = function(){
    let result = 'get from remote url';
    if(result){
        return result
    }
}
module.exports = loader;