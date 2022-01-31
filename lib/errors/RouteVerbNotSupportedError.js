/**
 *
 */

class RouteVerbNotSupportedError extends Error
{
	/**
	 *
	 */

	constructor(routeVerb, routeUri, error)
	{
		// Call parent constructor

		super(`Route verb not supported (${routeVerb} ${routeUri})`);


		// Record data

		this.data =
		{
			routeVerb,
			routeUri,
			error
		};
	}
}


// Export the class

module.exports = RouteVerbNotSupportedError;
