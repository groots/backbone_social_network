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
		}
	});
}