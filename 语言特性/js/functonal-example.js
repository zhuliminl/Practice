let go = (x) => {
	console.dir(x);
};
let _ = R;
let trace = _.curry((tag, x) => { // 定义调试工具函数
	console.log(tag, x);
	return x;
});

// app goes here

let Impure = { // 简单包装 getJSON 方法

	getJSON: _.curry((callback, url) => {
		$.getJSON(url, callback);
	}),

	setHtml: _.curry((sel, html) => {
		$(sel).html(html);
	})
}

// 构造 url 传给 Impure.getJSON 函数。注意这里并没有实现 pointfree
let url = (term) => 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';


// let app = _.compose(Impure.getJSON(trace('response')), url);
// go(app('cats'));

// 自己来写一个 prop 函数，来获取对象中嵌套的属性
let prop = _.curry((property, object) => object[property]); // 很简单的 [] 访问语法而已

let mediaUrl = _.compose(prop('m'), prop('media')); // 在数组 items 中找到图片链接路径
let srcs = _.compose( _.map(mediaUrl), prop('items')); // 对外部对象进行抽取。
/** 
 * 感觉这里理解代码思维应该是倒着阅读的
 * 先确定是在对对象进行抽取。所以参数是对象没错。
 * 目标是在对象的 items 属性中，先取出 items 没错
 * 接着需要对数组‘遍历’，而便利的内容便是再一次的抽取操作
 * 所以才会有单独把数组抽取任务单独拿出来 
 */




let img = (url) => $('<img />', {src: url});
let images = _.compose(_.map(img), srcs);

let renderImages = _.compose(Impure.setHtml('body'), images);
let app = _.compose(Impure.getJSON(renderImages), url);

app('sky');