// Internal dependencies

const RouteVerbNotSupportedError = require(`../errors/RouteVerbNotSupportedError`);


/**
 *
 */

class BaseController
{
	/**
	 * 
	 */

	constructor(routes)
	{
		// Store routes

		this.routes = routes;
	}


	/**
	 *
	 */

	registerRoutes(router)
	{
		// Parse each route

		this.routes.forEach
		(
			(route) =>
			{
				// Register the route

				if (route.verb === `delete`)
				{
					this.registerDeleteRoute(router, route.uri, route.action);
				}
				else if (route.verb === `get`)
				{
					this.registerGetRoute(router, route.uri, route.action);
				}
				else if (route.verb === `post`)
				{
					this.registerPostRoute(router, route.uri, route.action);
				}
				else if (route.verb === `put`)
				{
					this.registerPutRoute(router, route.uri, route.action);
				}
				else
				{
					throw new RouteVerbNotSupportedError(route.verb, route.uri);
				}
			}
		);
	}


	/**
	 *
	 */

	sendError(request, response, next, status, error)
	{
		// Log error

		console.log(error);


		// Send error
		
		response.status(status).send
		(
			{
				timestamp: new Date().toISOString(),
				path: request.originalUrl
			}
		);
	}


	/**
	 * 
	 */

	registerDeleteRoute(router, uri, action)
	{
		router.delete
		(
			uri,
			async (request, response, next) =>
			{
				try
				{
					// Run the action

					await action.run(request, response, next);
				}
				catch (error)
				{
					// Send error
					
					this.sendError
					(
						request,
						response,
						next,
						500,
						error
					);
				}
			}
		);
	}


	/**
	 * 
	 */

	registerGetRoute(router, uri, action)
	{
		router.get
		(
			uri,
			async (request, response, next) =>
			{
				try
				{
					// Run the action

					await action.run(request, response, next);
				}
				catch (error)
				{
					// Send error
					
					this.sendError
					(
						request,
						response,
						next,
						500,
						error
					);
				}
			}
		);
	}


	/**
	 * 
	 */

	registerPostRoute(router, uri, action)
	{
		router.post
		(
			uri,
			async (request, response, next) =>
			{
				try
				{
					// Run the action

					await action.run(request, response, next);
				}
				catch (error)
				{
					// Send error
					
					this.sendError
					(
						request,
						response,
						next,
						500,
						error
					);
				}
			}
		);
	}


	/**
	 * 
	 */

	registerPutRoute(router, uri, action)
	{
		router.put
		(
			uri,
			async (request, response, next) =>
			{
				try
				{
					// Run the action

					await action.run(request, response, next);
				}
				catch (error)
				{
					// Send error
					
					this.sendError
					(
						request,
						response,
						next,
						500,
						error
					);
				}
			}
		);
	}
}


// Export the class

module.exports = BaseController;
