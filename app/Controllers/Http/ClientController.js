"use strict";

const Client = use("App/Models/Instance");

class ClientController {
	async index({ view, response }) {
		const clients = await Client.all();

		return view.render("frontend.clients.index", {
			clients: clients.toJSON()
		});
	}
}

module.exports = ClientController;
