# Mão Core

`mao-core` is a library that can be used to implement microservices.


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

app.start().catch
(
	(error) =>
	{
		console.log(error.message);
	}
);


// Export app

module.exports = app;
```

Create the file `app/config/config.json` with the following content (don't forget to replace `"your-service-code"`):

```
{
	"mao":
	{
		"core":
		{
			"registry": {"ENV": "MAO_CORE_REGISTRY"},
			"service":
			{
				"name": "your-service-code",
				"url": {"ENV": "MAO_CORE_SERVICE_URL"}
			},
			"server":
			{		
				"host": {"ENV": "MAO_CORE_SERVER_HOST"},
				"port": {"ENV": "MAO_CORE_SERVER_PORT"}
			}
		}
	}
}
```

Create the file `app/config/api.yml` with the following content (don't forget to replace `"your-service-code"`). Every route registered in controllers must be defined there.

```
openapi: "3.0.3"
info:
  version: "1.0.0"
  title: "your-service-code"
  license:
    name: "MIT"
    url: "https://opensource.org/licenses/mit-license.php"
paths:
  /api/health/ready:
    get:
      description: "Check whether service is ready"
      responses:
        "200":
          description: "Service is ready"
```

Create the `.env` file with the following content:

```
MAO_CORE_REGISTRY=http://localhost:8080

MAO_CORE_SERVICE_URL=http://localhost:8081

MAO_CORE_SERVER_HOST=localhost
MAO_CORE_SERVER_PORT=8081
```

Install dependencies:

```
npm install
```

Start the app:

```
npm start
```
