/**
 *
 */

class ServiceClientRegisterServiceError extends Error
{
	/**
	 *
	 */

	constructor(serviceCode, serviceUrl, error)
	{
		// Call parent constructor

		super(`ServiceClient::registerService(${serviceCode}, ${serviceUrl}) failed: ${error.message}`);


		// Record data

		this.data =
		{
			serviceCode,
			serviceUrl,
			error
		};
	}
}


// Export the class

module.exports = ServiceClientRegisterServiceError;
