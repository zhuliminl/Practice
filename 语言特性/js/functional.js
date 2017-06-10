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






    // 不纯
    let minimum = 21;
    let checkAge = function(age) {
        return age >= minimum;
    }

    // 纯的
    let checkAge = function(age) {
        let minimum = 31;
        return age >= minimum;
    }

    /*
    	在函数式编程中 —— 引入外部环境，从而增加了认知负荷 —— 换句话说，它取决于系统状态
     */





    // 可缓存性
    let memoize = function(fn) {

        let cache = {}; // 缓存容器 

        return function() { // 返回函数
            let arg_str = JSON.stringify(arguments); // 缓存参数为对象字符串
            cache[arg_str] = cache[arg_str] || fn.apply(fn, arguments); // 储存字符串
            return cache[arg_str]; // 返回参数字符串
        };
    };


    let pureHttpCall = memoize(function(url, params) {
        return function() {
            return $.getJSON(url, params);
        }
    });


    console.dir(pureHttpCall());






    let add = function(x) {
        return function(y) {
            return x + y
        };
    };


    let increment = add(1); // 注意这里返回的函数获得了一个闭包 即 x = 1
    let addTen = add(10); // 这里也一样，从而保证了下一层的调用
    console.dir(increment);
    console.dir(addTen);

    console.log(increment(2));
    console.log(addTen(2));







    let myArray = new Array(100);
    let newArray = _.map(myArray, function(item) { // 使用 lodash 
    	return item = Math.floor(Math.random()*100 + 1);
    })
    console.dir(newArray);







    // 绑定函数 bind 的内部实现
    function bind(fn, context) { 	// 参数为需要执行的函数和上下文对象
    	return function() { 		// 创建闭包来传递由 apply 执行的函数
    		return fn.apply(context, arguments); 	// 内部用 apply 方法来实现硬绑定
    	}; 							// 返回的是一个没有执行的函数，但是这个函数内部却是执行的
    }

    console.dir(bind);







    // 函数的柯里化其实和函数绑定相似，只不过柯里化还可以对返回的函数传递参数
    // 来看看 curry 实现原理
    function curry(fn) { // 被柯里化的函数，以及参数
    	let args = Array.prototype.slice.call(arguments, 1); // 参数 fn 之后的参数
    	return function() {
    		let innerArgs = Array.prototype.slice.call(arguments); // 拿到所有的参数
    		let finalArgs = args.concat(innerArgs); // 合并
    		return fn.apply(null, finalArgs);
    	};
    };

    function add(a, b) {
    	return a + b
    }

    function multiple(a, b) {
    	return a*b
    }

    let curryAdd = curry(add, 4);
    console.dir(curryAdd);

    console.dir(curryAdd(7)); // 11


    let curryMul = curry(multiple, 4);
    console.dir(curryMul(2)); // 8


    // 绑定函数和柯里函数的合体
    function bind(fn, context) {
    	let args = Array.prototype.slice(arguments, 2);
    	return function() {
    		let innerArgs = Array.prototype.slice(arguments);
    		let finalArgs = args.concat(innerArgs);
    		return fn.apply(context, finalArgs);
    	}
    }






}







console.dir(String);

let curry = _.curry; // 用 lodash 的 柯里函数方法


let match = curry(function(what, str) {
	return str.match(what);
});

console.dir(match(/\s+/g, 'hello world'));
console.dir(match(/\s+/g)('hello world'));


let replace = curry(function(what, replacement, str) {
	return str.replace(what, replacement);
});

let filter = curry(function(fn, ary) {
	return ary.filter(fn);
});

let map = curry(function(fn, ary) {
	return ary.map(fn);
});


let hasSpaces = match(/\s+/g); // 创造一个检查空格的函数

console.dir(hasSpaces('zhu liminl ')); // 有空格
console.dir(hasSpaces('nnnnnnn')); // null 表示没有

console.dir(filter(hasSpaces, ['nn nnn', 'nnnnnn', 'jj jj'])); // 筛选函数又来灌上空格函数

let filterSpace = filter(hasSpaces); // 干脆再集成一个更厉害的函数

console.dir(filterSpace(['nnn n', 'jj j ', 'aaa', 'ii ii'])); // 返回有空格的数组

// 现在我们来试试这个
let noVoweles = replace(/[aeiou]/ig);
let censored = noVoweles('*'); 
console.dir(censored('Chocolate Rain')); // Ch*c*l*t* R**n 

















