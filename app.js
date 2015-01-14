$(document).ready(function() {
//--------------------------------
	//create Ajax call for Instagram
	function instagramAjax () {
		$.ajax ({
			url: "https://api.instagram.com/v1/users/3/media/recent/?client_id=f32e7af0d6d941009db0a4406adb4e88",
			dataType: "jsonp",
			success: function(data) {
				console.log(data);
			}//end success
		});//end ajax request
	}//end instagram function

	instagramAjax();
	
//----------------------------------	
});