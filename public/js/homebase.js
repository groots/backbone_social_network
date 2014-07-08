define([
	"router"
],
function(
router
){
	var initilize = function(){
		checkLogin(runApplication);
	};

	checkLogin: function(callback){
		$.ajax("/account/authenticated", function(){
			method: 'GET',
			success: function(){
				return callback(true);
			},
			error: function(){
				return callback(false);
			}
		});
	};

	runApplication: function(authenticated){
		if(!authenticated){
			window.location.hash = 'login';
		} else {
			window.location.hash = 'index';
		}
		Backbone.history.start();
	};

	return {
		initilize:initilize
	};
});