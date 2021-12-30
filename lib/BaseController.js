/**
 *
 */

class BaseController
{
	/**
	 *
	 */

	sendError(request, response, next, status, message, error)
	{
		// Log error

		console.log(error);


		// Send error
		
		response.status(status).send
		(
			{
				timestamp: new Date().toISOString(),
				status: status,
				message: message,
				path: request.originalUrl,
				error: error
			}
		);
	}
}


// Export the class

module.exports = BaseController;
