// External dependencies

const express = require(`express`);


// Internal dependencies

const HealthController = require(`./HealthController`);


/**
 *
 */

class Server
{
	/**
	 *
	 */

	constructor(host, port, controllers)
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


		// Define middlewares

		this.express.use(express.json());
		this.express.use(express.text());


		// Build routes

		this.buildRoutes();


		// Handle errors

		this.express.use(this.handleError);
	}


	/**
	 *
	 */

	get host()
	{
		return this._host;
	}


	/**
	 *
	 */

	set host(host)
	{
		this._host = host;
	}


	/**
	 *
	 */

	get port()
	{
		return this._port;
	}


	/**
	 *
	 */

	set port(port)
	{
		this._port = port;
	}


	/**
	 *
	 */

	get controllers()
	{
		return this._controllers;
	}


	/**
	 *
	 */

	set controllers(controllers)
	{
		this._controllers = controllers;
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
		// Encapsulate function inside a promise

		let promise = new Promise
		(
			(resolve, reject) =>
			{
				// Start listening

				this.listener = this.express.listen
				(
					this.port,
					this.host,
					(error) =>
					{
						if (error)
						{
							// Reject the promise

							return reject(error);
						}
						else
						{
							// Log server start

							console.log
							(
								`HTTP server is running on http://%s:%d`,
								this.host,
								this.port
							);


							// Resolve the promise

							return resolve();
						}
					}
				);
			}
		);


		return promise;
	}


	/**
	 *
	 */

	async stop()
	{
		// Encapsulate function inside a promise

		let promise = new Promise
		(
			(resolve, reject) =>
			{
				// Stop listening
				
				this.listener.close
				(
					(error) =>
					{
						if (error)
						{
							// Reject the promise

							return reject(error);
						}
						else
						{
							// Resolve the promise

							return resolve();
						}
					}
				);
			}
		);


		return promise;
	}
}


// Export class

module.exports = Server;
