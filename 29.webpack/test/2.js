let obj = { name: 'zfpx' };
Object.defineProperty(obj, 'age', {
    get() {
        return 9;
    }
});
console.log(obj.age);
//exports[Symbol.toStringTag] = "Module";

let exp = { name: 'zfpx' };
exp[Symbol.toStringTag] = 'Module';
console.log(exp.toString());
console.log(exp.toString());
console.log(Object.prototype.toString.call(['a']));
