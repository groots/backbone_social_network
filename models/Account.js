models.exports = function(config, mongoose, nodemailer){
	var crypto = require('crypto');

	var AccountSchema = new mongoose.Schema({
		email: {type: String, unique: true}, 
		password: {type: String},
		name: {
			first: {type: String}, 
			last: {type: String}
		},
		birthday: {
			day: {type: Number, min: 1, max: 31, rquired: false},
			month: {type: Number, min: 1, max: 12, rquired: false},
			year: {type: Number}
		}, 
		photoUrl: {type: String},
		biography: {type: String}
	});

	var Account = mongoose.model('Account', AccountSchema);
	var registerCallback = function(err){
		if(err){
			return console.log(err);
		}
		return console.log("Account has been created");
	}

	var changePassword = function(accountId, newPassword){
		var shaShum = crypto.createHash('sha256');
		shaShum.update(newPassword);
		var hashedPassword = shaShum.digest('hex');
		Account.update({_id: accountId}, {$set: {password: newPassword}}, {upsert: false}, function changeCallback(err){
			console.log("Change password done for account " + accountId);
		});
	};

	var forgotPassword = function(email, resetPasswordUrl, callback){
		var user = Account.findOne({email:email}, function findAccount(err, doc){
			if(err){
				callback(false);
			} else {
				var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
				resetPasswordUrl += '?account=' + doc._id;
				smtpTransport.sendMail({
					from: 'groots@squishdesigns.com',
					to: doc.email,
					subject: 'A Message From George',
					text: 'Email me back if you recieved this email.'
				}, function forgotPasswordResult(err){
					if(err){
						callback(false);
					} else {
						callback(true);
					}
				});
			}
		});
	};

	var login = function(email, password, callback){
		var shaShum = crypto.createHash('sha256');
		shaShum.update(password);
		Account.findOne({email:email, password:shaShum.digest('hex')}, function(err, doc){
			callback(null!=doc);
		});
	};

	var register = function(email, password, firstName, lastName){
		var shaShum = crypto.createHash('sha256');
		shaShum.update(password);

		console.log("registering email " + email);
		var user = new Account ({
			email: email,
			name: {
				firstName: firstName,
				lastName: lastName
			},
			password: shaShum.digest('hex')
		});
		user.save(registerCallback);
		console.log("Save command was sent");
	}

	return {
		register: register,
		forgotPassword: forgotPassword,
		changePassword: changePassword,
		login: login,
		Account: Acount
	}
}