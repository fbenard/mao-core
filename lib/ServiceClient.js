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
		//

		let serviceUrl = this.mapService(serviceCode);


		//

		let result = await axios.put
		(
			`${serviceUrl}${route}`,
			data,
			{
				headers: []
			}
		);


		return result;
	}
}


// Export the class

module.exports = ServiceClient;
