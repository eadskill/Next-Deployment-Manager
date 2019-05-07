"use strict";
const aws = require("aws-sdk");
const awsConfig = require("../../../config/aws");

/**
 * Resourceful controller for interacting with instances
 */
class InstanceController {
	/**
	 * Show a list of all instances.
	 * GET instances
	 */
	async index({ request, response, view }) {
		// Create Service Object EC2
		const ec2 = new aws.EC2({
			apiVersion: awsConfig.version,
			region: "us-east-2"
		});

		let instances = [];

		const instancesPromise = await ec2.describeInstances().promise();

		if (instancesPromise.Reservations.length > 0) {
			// Reservations
			instancesPromise.Reservations.forEach(function(reservation, index) {
				// Instances
				reservation.Instances.forEach(function(instance) {
					instances[index] = {
						instance_id: instance.InstanceId,
						instance_ip: instance.PublicIpAddress,
						instance_public_dns: instance.PublicDnsName
					};

					// Tags of Instance
					if (instance.Tags.length > 0) {
						instance.Tags.forEach(function(tag) {
							if (tag.Key.toLowerCase() == "name") {
								instances[index].instance_name = tag.Value;
							}
						});
					}
				});
			});
		}

		return view.render("frontend.instances.index", {
			instances
		});
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
