"use strict";

const Route = use("Route");

/**
 * Authentication
 */
Route.get("auth/logout", "AuthController.logout");
Route.resource("auth", "AuthController");

Route.get("/", ({ response }) => {
	return response.redirect("auth");
});

/**
 * Dashboard
 */
Route.group(() => {
	Route.get("/", "DashboardController.index");
}).prefix("dashboard");

Route.resource("instances", "InstanceController");
Route.resource("clients", "ClientController");
Route.resource("users", "UserController");

// Deploy
Route.post("deploy", "DeployController.store");
