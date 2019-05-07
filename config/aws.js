"use strict";
const Env = use("Env");

module.exports = {
	version: "2016-11-15",

	awsAccessKeyId: Env.get("AWS_ACCESS_KEY_ID"),

	awsSecretAccessKey: Env.get("AWS_SECRET_ACCESS_KEY"),

	awsSessionToken: Env.get("AWS_SESSION_TOKEN")
};
