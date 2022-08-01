import http from 'k6/http';

export function donationPaymentOptions(rootUrl, amount, description) {
	const url = `${rootUrl}`
	const payload = {
		"properties": {
			"amount": amount,
			"description": description
		}
	};

	return http.post(url, JSON.stringify(payload));
}
