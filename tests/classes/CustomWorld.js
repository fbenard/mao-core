// External dependencies

const { World } = require(`@cucumber/cucumber`);


// Internal dependencies

const App = require(`${process.cwd()}/lib/App`);


/**
 *
 */

class CustomWorld extends World
{
	/**
	 * 
	 */

	constructor(options)
	{
		// Call parent constructor

		super(options);


		// Create the app

		this.app = new App
		(
			[],
			`${process.cwd()}/tests/config/config.json`,
			`${process.cwd()}/tests/config/api.yml`
		);
	}
}


// Export the class

module.exports = CustomWorld;
