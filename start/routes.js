"use strict";

const Route = use("Route");

Route.get("/", ({ response }) => {
	return response.redirect("dashboard");
});

Route.group(() => {
	Route.get("/", "DashboardController.index");
}).prefix("dashboard");

Route.resource("instances", "InstanceController");
Route.resource("clients", "ClientController");
Route.resource("users", "UserController");

// Deploy
Route.post("deploy", "DeployController.store");
