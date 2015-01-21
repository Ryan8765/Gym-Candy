$(document).ready(function() {
//--------------------------------
	//create Ajax call for Instagram
	//array for full sized images
	var urlImagesArray = [];
	//array for full sized images spaceless
	var urlImagesArraySpaceless = [];
	//array for videos 
	var urlVideosArray = [];

	function instagramAjax () {
		$.ajax ({
			url: "https://api.instagram.com/v1/users/432935321/media/recent/?client_id=f32e7af0d6d941009db0a4406adb4e88",
			dataType: "jsonp",
			success: function(returnedData) {
				console.log(returnedData);
				//media object
				var x = returnedData.data;
				//length of media objects returned from ajax request
				var dataLength = x.length;
				//video url
				var urlVideo;
				//thumbnail url
				var urlThumbnail;
				//html to append
				var html;
				//loop that goes through each array item from data
				for (var i = 0; i < dataLength; i++) {
					//if the array item has video create video link else create image link
					if ("videos" in x[i]) {
						//store video and thumbnail urls
						urlVideo = x[i].videos.standard_resolution.url;
						//push value to video array
						urlVideosArray[i] = urlVideo;
						urlThumbnail = x[i].images.thumbnail.url;
						//build html to add
						html = "<a href='" + urlVideo;
						html +="' ><div class='imgHolder'><img src='" + urlThumbnail;
						html +="'><div class='playButton'></div></div></a>";
						//append html
						$("#imageContainerInner").append(html);
					} else {
						//store thumbnail and store large image in array
						urlImagesArray[i] = x[i].images.standard_resolution.url;
						urlImagesArraySpaceless.push(x[i].images.standard_resolution.url);
						urlThumbnail = x[i].images.thumbnail.url;
						//build html to append
						html = "<a href='";
						html +="' target='_blank'><div class='imgHolder'><img src='" + urlThumbnail;
						html +="'></div></a>";
						//append html
						$("#imageContainerInner").append(html);
					}
				} //end loop
			}//end success
		});//end ajax request
	}//end instagramAjax function

	instagramAjax();
	//popup box event on picture click and also video popup in new window
	//dynamically created nodes preventDefault
	//var counter to count number of times user has clicked a link
	var counter = 0;
	$('#imageContainerInner').on('click', 'a', function(event){
		event.preventDefault();
		var popupBackground = $('<div id="popupBackground"><div id="rightArrow"></div><div id="leftArrow"></div><div id="xout"></div></div>');
		//index of picture clicked
		var imgNumber = $(this).index();
		//image node first link click
		var imgToPopup = $("<img id='popupImage' src='" + urlImagesArray[imgNumber] + "'>");

		//if image clicked isn't a video then
		if (urlImagesArray[imgNumber] != undefined) {
			if(counter < 1) {
				//append image node
				popupBackground.append(imgToPopup);
				//append popupBackground to body element
				$('body').append(popupBackground);
				$('#popupBackground').show();
			} else {
				$('#popupImage').attr('src', urlImagesArray[imgNumber]);
				$('#popupBackground').show();
			}//end if
		//else load video in new page
		} else {
			window.open(urlVideosArray[imgNumber]);
		}

		counter++;
	}); //end onclick

	//create function to handle right clicks on popup gallery
	var pictureRight = function() {
		//array picture length
		var pictureArrayLength = urlImagesArraySpaceless.length;
		//current image source index in spaceless array
		var imgSrcIndex;
		var popupSrc = $('#popupBackground img').attr('src');
		//for loop to find the current image index of the popup
		for (var i = 0; i < pictureArrayLength; i++) {
			if (urlImagesArraySpaceless[i] == popupSrc) {
				imgSrcIndex = i;
				break;
			}
		} //end for loop

		//add on to imgSrcIndex if we're not at the end of the picture array, else make imgSrcIndex 0
		if (imgSrcIndex < pictureArrayLength) {
			imgSrcIndex++;
		}

		if (imgSrcIndex == pictureArrayLength) {
			imgSrcIndex = 0;
		}

		//change source of popup img
		$('#popupBackground img').attr('src', urlImagesArraySpaceless[imgSrcIndex]);
	};
	//click right popup arrow move pictures
	$('body').on('click', '#rightArrow', function() {
		pictureRight();
	});

	var pictureLeft = function() {
		//array picture length
		var pictureArrayLength = urlImagesArraySpaceless.length;
		//current image source index in spaceless array
		var imgSrcIndex;
		var popupSrc = $('#popupBackground img').attr('src');
		//for loop to find the current image index of the popup
		for (var i = 0; i < pictureArrayLength; i++) {
			if (urlImagesArraySpaceless[i] == popupSrc) {
				imgSrcIndex = i;
				break;
			}
		} //end for loop

		//subtract one from imgSrcIndex if we're not at the beginning or reset to last picture if we are.
		if (imgSrcIndex == 0) {
			imgSrcIndex = pictureArrayLength - 1;
		} else { 
			imgSrcIndex--;
		}
		
		//change source of popup img
		$('#popupBackground img').attr('src', urlImagesArraySpaceless[imgSrcIndex]);
	};

	//click right popup arrow move pictures
	$('body').on('click', '#leftArrow', function() {
		pictureLeft();
	});

	//get rid of popup on background and x-out click
	$('body').on('click', '#popupBackground, #xout', function(){
		$('#popupBackground').hide();
	});

	//stop event propogation on #popup img and right and left arrows
	$('body').on('click', '#rightArrow, #leftArrow, #popupImage', function(event){
		event.stopPropagation();
	});
//----------------------------------	
});