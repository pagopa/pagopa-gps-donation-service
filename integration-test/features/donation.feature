Feature: Create a Payment Option

  # Health check: The service is up and running
  Background:
    Given Donation Function running

  # Case OK
  Scenario: The service receives a request to generate a payment option
    Given valid properties body for donation service
    When the service receives a request to generate a payment option
    Then the organization gets the status code 200

  # Case KO: 400 - amount is not a number
  Scenario: The service receives a bad request to generate a payment option
    Given bad properties body for donation service
    When the service receives a request to generate a payment option
    Then the organization gets the status code 400
