// External dependencies

const { When } = require(`@cucumber/cucumber`);
const axios = require(`axios`);


/**
 *
 */

When
(
	"I check whether the app is ready",
	async function()
	{
		// Call GET /api/health/ready

		this.response = await axios.get
		(
			`http://${global.config.mao.core.server.host}:${global.config.mao.core.server.port}/api/health/ready`
		);
	}
);


/**
 *
 */

When
(
	"I start and stop the app {int} times",
	async function(nbOccurences)
	{		
		for (let i = 0; i < nbOccurences; i++)
		{
			// Start the app

			await this.app.start();

			
			// Stop the app
			
			await this.app.stop();
		}
	}
);
