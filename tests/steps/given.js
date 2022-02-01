// External dependencies

const { Given } = require(`@cucumber/cucumber`);


/**
 *
 */

Given
(
	"the app has been started",
	async function()
	{
		// Start the app

		await this.app.start();
	}
);


