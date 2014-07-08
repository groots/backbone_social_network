define([
	'views/index',
	'views/login',
	'views/register',
	'views/forgotpassword'
],
function(
	IndexView,
	LoginView,
	RegisterView,
	ForgotPasswordView)
{
	var UserMgmtRouter = Backbone.Router.extend({
		currentView = null,
		routes: {
			'index': 'index',
			'login': 'login',
			'register': 'register',
			'forgotpassword': 'forgotpassword'
		},
		changeView: function(){
			if(null != this.currentView){
				this.currentView.undelegateEvents();
			}
			this.currentView = view;
			this.currentView.render();
		},
		index: function(){
			this.changeView(new IndexView());
		},
		login: function(){
			this.changeView(new LoginView());
		},
		register: function(){
			this.changeView(new RegisterView());
		},
		forgotpassword: function(){
			this.changeView(new forgotPasswordView());
		}
	});
	return new UserMgmtRouter();
});
