// Internal dependencies

const Config = require(`./Config`);
const Server = require(`./Server`);


/**
 *
 */

class App
{
	/**
	 *
	 */

	constructor(controllers)
	{
		// Create the config

		this.config = new Config();


		// Create the server
		
		this.server = new Server
		(
			global.config.mao.core.server.host,
			global.config.mao.core.server.port,
			controllers
		);
	}


	/**
	 *
	 */

	async start()
	{
		// Log app start

		console.log(`Starting in ${process.env.NODE_ENV} mode...`);


		// Start the server

		await this.server.start();
	}


	/**
	 *
	 */

	async stop()
	{
		// Stop the app
		
		await this.server.stop();
	}
}


// Export the class

module.exports = App;
