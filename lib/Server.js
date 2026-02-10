// External dependencies

const express = require(`express`);
const OpenApiValidator = require(`express-openapi-validator`);


// Internal dependencies

const HealthController = require(`./controllers/HealthController`);


/**
 *
 */

class Server
{
	/**
	 *
	 */

	constructor(host, port, controllers, pathToApiDefinition)
	{
		// Make sure controllers is an array

		if (Array.isArray(controllers) === false)
		{
			controllers = [];
		}

		
		// Add core controller

		controllers.unshift(new HealthController());


		// Store attributes

		this.host = host;
		this.port = port;
		this.controllers = controllers;


		// Create an Express instance

		this.express = express();


		// If no custom path to configuration given
		// Use the default one

		if (!pathToApiDefinition)
		{
			pathToApiDefinition = `${process.cwd()}/app/config/api.yml`;
		}


		// Define middlewares

		this.express.use(express.json());
		this.express.use(express.text());

		this.express.use
		(
			OpenApiValidator.middleware
			(
				{
					apiSpec: pathToApiDefinition,
					validateRequests: true,
					validateResponses: true
				}
			)
		);


		// Build routes

		this.buildRoutes();


		// Handle errors

		this.express.use(this.handleError);
	}


	/**
	 *
	 */

	handleError(error, request, response, next)
	{
		// If headers already sent, just follow-through

		if (response.headersSent)
		{
			return next(error);
		}

		
		// Build the error response

		if (request.accepts(`html`) === true)
		{
			return response.render
			(
				`error`,
				{
					error: error
				}
			);
		}
		else
		{
			return response
			.status(error.status)
			.send(error.message);
		}
	}


	/**
	 *
	 */

	buildRoutes()
	{
		// Create router

		let router = express.Router();


		// Register routes of controllers

		this.controllers.forEach
		(
			(controller) =>
			{
				controller.registerRoutes(router);
			}
		);


		// Tell the app to use the router

		this.express.use
		(
			`/`,
			router
		);
	}


	/**
	 *
	 */

	async start()
	{
		// Encapsulate the server listening process inside a promise

		await new Promise
		(
			(resolve, reject) =>
			{
				// Start listening

				this.listener = this.express.listen
				(
					this.port,
					this.host
				);


				// Listen for the listening event

				this.listener.once
				(
					`listening`,
					() =>
					{
						// Resolve the promise

						resolve();
					}
				);


				// Listen for the error event

				this.listener.once
				(
					`error`,
					(error) =>
					{
						// Log the error

						console.log(`HTTP server could not start listening (%s)`, error);
						
						
						// Reject the promise

						reject(error);
					}
				);
			}
		);
	}


	/**
	 *
	 */

	async stop()
	{
		// Encapsulate the server listening process inside a promise

		await new Promise
		(
			(resolve, reject) =>
			{
				// Stop listening
				
				this.listener.close();


				// Listen for the error event

				this.listener.once
				(
					`close`,
					() =>
					{
						// Resolve the promise

						resolve();
					}
				);


				// Listen for the error event

				this.listener.once
				(
					`error`,
					(error) =>
					{
						// Log the error

						console.log(`HTTP server could not stop listening (%s)`, error);
						
						
						// Reject the promise

						reject(error);
					}
				);
			}
		);
	}
}


// Export class

module.exports = Server;
