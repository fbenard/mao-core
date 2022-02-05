Feature: App health check

	Scenario: App is ready
		Given the app has been started
		When I check whether the app is ready
		Then the app is ready
		And the app can be stopped