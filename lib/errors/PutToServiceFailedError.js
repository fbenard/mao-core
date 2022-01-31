/**
 *
 */

class PutToServiceFailedError extends Error
{
	/**
	 *
	 */

	constructor(serviceCode, route, data, error)
	{
		// Call parent constructor

		super(`ServiceClient::put(${serviceCode}, ${route}) failed: ${error.message}`);


		// Record data

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

module.exports = PutToServiceFailedError;
