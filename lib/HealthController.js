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
				await this.getReady(request, response, next);
			}
		);
	}


	/**
	 *
	 */

	async getReady(request, response, next)
	{
		// Send response

		response.status(200).send();
	}
}


// Export the class

module.exports = HealthController;
