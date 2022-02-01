// External dependencies

const dotenv = require(`dotenv`);
const fs = require(`fs`);


/**
 *
 */

class ConfigurationFactory
{
	/**
	 *
	 */

	createConfiguration(pathToConfiguration)
	{
		// Load environment variables defined in .env

		dotenv.config();


		// Define environment if not yet defined

		if (!process.env.NODE_ENV)
		{
			process.env.NODE_ENV = "development";
		}


		// If no custom path to configuration given
		// Use the default one

		if (!pathToConfiguration)
		{
			pathToConfiguration = `${process.cwd()}/app/config/config.json`;
		}


		// Check whether configuration file exists

		if (fs.existsSync(pathToConfiguration) === true)
		{
			// Load configuration

			global.config = JSON.parse(fs.readFileSync(pathToConfiguration));


			// Populate configuration entries that are based on env variables

			this.populateConfiguration(global.config);
		}
	}


	/**
	 *
	 */

	populateConfiguration(configuration)
	{
		// Parse each config entry

		for (let [key, value] of Object.entries(configuration))
		{
			// Only process objects

			if (typeof value === "object")
			{
				// For ENV entry, inject corresponding .env variable

				if (value.ENV)
				{
					configuration[key] = process.env[value.ENV];
				}


				// Recursively load children

				this.populateConfiguration(value);
			}
		}
	}
}


// Export class

module.exports = ConfigurationFactory;
