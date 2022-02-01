// Internal dependencies

const Server = require(`./Server`);
const ServiceClient = require(`./clients/ServiceClient`);
const ConfigurationFactory = require(`./factories/ConfigurationFactory`);


/**
 *
 */

class App
{
	/**
	 *
	 */

	constructor(controllers, pathToConfiguration, pathToApiDefinition)
	{
		// Create the configuration

		new ConfigurationFactory().createConfiguration(pathToConfiguration);


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

		[
			`SIGHUP`,
			`SIGINT`,
			`SIGQUIT`,
			`SIGILL`,
			`SIGTRAP`,
			`SIGABRT`,
			`SIGBUS`,
			`SIGFPE`,
			`SIGUSR1`,
			`SIGSEGV`,
			`SIGUSR2`,
			`SIGTERM`
		].forEach
		(
			(signal) =>
			{
				process.on
				(
					signal,
					async () =>
					{
						await this.stop();
					}
				);
			}
		);
	}


	/**
	 *
	 */

	async stop()
	{
		// Log app stop

		console.log(`Stopping app...`);


		// Unregister service

		await this.unregister();


		// Stop the server
		
		this.server.stop();
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
