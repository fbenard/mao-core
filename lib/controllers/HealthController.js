// External dependencies

const BaseController = require(`./BaseController`);


// Internal dependencies

const GetHealthReadyAction = require(`../actions/GetHealthReadyAction.js`);


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

		super
		(
			[
				{
					verb: `get`,
					uri: `/api/health/ready`,
					action: new GetHealthReadyAction()
				}
			]
		);
	}
}


// Export the class

module.exports = HealthController;
