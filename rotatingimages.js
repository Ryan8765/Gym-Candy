var rotatingImageGallery = function() {
	/* how long to fade pictures out */
	var fadeOutTime = 2500;
	/*how long for picture to fade in*/
	var fadeInTime = 2500;
	/*how long for picture to rotate*/
	var pictureTime = 5000;
	/*variable holds picture array for slideshow*/
	var images = $('.rotatingImages');
	var imageLength=images.length - 1;
	//show first picture
	$('.rotatingImages').eq(0).fadeIn(fadeInTime);

	//function to show and hide images
	var showPic = function() {
		/*counter variable*/
		var i = 0;
		//fade pictures out function
		var fadePicIn = function() {
			$('.rotatingImages').eq(i).fadeIn(fadeInTime);
		};
		//fade pictures in function
		var fadePicOut = function() {
			$('.rotatingImages').eq(i).fadeOut(fadeInTime);
		};
		//if at the end of image array start at beginning again, otherwise increment 
		if(i == imageLengthMin) {
			fadePicOut();
			i = 0;
			fadePicIn();
		} else {
			fadePicOut();
			i++;
			fadePicIn();
		}	
	};//end showPic function

	//infinite loop
	setInterval(function(){
		showPic();
		} 
	,pictureTime);
}; //end rotatingImageGallery