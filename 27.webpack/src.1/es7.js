//Option+Shift+A
function readonly(target, key, discriptor) {
    discriptor.writable = false;
}

class Person {
    @readonly PI = 3.144;
}
let p1 = new Person();
p1.PI = 3.15;
console.log(p1)
