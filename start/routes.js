"use strict";

const Route = use("Route");

Route.group(() => {
	Route.get("/", "DashboardController.index");
}).prefix("dashboard");

Route.resource("instances", "InstanceController");
Route.resource("clients", "ClientController");
