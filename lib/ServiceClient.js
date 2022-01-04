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
		try
		{
			// Call the GET /service API

			let result = await axios.get
			(
				`${global.config.mao.core.discovery}/api/service/${serviceCode}`
			);


			// Return the URL

			return result.data;
		}
		catch (error)
		{
			throw "ServiceClient.mapService() failed: " + error.message;
		}
	}


	/**
	 *
	 */

	async registerService(serviceCode, serviceUrl)
	{
		try
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
		catch (error)
		{
			throw "ServiceClient.mapService() failed: " + error.message;
		}
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
