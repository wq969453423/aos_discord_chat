require('dotenv').config();

const config = {
	production: {
		backendApi: process.env.backendApi,
		channelId: process.env.channelId,
	},
};

const environment = process.env.NODE_ENV || 'development';
console.log(`Running in ${environment} mode`);
const settings = config[environment];

module.exports = settings;