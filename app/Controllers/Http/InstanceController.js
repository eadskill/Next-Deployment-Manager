"use strict";

const aws = require("aws-sdk");
const awsConfig = require("../../../config/aws");
const Client = use("App/Models/Instance");

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

		try {
			// List instances
			const instancesPromise = await ec2.describeInstances().promise();

			if (instancesPromise.Reservations.length > 0) {
				// Reservations
				instancesPromise.Reservations.forEach(function(
					reservation,
					index
				) {
					// Instances
					reservation.Instances.forEach(function(instance) {
						instances[index] = {
							instance_id: instance.InstanceId,
							instance_ip: instance.PublicIpAddress,
							instance_type: instance.InstanceType
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
		} catch (err) {
			return response.redirect("/dashboard");
		}
	}

	/**
	 * Display a single instance.
	 * GET instances/:id
	 */
	async show({ params, request, response, view }) {}

	/**
	 * Display a single instance.
	 * GET instances/:id
	 */
	async edit({ params, request, response, view }) {
		// Create Service Object EC2
		const ec2 = new aws.EC2({
			apiVersion: awsConfig.version,
			region: "us-east-2"
		});

		const query = {
			InstanceIds: [params.id]
		};

		try {
			// Instance
			const instanceResponse = await ec2
				.describeInstances(query)
				.promise();

			const instance = instanceResponse.Reservations[0].Instances[0];

			// Tags of Instance
			if (instance.Tags.length > 0) {
				instance.Tags.forEach(function(tag) {
					if (tag.Key.toLowerCase() == "name") {
						instance.instance_name = tag.Value;
					}
				});
			}

			return view.render("frontend.instances.edit", {
				instance
			});
		} catch (err) {
			return response.redirect("/instances");
		}
	}

	async update({ params, request, response }) {
		const { name, isnext } = request.all();

		const client = await Client.query()
			.where("instance_id", params.id)
			.getCount();

		// Se o cliente existir e a opção for 2
		if (client > 0 && isnext == 2) {
			client.delete();
		}

		// Se o cliente não existir e a opção for 1
		if (client == 0 && isnext == 1) {
			await Client.create({
				name,
				instance_id: params.id
			});
		}

		return response.redirect("/clients");
	}
}

module.exports = InstanceController;
