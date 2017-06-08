// 发布和订阅
var events = {
    events: {}, // 首先创建一个对象用来存放。
    // 绑定事件
    ready: function(eName, fn) { // 参数： 事件名， 执行函数
        this.events[eName] = this.events[eName] || [];
        this.events[eName].push(fn);
    },
    // 取消事件
    cancel: function(eName, fn) {
        if (this.events[eName]) {
            for (var i = 0; i < this.events[eName].length; i++) {
                if (this.events[eName][i] === fn) { // 如果找到符合 fn 的事件
                    this.events[eName].splice(i, 1); // 那就删除并退出
                    console.log('Event is gone!!!') // 事件没了哈哈
                    break;
                }
            }
        }
    },
    // 启动事件
    go: function(eName, data) { // 参数： 事件名， 执行函数的参数——也就是说绑定事件里的执行函数会在这里配上参数来执行
        this.events[eName].forEach(function(fn) {
            fn(data);
        })

    }
};




var count = (function() {
    var counts = 0;
    // cache DOM
    var $counts = $('#counts');
    var template = $counts.find('#count-template').html();

    // 绑定事件 
    events.ready('peopleChange', countPeople);

    // render
    render();

    function render() {
        var data = {
            counts: counts
        }
        $counts.html(Mustache.render(template, data));

    }

    // 定义事件函数
    function countPeople(peopleLength) {
        counts = peopleLength;
        render();
    }

    function destroy() {
        events.cancel('peopleChange', countPeople);
    }
    return {
        destroy: destroy
    };

})();


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
    $ul.delegate('i.del', 'click', deletePerson);
    $closeLightBox.on('click', closeLightBox);

    // 处理数据
    var people = ['Demon', 'Steven']; // 初始化数组

    _render();

    function _render() { // 渲染模版
        var data = {
            people: people
        };
        $ul.html(Mustache.render(template, data));
        events.go('peopleChange', people.length); // 绑定事件，并传入数据

    }

    // 定义事件函数
    function hideWarning() {
        $warning.hide(); // 先隐藏弹窗
    }

    function addPerson(value) { // 添加内容
        // 通过后备值来达到在 控制台 添加名字的目的。但是得先过滤掉事件对象（通过判断是否为字符串）
        var name = (typeof value === 'string') ? value : $input.val();
        if (name) { // 如果输入了值
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
        if (typeof e === 'number') { // 这里也是为了能在控制台传递而设计的开口
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
        deletePerson: deletePerson // 暴露出来的接口
    }
})();
