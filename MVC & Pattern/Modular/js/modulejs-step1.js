(function() {

    var people = { // 这里专门负责处理数据
        people: ['Saul', 'Quinn'],

        init: function() { // 这里专门定义而不是完成初始化
            this.cachDOM();
            this.hideWarning();
            this.bindEvent(); // 绑定事件（渲染页面和绑定事件是分开的？）
            this.render();

        },

        cachDOM: function() { // 缓存需要用到的内容。只在这里进行页面内容缓存
            this.$el = $('#peopleModule');
            this.$addButton = this.$el.find('button');
            this.$input = this.$el.find('input');
            this.$ul = this.$el.find('ul');
            this.template = this.$el.find('#people-template').html();
            this.$warning = $('#warning');
            this.$closeLightBox = this.$warning.find('button');
        },
        bindEvent: function() {
            this.$addButton.on('click', this.addPerson.bind(this)); // 添加名字事件
            this.$ul.delegate('i.del', 'click', this.clearName.bind(this)); // 清除名字
            this.$closeLightBox.on('click', this.closeLightBox.bind(this));

        },
        render: function() { // 只在这里处理 html,负责渲染 
            var data = {
                people: this.people
            };
            this.$ul.html(Mustache.render(this.template, data)); // 渲染经过处理过的字符串
        },
        addPerson: function() {
            this.value = this.$input.val();

            if (this.value) { // 如果输入值存在
                this.people.push(this.$input.val());
                this.render();
                this.$input.val('');
            } else {
                this.warning(); // 弹窗提示
            }

        },
        clearName: function(e) {

            var $remove = $(e.target).closest('li'); // 只有追溯到它的父元素，才能知道自己的索引
            var i = this.$ul.find('li').index($remove); // 拿到被删除的索引
            $remove.remove();
            this.people.splice(i, 1); // 在人名的数据容器里面也删除
            this.render();

        },
        hideWarning: function() {
            this.$warning.hide();
        },
        warning: function() { // 定义输入提示
            this.$warning.show();
        },
        closeLightBox: function() {
            this.hideWarning();
        }
    };

    people.init(); // 在这里专门运行初始化

})();
