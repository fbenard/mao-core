// External dependencies

const dotenv = require(`dotenv`);
const fs = require(`fs`);


/**
 *
 */

class Config
{
	/**
	 *
	 */

	constructor(config)
	{
		// Load environment variables defined in .env

		dotenv.config();


		// Define environment if not yet defined

		if (!process.env.NODE_ENV)
		{
			process.env.NODE_ENV = "development";
		}


		// Use config

		if (config)
		{
			global.config = config;
		}


		// Check whether configuration file exists

		let pathToConfig = `${process.cwd()}/app/config/config.json`;

		if (fs.existsSync(pathToConfig) === true)
		{
			// Load configuration

			global.config = JSON.parse(fs.readFileSync(pathToConfig));


			// Load configuration entries that are based on env variables

			this.loadConfig(global.config);
		}
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
