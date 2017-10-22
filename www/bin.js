const app = require('../app.js')


module.exports.main = (event, context, callback) => {

	app.handle({
		event: event,
		context: context,
		callback: callback
	})
	
}