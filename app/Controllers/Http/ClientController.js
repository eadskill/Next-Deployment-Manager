"use strict";

class ClientController {
	async index({ view }) {
		return view.render("frontend.clients.index");
	}
}

module.exports = ClientController;
