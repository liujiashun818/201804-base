function fn(a,b) {
	console.log(this);
}
fn.call(null,1,2);
fn.apply(null,[1,2]);