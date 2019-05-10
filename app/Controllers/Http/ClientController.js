"use strict";

const Client = use("App/Models/Instance");

class ClientController {
	async index({ view, response }) {
		const clients = await Client.all();

		return view.render("frontend.clients.index", {
			clients: clients.toJSON()
		});
	}

	async edit({ params, view, request, response }) {
		const { idcliente } = params.id;

		return view.render("frontend.clients.edit");
	}

	async show({ view }) {
		return view.render("frontend.clients.show");
	}
}

module.exports = ClientController;
