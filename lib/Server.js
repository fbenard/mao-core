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

	start()
	{
		// Start listening

		this.listener = this.express.listen
		(
			this.port,
			this.host
		);


		// Log server start

		console.log
		(
			`HTTP server is running on http://%s:%d`,
			this.host,
			this.port
		);
	}


	/**
	 *
	 */

	stop()
	{
		// Stop listening
		
		this.listener.close();
	}
}


// Export class

module.exports = Server;
