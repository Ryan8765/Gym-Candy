$(document).ready(function() {
/************************/

//navigation slideToggle on menu click
$('ul').on('click', '.menuButton', function() {
	$('.menu').slideToggle();
});

//function to make sure .menu reappears on window resize
var responsiveNav = function () {
	var w = window.innerWidth;
	if(w > 768 ) {
		$('.menu').show()
		$('nav li').css('display','inline');
		$('.menuButton').hide();
	} else {
		$('.menuButton').show();
		$('nav li').css('display','list-item')
		$('.menu').hide();
	}//end if
};//end responsiveNav function 

//run responsive nav on page load 
responsiveNav();

//window resize reponsive modifications
$(window).resize(function(){
	responsiveNav();
});//end resize





/*************************/
});