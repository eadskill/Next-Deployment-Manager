"use strict";

const aws = require("aws-sdk");
const awsConfig = require("../../../config/aws");
const Client = use("App/Models/Instance");
const httpRequest = use("axios");

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
		const { name, protocol, url } = request.all();
		const client = await Client.query()
			.where("instance_id", params.id)
			.getCount();

		// Se o cliente existir redireciona
		if (client > 0) {
			return response.redirect("/clients");
		}

		/**
		 * Fazer requisição para o server do NEXT para saber a versão atual da plataforma para gravar na base
		 */
		const version = await httpRequest.get(
			`${protocol}://${url}/deployment/version`
		);

		// Se o cliente não existir
		if (client == 0) {
			await Client.create({
				name,
				instance_id: params.id,
				url: `${protocol}://${url}`,
				version: version.data.version || null,
				build: version.data.build || null
			});
		}

		return response.redirect("/clients");
	}
}

module.exports = InstanceController;
