let Koa = require('./koa/application');
let app = new Koa();
app.use((ctx) =>{
  ctx.body = '';
});

app.listen(3000);