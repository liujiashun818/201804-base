//import './index.css';
//console.log('hello');
//import { add } from './calculator';
//let ret = add(1, 2);
//console.log(ret);
//import hello from './hello.js';
//console.log(hello);

document.getElementById('container').addEventListener('click', function () {
    import('./click.js').then(function (mod) {
        //{default: "click", __esModule: true, Symbol(Symbol.toStringTag): "Module"}
        console.log(mod, mod.default);
        let name = mod.default;
        alert(name);
    });
});
document.getElementById('container2').addEventListener('click', function () {
    import('./click2.js').then(function (mod) {
        console.log(mod, mod.default);
        let name = mod.default();
        alert(name);
    });
});