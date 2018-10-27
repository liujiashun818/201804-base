process.argv.slice(2).forEach(item=>{ // [a,b]
    process.stdout.write(item);
});

process.stdout.write('end')