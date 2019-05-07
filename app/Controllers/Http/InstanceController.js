"use strict";

/**
 * Resourceful controller for interacting with instances
 */
class InstanceController {
	/**
	 * Show a list of all instances.
	 * GET instances
	 */
	async index({ request, response, view }) {
		return view.render("frontend.instances.index");
	}

	/**
	 * Render a form to be used for creating a new instance.
	 * GET instances/create
	 */
	async create({ request, response, view }) {}

	/**
	 * Create/save a new instance.
	 * POST instances
	 */
	async store({ request, response }) {}

	/**
	 * Display a single instance.
	 * GET instances/:id
	 */
	async show({ params, request, response, view }) {}

	/**
	 * Render a form to update an existing instance.
	 * GET instances/:id/edit
	 */
	async edit({ params, request, response, view }) {}

	/**
	 * Update instance details.
	 * PUT or PATCH instances/:id
	 */
	async update({ params, request, response }) {}

	/**
	 * Delete a instance with id.
	 * DELETE instances/:id
	 */
	async destroy({ params, request, response }) {}
}

module.exports = InstanceController;
