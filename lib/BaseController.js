/**
 *
 */

class BaseController
{
	/**
	 *
	 */

	sendError(request, response, next, status, error, message)
	{
		response.status(500).send
		(
			{
				timestamp: new Date().toISOString(),
				status: status,
				error: status,
				message: message,
				path: request.originalUrl
			}
		);
	}
}


// Export the class

module.exports = BaseController;
