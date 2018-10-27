function one() {
  console.log(1);
  function two(){
    console.log(2);
    function three() {
      console.log(3);
    }
    three();
  }
  two();
}
one();
