var picViewer = $(function() {
	// cache DOM
	var $photoViewer = $('#photo-viewer');
	var $thumbnails = $('#thumbnails');



	// bind events
	$thumbnails.on('click', 'a', switchPic);
	
	function switchPic(e) {

		$this = $(this);
		e.preventDefault();
		var imgUrl = $this.find('img').attr('src');
		var viewPic = $photoViewer.find('img');
		viewPic.attr('src', imgUrl);
	}


})
















