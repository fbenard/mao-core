// External dependencies

const axios = require(`axios`);


// Internal dependencies

const MapServiceFailedError = require(`../errors/MapServiceFailedError`);
const RegisterServiceFailedError = require(`../errors/RegisterServiceFailedError`);
const UnregisterServiceFailedError = require(`../errors/UnregisterServiceFailedError`);
const PutToServiceFailedError = require(`../errors/MapServiceFailedError`);
const PostToServiceFailedError = require(`../errors/MapServiceFailedError`);


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
				`${global.config.mao.core.registry}/api/service/${serviceCode}`
			);


			// Return the URL

			return result.data;
		}
		catch (error)
		{
			throw new MapServiceFailedError(serviceCode, error);
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
				`${global.config.mao.core.registry}/api/service/${serviceCode}`,
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
			throw new RegisterServiceFailedError(serviceCode, serviceUrl, error);
		}
	}


	/**
	 *
	 */

	async unregisterService(serviceCode, serviceUrl)
	{
		try
		{		
			// Call the POST /service API

			await axios.delete
			(
				`${global.config.mao.core.registry}/api/service/${serviceCode}`
			);
		}
		catch (error)
		{
			throw new UnregisterServiceFailedError(serviceCode, error);
		}
	}


	/**
	 *
	 */

	async put(serviceCode, route, data)
	{
		try
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
		catch (error)
		{
			throw new PutToServiceFailedError(serviceCode, route, data, error);
		}
	}


	/**
	 *
	 */

	async post(serviceCode, route, data)
	{
		try
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
		catch (error)
		{
			throw new PostToServiceFailedError(serviceCode, route, data, error);
		}
	}
}


// Export the class

module.exports = ServiceClient;
