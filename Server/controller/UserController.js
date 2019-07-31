const processMessage = require('../process-message');

module.exports = {

	chatBot(req, res)  {
		const { message } = req.body;
		processMessage(message);
		return res.status(200).send(message);
	  },
  
};
