const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')
const { healthCheckInfo, generateDonationPO } = require("./donation_client");
const { randomAmount, randomDesc} = require("./common");

let responseToCheck;
let propertiesBody;

// Given
Given('Donation Function running', async function() {
	responseToCheck = await healthCheckInfo();
	assert.strictEqual(responseToCheck.status, 200);
});

Given('valid properties body for donation service', async function() {
	propertiesBody = {
		"properties": {
			"amount": ""+randomAmount(),
			"description": randomDesc()
		}
	}
});

Given('bad properties body for donation service', async function() {
	propertiesBody = {
		"properties": {
			"amount": randomDesc(),
			"description": randomDesc()
		}
	}
});

// When
When('the service receives a request to generate a payment option', async function() {
	responseToCheck = await generateDonationPO(propertiesBody);
});

// Then 
Then('the organization gets the status code {int}', async function(status) {
	assert.strictEqual(responseToCheck.status, status);
});