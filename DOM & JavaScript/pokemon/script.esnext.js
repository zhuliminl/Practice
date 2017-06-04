const fetchOption = {
	headers: {
		'Content-Type': 'application/json'
	},
	mode: 'no-cors'
}



$('form').on('submit', function(e) {
    e.preventDefault();

    let types = $('input[type=text]').val().replace(/\s/g, '');
    types = types.split(','); // 获得输入数组

    let trainerTypeCalls = types.map( elem => { // 参数便是我们输入的字符
        return fetch('http://pokeapi.co/api/v2/type/${elem}/', fetchOption) // 新 API fetch 来取回

    });
  	console.log(trainerTypeCalls);
  	Promise.all(trainerTypeCalls)
  		.then( data => {
  			console.log(data);
  		})
});


// function displayPokemon(pokemon) {

//     pokemon.forEach(poke => {
//         let $container = $('<div>').addClass('pokemon'); // 创建容器
//         let $image = $('<img>').attr('src', 'http://pokeapi/media/img/${poke.id}.png'); // 获得图片地址
//         let $title = $('<h2>').text(poke.name); // 获得名字
//         $container.append($image, $title); // 放进容器
//         $('.poke-container').append($container);
//     })
// }


// displayPokemon();

	console.dir($);