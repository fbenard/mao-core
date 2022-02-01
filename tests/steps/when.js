// External dependencies

const axios = require(`axios`);
const { When } = require(`@cucumber/cucumber`);


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
			`${global.config.mao.core.server.scheme}://${global.config.mao.core.server.host}:${global.config.mao.core.server.port}/api/health/ready`
		);
	}
);
