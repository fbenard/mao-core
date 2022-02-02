// External dependencies

const { When } = require(`@cucumber/cucumber`);
const axios = require(`axios`);


/**
 *
 */

When
(
	"I check the app health",
	async function()
	{
		// Call GET /api/health/ready

		this.response = await axios.get
		(
			`http://${global.config.mao.core.server.host}:${global.config.mao.core.server.port}/api/health/ready`
		);
	}
);
