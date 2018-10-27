onmessage = function (e) {
  let r = e.data;
  let sum = 0;
  for(var i = 0;i<r;i++){
    sum+=i;
  }
  postMessage(sum);
}