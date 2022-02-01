// External dependencies

const { setWorldConstructor } = require(`@cucumber/cucumber`);


// Internal dependencies

const App = require(`../../lib/App`);


/**
 *
 */

class World
{
	/**
	 * 
	 */

	constructor()
	{
		// Create the app

		this.app = new App
		(
			[],
			`${process.cwd()}/tests/config/config.json`,
			`${process.cwd()}/tests/config/api.yml`
		);
	}
}


// Set the world constructor

setWorldConstructor(World);
