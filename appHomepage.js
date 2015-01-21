$(document).ready(function() {
//--------------------------------
	//rotating image gallery function
	var rotatingImageGallery = function() {
		/*counter variable*/
		var i = 0;
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
			//fade pictures out function
			var fadePicIn = function() {
				$('.rotatingImages').eq(i).fadeIn(fadeInTime);
			};
			//fade pictures in function
			var fadePicOut = function() {
				$('.rotatingImages').eq(i).fadeOut(fadeInTime);
			};
			//if at the end of image array start at beginning again, otherwise increment 
			if(i == imageLength) {
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

	//call image rotator
	rotatingImageGallery();


	//adjust #imgScrollWrapper height and width in rotating gallery and also adjust #background height to length of document for its background image
	var imageDivResize = function() {
		var w = window.innerWidth;
		var h = $(document).height();
		var image = $('.rotatingImages');
		var imageWidth = image.outerWidth();
		var imageHeight = image.outerHeight();
		var div = $('#imgScrollWrapper');
		//if screen width 
		if (w >= 768) {
			div.css('width',imageWidth);
		}

		//change height of scroll rapper for all widths
		div.css('height', imageHeight);
	}

	$(window).resize(function(){
		imageDivResize();
	});

	imageDivResize();
	

//----------------------------------	
});