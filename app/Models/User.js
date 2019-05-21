"use strict";

const Hash = use("Hash");
const Model = use("Model");
const moment = use("moment");

class User extends Model {
	static boot() {
		super.boot();

		this.addHook("beforeSave", async userInstance => {
			if (userInstance.dirty.password) {
				userInstance.password = await Hash.make(userInstance.password);
			}
		});
	}

	static get computed() {
		return ["created_at_format", "updated_at_format"];
	}

	getCreatedAtFormat({ created_at }) {
		return moment(created_at).format("DD/MM/YYYY HH:mm");
	}

	tokens() {
		return this.hasMany("App/Models/Token");
	}
}

module.exports = User;
