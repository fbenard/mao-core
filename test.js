// External dependencies

const axios = require(`axios`);


// Internal dependencies

const App = require(`./lib/App`);


//

let config =
{
	mao:
	{
		core:
		{
			service: `mao-core-test`,
			server:
			{
				scheme: `http`,
				host: `localhost`,
				port: 8080
			}
		}
	}
}


// Create the app

let app = new App([], config);


// Start the app

app.start()
.then
(
	() =>
	{
		axios.get(`${global.config.mao.core.server.scheme}://${global.config.mao.core.server.host}:${global.config.mao.core.server.port}/api/health/ready`)
		.then
		(
			(response) =>
			{
				if (response.status === 200)
				{
					console.log(`Great success! Application is ready!`);
					process.exit(0);
				}
				else
				{
					console.log(`Error: application is not ready`);
					process.exit(1);
				}
			}
		);
	}
)
.catch
(
	(error) =>
	{
		console.log(error);
		process.exit(2);
	}
);
