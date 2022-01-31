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

		response.status(200).send();
	}
}


// Export the class

module.exports = GetHealthReadyAction;
