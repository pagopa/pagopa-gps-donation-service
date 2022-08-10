const { get, post } = require("./common");

function healthCheckInfo() {
	return get(`/donations/info`)
}

function generateDonationPO(body) {
	return post(`/donations/paymentoptions`, body)
}

module.exports = {
	healthCheckInfo,
	generateDonationPO
}
