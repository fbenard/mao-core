// External dependencies

const { Then } = require(`@cucumber/cucumber`);
const chai = require(`chai`);


/**
 *
 */

Then
(
	"the app is healthy",
	async function()
	{
		// Check whether status code is 200
		// It means the app is healthy
		
		chai.assert.equal(this.response.status, 200);
	}
);


/**
 *
 */

Then
(
	"the app can be stopped",
	async function()
	{
		// Stop the app
		
		await this.app.stop();
	}
);
