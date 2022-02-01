// External dependencies

const { Given } = require(`@cucumber/cucumber`);


// Internal dependencies

const App = require(`../../lib/App`);


/**
 *
 */

Given
(
	"the app has been started",
	async function()
	{
		// Create the app

		this.app = new App
		(
			[],
			`${process.cwd()}/tests/config/config.json`,
			`${process.cwd()}/tests/config/api.yml`
		);

		
		// Start the app

		await this.app.start();
	}
);


