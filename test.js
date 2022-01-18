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
			registry: `http://localhost:8080`,
			service: `mao-core-test`,
			server:
			{
				scheme: `http`,
				host: `localhost`,
				port: 8081
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
		axios.get(`http://localhost:8080/api/health/ready`)
		.then
		(
			(response) =>
			{
				if (response.status === 200)
				{
					console.log("Application is ready!");
				}
				else
				{
					throw "BWAAAH";
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
	}
);
