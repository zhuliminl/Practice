$(function() {

	var $orders =$('#orders');
	var $name = $('#name');
	var $drink = $('#drink');

	// 模版生成
	var orderTemplate = $('#order-template').html();
		
	function  addOrder(order) {
		$orders.append(Mustache.render(orderTemplate, order));
	} 
	
 	// GET 方法jkj
	$.ajax({
		type : 'GET',
		url : 'http://rest.learncode.academy/api/learncode/friends',
		// url : 'orders/API.json',
		success : function(data) {
			console.table(data) ;

			$.each(data, function(i, order) {
				addOrder(order);
			});

			// $orders.find("li").eq(35).prevAll("").remove();

		},
		error : function() {
			console.log('error');
		}

	});

	// 
	$('#add-order').on("click", function(e) {
		e.preventDefault();
		console.log('k');

		var order = {
			name : $name.val(),
			drink : $drink.val()
		};
		console.log(order);

		$.ajax({

			type : 'POST',
			url : 'http://rest.learncode.academy/api/learncode/frie nds',
			data : order, // 注意这里是我们需要提交的数据 方式是 POST
			success : function(newOrder) {
				addOrder(newOrder); 
			},
			error : function() {
				console.log('Fail to Post')
			}

		});

		
	});

	$orders.delegate(".remove","click", function() {

			var $li = $(this).closest("li");
			var self = this;
			$.ajax({
				type : 'DELETE',
				url : 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('data-id'),
				success : function() {
					console.log($(self));
					$li.fadeOut(300, function() {
						$(this).remove();
						console.log($(this));
					});
				}
			});
			console.log('nihao');
		});

	$orders.delegate(".editOrder", "click", function() {
		var $li = $(this).closest("li");

		$li.find("input.name").val( $(li).find("span.name").html() );
	} )
});

















