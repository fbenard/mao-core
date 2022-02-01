/**
 *
 */

class GetHealthReadyAction
{
	/**
	 *
	 */

	async run(request, response, next)
	{
		// Send response

		response.statusMessage = `Service is ready`;
		response.status(200).end();
	}
}


// Export the class

module.exports = GetHealthReadyAction;
