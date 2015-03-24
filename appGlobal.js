$(document).ready(function() {
/************************/
	//change logo on smaller devices
	var changeLogo = function () {
		var w = window.innerWidth;
		var node = $('#logo img');

		if (w >= 400) {
			node.attr('src', 'images/croppedLogo.png');
		} else {
			node.attr('src', 'images/croppedLogoSmDevice.png');
		}//end if
	};//end changeLogo function


	//navigation slideToggle on menu click
	$('ul').on('click', '.menuButton', function() {
		$('.menu').slideToggle();
	});

	//create a toggle class to get rid of hover effects on nav when screen is less than 768 px
	var toggleHoverNav = function() {
		var w = window.innerWidth;
		var hasClass = $('nav li').hasClass('hover');
		if (w >= 768) {
			if (!hasClass) {
				$('nav li').addClass('hover');
			}//end if
		} else {
			if (hasClass){
				$('nav li').removeClass('hover');
			}//end if
		}//end if
	};

	//function to make sure .menu reappears on window resize
	var responsiveNav = function () {
		var w = window.innerWidth;
		if(w > 768 ) {
			$('.menu').show();
			$('nav li').css('display','inline');
			$('.menuButton').hide();
		} else {
			$('.menuButton').show();
			$('nav li').css('display','list-item');
			$('.menu').hide();
		}//end if
	};//end responsiveNav function 

	//run responsive nav on page load 
	responsiveNav();

	//window resize reponsive modifications
	$(window).resize(function(){
		responsiveNav();
		toggleHoverNav();
		changeLogo();
	});//end resize
	//change logo on screen size
	changeLogo();
	//stop hover on nav for screen devices
	toggleHoverNav();





/*************************/
});