// 函数式编程
function test() {

    let conjion = function(x, y) {
        return x + y
    }
    let breed = function(x, y) {
        return x * y
    }

    let a = 4;
    let b = 2;
    let c = 0;

    let results = conjion(breed(b, conjion(a, c)), breed(a, b));
    console.dir(results);


    // 应该这么做——看不太懂这里例子的实际意义
    let conjion = function(x, y) {
        return x + y
    }
    let breed = function(x, y) {
        return x * y
    }

    let a = 4;
    let b = 2;
    let c = 0;

    let results = breed(b, conjion(2 * a, c)); // 这里我们会用到中学学到的结合律等
    console.dir(results);






    var hi = function(name) {
        return "Hi " + name;
    };

    // var greeting = function(name) { // 多次一举
    //   return hi(name);
    // }

    // console.log(greeting('zhu'));

    // 应该直接等于，而不是包裹
    let greeting = hi;
    console.log(greeting('zhu'));




    // 太傻了
    var getServerStuff = function(callback) {
        return ajaxCall(function(json) {
            return callback(json);
        })
    }

    // 应该这么写
    let getServerStuff = ajaxCall;


    function a(something) { // 这种结构其实就相当于 callback() 的声明
        return callback(something)
    }

    callback(something);


}


let xs = [1, 2, 3, 4, 5];

// 纯的函数
console.dir(xs.slice(0, 3));
console.dir(xs.slice(1, 2));
console.dir(xs.slice(2, 3));
console.dir(xs.slice(3, 3));

// 不纯的函数 —— 产生可观擦到的副作用
console.dir(xs.splice(0, 4));
console.dir(xs.splice(0, 4)); // 数组遭到破坏——但它就是做这个的呀

/*
	在函数式编程中 —— 我们想要的是每次执行都返回相同结果的函数。它本身并不破坏数据
 */





































