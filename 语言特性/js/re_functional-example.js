let _ = R;

// 调试
let trace = _.curry((str, x) => {
	console.log(str, x);
	return x;
});

let Impure = {
	// 柯里化
	getJSON: _.curry((callback, url) => {
		$.getJSON(url, callback)
	}),
	setHtml: _.curry((tag, html) => {
		$(tag).html(html);
	})
};

// url 查询 
let url = (word) => 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + word + '&format=json&jsoncallback=?';

// 自己定义 prop
let prop = _.curry((property, object) => object[property]);  
/**
 * 记住必须对函数柯里化了才能用。
 * 直观上可以说 object 这个参数可以说是被等待状态，
 * 我们编写的时候只考虑 property 。
 * 因为我们知道 object 是从别的函数执行中传过来的
 */


	// // 编写的时候需要知道拿到了什么在决定怎么编写函数 —— trace 派上用场
	// let app = _.compose(Impure.getJSON(trace('response')), url); // 查看我们获得了的 data
	// console.log((app('cats')));


// 下面开始针对获得的 data 设计提取函数
let getMedia = _.compose(prop('m'), prop('media')); 
// 针对比较深的数组单独设计一个函数



	// let getSrc = _.compose(_.map(getMedia), prop('items')); // 设计完毕。注意 map 操作

	// // 开始着手创建 UI
let img = (url) => $('<img />', { src: url}); // img 工厂
	// let images = _.compose(_.map(img), trace('img'), getSrc); // 把获取的地址灌输到数组中去。注意，这里拿到的都是数组




// 这里可以优化。利用结合律 —— 两个 map 操作可以合并
let mediaToImg = _.compose(img, getMedia);
let images = _.compose(_.map(mediaToImg), prop('items'));




	// // 中途查看我们将会获取什么
	// let renderImages = _.compose(trace('img'), images); 
	// // 这个时候我们的调试函数 位置就不一样的。它其实就是个中途偷窥数据节点的一个函数。所以位置很重要
	// let app = _.compose(Impure.getJSON(renderImages), url);




// 最后完结
let renderImages = _.compose(Impure.setHtml('body'), images); // 注意我们的 images 其实是 jQuery 对象
let app = _.compose(Impure.getJSON(renderImages), url);
app('cats');
console.dir(app);































