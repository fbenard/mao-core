// External dependencies

const axios = require(`axios`);


// Internal dependencies

const ServiceClientMapServiceError = require(`./errors/ServiceClientMapServiceError`);
const ServiceClientRegisterServiceError = require(`./errors/ServiceClientRegisterServiceError`);
const ServiceClientPutError = require(`./errors/ServiceClientMapServiceError`);
const ServiceClientPostError = require(`./errors/ServiceClientMapServiceError`);


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
			throw new ServiceClientMapServiceError(serviceCode, error);
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
			throw new ServiceClientRegisterServiceError(serviceCode, serviceUrl, error);
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
			throw new ServiceClientPutError(serviceCode, route, data, error);
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
			throw new ServiceClientPostError(serviceCode, route, data, error);
		}
	}
}


// Export the class

module.exports = ServiceClient;
