let languages = {
    'zh-CN':'你好',
    'en':'hello',
    'Fr':'Bonjour'
}
let defaultLanguage = 'en';
// 先获取 accept-language  根据头里的语言进行权重排序
// zh-CN,zh;q=0.9 =>[{name:'zh-CN',q:1},{name:'zh',q:0.9}]  

let http = require('http');
http.createServer(function(req,res){
    let language = req.headers['accept-language'];
    if(language){
        // 有多语言的
        let lans = language.split(',');     
        lans = lans.map(lan=>{
            let [name,q] = lan.split(';'); // [zh,q=0.9]
            q = q?Number(q.split('=')[1]):1;
            return {name,q}
        }).sort((lan1,lan2)=>lan2.q-lan1.q);
        for(let i = 0;i<lans.length;i++){
            let content = languages[lans[i].name];
            console.log(content);
            if(content){
                return res.end(content);
            }
        }
        res.end(languages.defaultLanguage);
    }else{
        res.end(languages.defaultLanguage);
    }
}).listen(3000);