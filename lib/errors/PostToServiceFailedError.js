/**
 *
 */

class PostToServiceFailedError extends Error
{
	/**
	 *
	 */

	constructor(serviceCode, route, data, error)
	{
		// Call parent constructor

		super(`ServiceClient::post(${serviceCode}, ${route}) failed: ${error.message}`);


		// Reccord data

		this.data =
		{
			serviceCode,
			route,
			data,
			error
		};
	}
}


// Export the class

module.exports = PostToServiceFailedError;
