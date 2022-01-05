// External dependencies

const App = require(`./lib/App`);


// Create the app

let app = new App();


// Start the app

app.start().catch
(
	(error) =>
	{
		console.log(error.message);
	}
);
