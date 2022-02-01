Feature: App health check

	Scenario: Check health succeeds
		Given the app has been started
		When I check the app health
		Then the app is healthy
		And the app can be stopped