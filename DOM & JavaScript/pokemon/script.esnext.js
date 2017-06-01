
$('form').on('submit', function(e) {
	e.preventDefault();

	let types = $('input[type=text]').val().replace(/\s/g, '');
	types = types.split(',');
	console.log(types);
});


function displayPokemon(pokemon) {

	pokemon.forEach( poke => {
		let $container = $('<div>').addClass('pokemon'); // 创建容器
		let $image = $('<img>').attr('src', 'http://pokeapi/media/img/${poke.id}.png'); // 获得图片地址
		let $title = $('<h2>').text(poke.name); // 获得名字
		$container.append($image, $title); // 放进容器
		$('.poke-container').append($container);
	})
} 


displayPokemon();