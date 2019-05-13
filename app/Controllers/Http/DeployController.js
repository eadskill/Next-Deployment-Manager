"use strict";

const httpRequest = use("axios");
const Client = use("App/Models/Instance");

class DeployController {
	async index({ response }) {}

	async store({ params, request, response }) {
		const { id, command } = request.all();

		const client = await Client.find(id);

		const server = await httpRequest.post(`${client.url}/api/deployment`, {
			command: command
		});

		return response.send(server.data);
	}
}

module.exports = DeployController;
