let Koa = require('koa');
let Router = require('koa-router');
let app = new Koa();
let router = new Router();
const uuidv1 = require('uuid/v1');

let session = {}; // 一个卡号 对应一段信息
const CARID_NAME = 'zfpx'; // 卡的名字
// session是基于cookie的 相当于cookie是安全的因为session是存在服务端的
router.get('/towash',(ctx,next)=>{
    let cardId = ctx.cookies.get(CARID_NAME);
    if(cardId){ // 有卡就是用卡来消费
        if(session[cardId]){ // 取出卡中的余额消费
            session[cardId].count -=1;
            ctx.body = `您的卡号是${cardId}次数是${session[cardId].count}`
        }else{
            let cardId = uuidv1();
            session[cardId] = {count:5};
            ctx.cookies.set(CARID_NAME,cardId);
            ctx.body = `您的卡号是${cardId}次数是5`
        }
    }else{ // 办张卡
        let cardId = uuidv1();
        session[cardId] = {count:5};
        ctx.cookies.set(CARID_NAME,cardId);
        ctx.body = `您的卡号是${cardId}次数是5`
    }
});
app.use(router.routes());
app.listen(3000);