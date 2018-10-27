let path = '/user/:id/:name';
let url = '/user/1/zfpx';
let paramNames = [];// 参数的名字
let regStr = path.replace(/:(\w+)/g, function (matched, attr) {
    paramNames.push(attr);
    return "(\\w+)";
});
console.log(regStr);
console.log(paramNames);
//paramNames=['id','name']
let result = url.match(new RegExp(regStr));
console.log(result);
let params = paramNames.reduce((memo, key, index) => (memo[key] = result[index + 1], memo), {});
console.log(params);