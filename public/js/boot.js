require.config({
	paths: {
		$: "/js/lib/jquery",
		_: "/js/lib/underscore",
		Backbone:"/js/lib/underscore",
		templates:"../templates"
	},
	shim: {
		'Backbone':['Underscore', 'Jquery'],
		'homebase':'Backbone'
	}
});

require(['homebase'], function(){
	homebase.initilize();
});