"use strict";

const Factory = use("Factory");
const User = use("App/Models/User");

class UserSeeder {
	async run() {
		User.create({
			name: "Diego Souza",
			username: "diego",
			email: "diego@eadskill.com.br",
			password: "alemanha"
		});
	}
}

module.exports = UserSeeder;
