// External dependencies

const axios = require(`axios`);


/**
 *
 */

class ServiceClient
{
	/**
	 *
	 */

	async mapService(serviceCode)
	{
		// Call the GET /service API

		let result = await axios.get
		(
			`${global.config.mao.core.discovery}/api/service/${serviceCode}`
		);


		// Return the URL

		return result.data;
	}


	/**
	 *
	 */

	async waitForService(serviceUrl)
	{
		let status = null;
		let counter = 0;
		let max = 10;

		do
		{
			console.log(`Waiting for service ${serviceUrl} to be ready (${counter + 1}/${max})`);

			try
			{
				let result = await axios.get(`${global.config.mao.core.discovery}/api/health/ready`);
				status = result.status;
			}
			catch (error)
			{
			}
		}
		while
		(
			(status !== 200) &&
			(counter++ < max)
		);
	}


	/**
	 *
	 */

	async registerService(serviceCode, serviceUrl)
	{
		// Call the POST /service API

		await axios.post
		(
			`${global.config.mao.core.discovery}/api/service/${serviceCode}`,
			serviceUrl,
			{
				headers:
				{
					"content-type": `text/plain`
				}
			}
		);
	}


	/**
	 *
	 */

	async put(serviceCode, route, data)
	{
		// Map the service code with its URL

		let serviceUrl = await this.mapService(serviceCode);


		// Perform a PUT on the route

		let result = await axios.put
		(
			`${serviceUrl}${route}`,
			data,
			{
				headers:
				{
					"content-type": `application/json`
				}
			}
		);


		return result;
	}


	/**
	 *
	 */

	async post(serviceCode, route, data)
	{
		// Map the service code with its URL

		let serviceUrl = await this.mapService(serviceCode);


		// Perform a POST on the route

		let result = await axios.post
		(
			`${serviceUrl}${route}`,
			data,
			{
				headers:
				{
					"content-type": `application/json`
				}
			}
		);


		return result;
	}
}


// Export the class

module.exports = ServiceClient;
