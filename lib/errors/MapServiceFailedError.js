/**
 *
 */

class MapServiceFailedError extends Error
{
	/**
	 *
	 */

	constructor(serviceCode, error)
	{
		// Call parent constructor

		super(`ServiceClient::mapService(${serviceCode}) failed: ${error.message}`);


		// Record data
		
		this.data =
		{
			serviceCode,
			error
		};
	}
}


// Export the class

module.exports = MapServiceFailedError;
