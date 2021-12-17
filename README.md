# Mão Core

`mao-core` is a component that can be used to implement a new microservice.


## Getting started

Create a new Node.js project:

```
npm init
```

Create a directory for your project with the following structure:

```
- package.json
- app/
	- .env
	- index.js
	- config/
		- config.json
```

Edit the `package.json` file as follows:

```
"main": "app/index.js",
"scripts": {
  "start": "nodemon app/index.js"
},
"dependencies": {
	"mao-core": "^0.1.0"
},
"devDependencies": {
  "nodemon": "^2.0.15"
}
```

Create the file `app/index.js` with the following content:

```
// Internal dependencies

const App = require(`mao-core`).App;


// Create the app

let app = new App
(
	[
		// Create your controllers here
	]
);


// Start the app

app.start();
```

Create the file `app/config/config.json` with the following content:

```
{
	"mao":
	{
		"core":
		{
			"server":
			{		
				"host": {"ENV": "MAO_CORE_SERVER_HOST"},
				"port": {"ENV": "MAO_CORE_SERVER_PORT"}
			}
		}
	}
}
```

Create the `.env` file with the following content:

```
MAO_CORE_SERVER_HOST=localhost
MAO_CORE_SERVER_PORT=8080
```
