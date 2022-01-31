/**
 *
 */

class UnregisterServiceFailedError extends Error
{
	/**
	 *
	 */

	constructor(serviceCode, error)
	{
		// Call parent constructor

		super(`Unregistering service ${serviceCode} failed`);


		// Record data

		this.data =
		{
			serviceCode,
			error
		};
	}
}


// Export the class

module.exports = UnregisterServiceFailedError;
