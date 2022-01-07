// Internal dependencies

const Config = require(`./Config`);
const Server = require(`./Server`);
const ServiceClient = require(`./ServiceClient`);


/**
 *
 */

class App
{
	/**
	 *
	 */

	constructor(controllers, config)
	{
		// Create the config

		this.config = new Config(config);


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


		// Register service

		if (global.config.mao.core.discovery)
		{
			// We will need a service client

			let serviceClient = new ServiceClient();


			// Log service registration

			console.log(`Registering service ${global.config.mao.core.service.name} with URL ${global.config.mao.core.service.url}...`);


			// Register service

			await serviceClient.registerService
			(
				global.config.mao.core.service.name,
				global.config.mao.core.service.url
			);
		}
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
