var people = (function() {
	// 缓存元素
	$el = $('#peopleModule');
	$addButton = $el.find('button');
	$input = $el.find('input');
	$ul = $el.find('ul');
	template = $el.find('#people-template').html();
	$warning = $('#warning');
	$closeLightBox = $warning.find('button');

	// 绑定事件
	window.onload = hideWarning; // 窗口加载事件。写在这里更严谨
	$addButton.on('click', addPerson);
	$ul.delegate('i.del','click', deletePerson);
	$closeLightBox.on('click', closeLightBox);

	// 处理数据
	var people = ['Demon','Steven']; // 初始化数组

	_render();

	function _render() { // 渲染模版
		var data = {
			people: people
		};
		$ul.html(Mustache.render(template, data)); 
	}

	// 定义事件函数
	function hideWarning() {
		$warning.hide(); // 先隐藏弹窗
	}

	function addPerson(value) { // 添加内容
		// 通过后备值来达到在 控制台 添加名字的目的。但是得先过滤掉事件对象（通过判断是否为字符串）
		var name = (typeof value === 'string') ? value : $input.val();
		if(name) { // 如果输入了值
			people.push(name); // 同时更新数据
			$input.val(''); // 记得在这里清空
			_render();
		} else { // 如果没有输入
			_render();
			$warning.show(); 
		}
	}

	function deletePerson(e) { // 删除名字
		var i;
		if(typeof e === 'number') { // 这里也是为了能在控制台传递而设计的开口
			i = e;
		} else {
			var $remove = $(e.target).closest('li'); // 找到被删除元素的父元素 li
			i = $ul.find('li').index($remove); // 拿到位置序列，用来更新数据
		}
		people.splice(i, 1);
		// $remove.remove(); // 这是错误的写法。视图的变化应该交给数据来驱动————由 _render 来管理
		_render();
	}

	function closeLightBox() {
		$warning.hide();
	}

	// 暴露接口
	return {
		addPerson: addPerson,
		deletePerson: deletePerson  // 暴露出来的接口
	}
})();

function hello(str) {console.log(str)}

var obj = {
	names : {},
	ready : function(name, fn) {
		this.names[name] = this.names[name] || []; // 在对象里面创建数组来储存被执行的函数
		this.names[name].push(fn);
	},
	cancel: function(name, fn) {
		if(this.names[name]) {
			for (var i = 0; i < this.names[name].length; i++) {
				if(this.names[name][i] === fn) { // 在这个事件数组里面找到一项是要执行 fn 函数的，那就
					this.names[name].splice(i);
					break;
				}
			}
		}	
	},
	go: function(name, data) {
		this.names[name].forEach(function(fn) {
			fn(data);
			// 这里是回调函数
			// 个人理解回调函数三要素: 结构形式， 被调用函数， 执行声明
			// 显然，这里 fn 是结构形式， data 为被调用函数（独立无关），而执行声明是通过 forEach()来完成
		})
	}
};

obj.ready('zhu', hello);
obj.ready('saul', hello);
obj.cancel('saul', hello); // 看，这里取消了事件

console.log(obj.names);
console.log(obj.names['zhu']);
obj.go('zhu', '你好呀');
obj.go('saul', '爱你哦');




