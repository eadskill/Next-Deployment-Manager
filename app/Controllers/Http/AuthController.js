"use strict";

class AuthController {
	async index({ view, auth }) {
		return view.render("frontend.auth.login");
	}

	async store({ session, request, response, auth }) {
		const { email, password } = request.all();

		try {
			await auth.attempt(email, password);

			return response.redirect("dashboard");
		} catch (err) {
			session.flash({
				error: "Credenciais inválidas."
			});

			return response.redirect("auth");
		}
	}

	async logout({ response, auth }) {
		await auth.logout();

		return response.redirect("/");
	}
}

module.exports = AuthController;
