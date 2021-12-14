// External dependencies

const dotenv = require(`dotenv`);


/**
 *
 */

class Config
{
	/**
	 *
	 */

	constructor()
	{
		// Load environment variables defined in .env

		dotenv.config();


		// Define environment if not yet defined

		if (!process.env.NODE_ENV)
		{
			process.env.NODE_ENV = "development";
		}


		// Load config

		global.config = require(`${process.cwd()}/app/config/config.json`);


		// Load config entries that are based on env variables

		this.loadConfig(global.config);
	}


	/**
	 *
	 */

	loadConfig(config)
	{
		// Parse each config entry

		for (let [key, value] of Object.entries(config))
		{
			// Only process objects

			if (typeof value === "object")
			{
				// For ENV entry, inject corresponding .env variable

				if (value.ENV)
				{
					config[key] = process.env[value.ENV];
				}


				// Recursively load children

				this.loadConfig(value);
			}
		}
	}
}


// Export class

module.exports = Config;
