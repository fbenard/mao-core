// External dependencies

const BaseController = require(`./BaseController`);


/**
 *
 */

class HealthController extends BaseController
{
	/**
	 *
	 */

	constructor()
	{
		// Call parent constructor

		super();
	}


	/**
	 *
	 */

	registerRoutes(router)
	{
		// GET /api/core/ready

		router.get
		(
			`/api/health/ready`,
			async (request, response, next) =>
			{
				await this.getCoreReady(request, response, next);
			}
		);
	}


	/**
	 *
	 */

	async getCoreReady(request, response, next)
	{
		// Send response

		response.status(200).send();
	}
}


// Export the class

module.exports = HealthController;
