process.send('hello');

process.on('message',function(data){
    console.error(data);
})