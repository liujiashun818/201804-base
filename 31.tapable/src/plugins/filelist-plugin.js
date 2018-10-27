class FileListPlugin{
   constructor(options){
    this.options = options||{};
   }

   apply(compiler){
     compiler.hooks.emit.tapAsync('FileListPlugin',(compilation,callback)=>{
        let assets = compilation.assets;
        // ['main.js','index.html']
        /**
         * - main.js
         * - index.html
         */
        let content = Object.keys(assets).map(key=>`- ${key}`).join('\n');
        assets[this.options.filename||'manifest.md'] = {
            source(){
                return content;
            },
            size(){
                return content.length;
            }
        }
        console.log(assets);
        callback(null,compilation);
     });
   }
}
module.exports = FileListPlugin;