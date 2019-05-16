"use strict";

const Schema = use("Schema");

class InstanceSchema extends Schema {
	up() {
		this.create("instances", table => {
			table.increments();
			table.string("name", 50);
			table.string("url", 150);
			table.string("instance_id", 30);
			table.string("version", 10);
			table.string("build", 10);
			table.timestamps();
		});
	}

	down() {
		this.drop("instances");
	}
}

module.exports = InstanceSchema;
