"use strict";

class UserController {
	async index({ view }) {
		return view.render("frontend.users.index");
	}
}

module.exports = UserController;
