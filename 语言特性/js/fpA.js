// console.log('r', R)
// console.log("ramda", R);
// const curry = R.curry;

// // strLength :: string -> Number
// const strLength = function(s) {
  // return s.length;
// };

// const join = curry(function(what, xs) {
  // console.log('xs', xs)
  // return xs + what
  // // return xs.join(what);
// });

// console.log("saul", join("saul", "is bendan"))
// console.log("saul", join("saul")("is bendan"))

function hello() {
  try {
    xxx
  } catch(e) {
    console.log('e', e)
    throw e
    console.log('never')
  }
}

function bar() {
  console.log('bar')
}

function main() {
  hello()
  bar()
}

main()
  bar()
