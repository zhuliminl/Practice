let data = [ // 需要的数据。
    {
        id: 'forest',
        title: '大森林',
        src: 'src/img/forest.jpg',
        child: {
            title: 'walk',
            html: 'find yourself in ths woods'
        }
    }, {
        id: 'beauty',
        title: '描述',
        src: 'src/img/beauty.jpeg',
        child: {
            title: '新垣结衣',
            html: '<img src="src/img/sub-img/beauty-girl.png" alt="" />'
        }
    }
];


// 构建漂浮容器对象
let Float = function(data, className, x, y) {

    // 创建容器
    this.container = document.createElement('div');
    this.container.setAttribute('id', data.id);
    this.container.setAttribute('class', className);
    // 创建图片
    this.img = document.createElement('img');
    this.img.setAttribute('title', data.title);
    this.img.setAttribute('src', data.src);
    // 放置图片到容器
    this.container.appendChild(this.img);

    // 创建子内容块
    this.child = document.createElement('div');
    this.child.setAttribute('title', data.child.title);
    this.child.innerHTML = data.child.html;
    this.child.style.left = x + '%';
    this.child.style.top = y + '%';

    this.container.appendChild(this.child);

    let self = this;
    // 添加调整背景浮动动画事件
    this.img.addEventListener('mousemove', function(e) {

        let x = e.pageX - e.target.x, // 取到鼠标相对于图片左上角的距离
            y = e.pageY - e.target.y;

        let perX = x / (e.target.width) - .5, // 将鼠标位置值转换成偏移系数值。减去 0.5 之后追随鼠标才更加合理
            perY = y / (e.target.height) - .5;

        e.target.style.transform = 'perspective(500px) rotateX(' + 2 * perX + 'deg) rotateY(' + 2 * -perY + 'deg)';

        console.dir(self.child.offsetLeft);

    });

};

Float.prototype = {
    constructor: Float,
    addTobody: function(element) {
        element.appendChild(this.container);
    }
};

let item1 = data[0];
let banner1 = new Float(item1, 'banner', 25, 74);

let element1 = document.getElementById('banner-float');
banner1.addTobody(element1);


let item2 = data[1];
let banner2 = new Float(item2, 'banner', 34, 59);

let element2 = document.getElementById('banner-float');
banner2.addTobody(element2);



let dropTarget = document.getElementById('droptarget');
dropTarget.addEventListener('dragover', (e) => {
	e.preventDefault();

	
});
dropTarget.addEventListener('dragenter', (e) => {
	e.preventDefault();
	console.log('已经进入敌区');
});
dropTarget.addEventListener('drop', (e) => {
	e.preventDefault();
	let data = e.dataTransfer.getData('text');
	console.log(data);
	dropTarget.innerHTML = data;
});



let drag = document.getElementById('drag-item');
drag.addEventListener('dragstart', (e) => {
	console.log(e);
	e.dataTransfer.setData('text', '郝凤，我喜欢你。你知道吗');
});

drag.addEventListener('drag', (e) => {
	// console.log(3);
});
drag.addEventListener('dragend', (e) => {
	// console.log(4);
});



var users = [{
          id : '001',
          name : '刘亦菲',
          age : 18
     },{
          id : '002',
          name : '杨幂',
          age : 19
     }];



const req = window.indexedDB.open('saul', 1);
let db;

req.onsuccess = (e) => {
    db = e.target.result;
    console.log(req);
    
    let transaction = db.transaction('test');

    console.log(db);
};
req.onupgradeneeded = (e) => {
    console.log("onupgradeneeded");

    let db = e.target.result;
    // console.log(db);

    db.createObjectStore('test');

    let store = db.createObjectStore('test', { keyPath: 'id', autoIncrement: true});
    store.createIndex('title', 'title', { unique: true });
    store.createIndex('name', 'name', { unique: true });
    store.createIndex('year', 'year', { unique: true });

    var i = 0,
        len = users.length;
    while(i<len) {
        store.add(users[i++]);
    }
}
































