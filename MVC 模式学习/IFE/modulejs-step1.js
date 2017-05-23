(function() {

	var people = { // 这里专门负责处理数据
		people: ['Saul', 'Quinn'],

		init: function() { // 这里专门定义而不是完成初始化
			this.cachDOM();
			this.bindEvent(); // 绑定事件（渲染页面和绑定事件是分开的？）
			this.render();

		},

		cachDOM: function() { // 缓存需要用到的内容。只在这里进行页面内容缓存
			this.$el = $('#peopleModule');
			this.$button = this.$el.find('button');
			this.$input = this.$el.find('input');
			this.$ul = this.$el.find('ul');
			this.template = this.$el.find('#people-template').html();
		},
		bindEvent: function() {
			this.$button.on('click', this.addPerson.bind(this)); // 添加名字事件
			this.$ul.delegate('i.del','click', this.clearName.bind(this)); // 清除名字
			
		},
		render: function() { // 只在这里处理 html,负责渲染 
			var data = {
				people: this.people
			};
			this.$ul.html(Mustache.render(this.template, data)); // 渲染经过处理过的字符串
		},
		addPerson: function() {
			this.people.push(this.$input.val());
			this.render();
			this.$input.val('');
		},
		clearName: function(e) {

			var $remove = $(e.target).closest('li'); // 只有追溯到它的父元素，才能知道自己的索引
			var i = this.$ul.find('li').index($remove); // 拿到被删除的索引
			$remove.remove();
			this.people.splice(i, 1); // 在人名的数据容器里面也删除
			this.render();
			
		}
	};

	people.init(); // 在这里专门运行初始化

})();


















// 这里只是简单的 jQuery 代码，不是自执行
// $(function() {

// var lightBox = $("#warning").detach(); // 隐藏弹出框
// var people =[]; // 放人名的容器
// var templateL = $('#people-template').html(); // 拿到模版
// var template = "{{#people}}<li>{{.}}</li>{{/people}}"; // js 中创建模版，这是不好的！！！

// $('#peopleModule').find('button').on('click', function() {
	
// 	var inputText = $('#peopleModule').find('input').val();
// 	if(inputText === '') {
// 		$('body').append(lightBox);
// 		lightBox.show();
// 	}

// 	$('#cancel').on('click', function() {
// 			$("#warning").hide();
// 		});

// 	people.push($('#peopleModule').find('input').val()); // 提交输入的人名到容器数组里
// 	$('#peopleModule').find('input').val('')[0].removeAttribute('placeholder'); // 清空
// 	console.log($('#peopleModule').find('input').val('')[0]);

// 	var data = {
// 		people: people // 渲染的是对象，所以下包装成 data
// 	};

// 	var templateContent = Mustache.render(template, data);
// 	// console.log(templateContent);
// 	$('#peopleModule').find('ul').html(templateContent); // 渲染后更新到dom
// });

// $('#peopleModule').find('ul').delegate('i.del', 'click', function(e) {
	
	// var $remove = $(e.target).closest('li'); // 只有追溯到它的父元素，才能知道自己的索引
	// var i = $('#peopleModule').find('ul').find('li'); // 拿到被删除的索引
	// console.log(i);
	// console.log($remove);
	// $remove.remove();
	// people.splice(i, 1); // 在人名的数据容器里面也删除
	// // console.log($('h1'));
// });





	
// })


































