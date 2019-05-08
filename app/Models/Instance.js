"use strict";

const Model = use("Model");
const moment = require("moment");

class Instance extends Model {
	static get computed() {
		return ["created_at_format", "updated_at_format"];
	}

	getCreatedAtFormat({ created_at }) {
		return moment(created_at).format("DD/MM/YYYY HH:mm");
	}

	getUpdatedAtFormat({ updated_at }) {
		return moment(updated_at).format("DD/MM/YYYY HH:mm");
	}
}

module.exports = Instance;
