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

		console.log(`Starting app in ${process.env.NODE_ENV} mode...`);


		// Start the server

		this.server.start();


		// Register service

		await this.register();


		// Stop the app when process is exited

		process.on(`SIGINT`, () => { process.exit(); });
		process.on(`SIGTERM`, () => { process.exit(); });
		process.on(`exit`, (code) => { this.stop(); });
	}


	/**
	 *
	 */

	async stop()
	{
		// Log app stop

		console.log(`Stopping app...`);


		// Stop the app
		
		this.server.stop();


		// Unregister service

		await this.unregister();


		//

		process.exit();
	}


	/**
	 * 
	 */

	async register()
	{
		if (global.config.mao.core.registry)
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

	async unregister()
	{
		if (global.config.mao.core.registry)
		{
			// We will need a service client

			let serviceClient = new ServiceClient();


			// Log service unregistration

			console.log(`Unregistering service ${global.config.mao.core.service.name}...`);


			// Unregister service

			await serviceClient.unregisterService
			(
				global.config.mao.core.service.name
			);
		}
	}
}


// Export the class

module.exports = App;
