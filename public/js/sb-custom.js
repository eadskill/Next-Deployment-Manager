$(document).ready(function() {
	$.ajaxSetup({
		headers: {
			"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
		}
	});

	/**
	 * TODO:
	 * Criar função para fazer requisição HTTP
	 */
	let NEXT = {
		callAjax: function(
			url,
			type,
			params,
			callbackBeforeSend,
			callbackSuccess,
			callbackError,
			callbackDone
		) {
			$.ajax({
				url: url,
				type: type,
				data: params,
				beforeSend: callbackBeforeSend,
				success: callbackSuccess,
				error: callbackError,
				donw: callbackDone
			});
		}
	};

	$(".send-command-server").on("click", function() {
		let command = $(this).data("command");
		let idclient = $("#idcliente").val();

		if (command == "pull" || command == "reset") {
			// Perguntar se tem certeza
		}

		NEXT.callAjax(
			"/deploy/",
			"POST",
			{
				command: command,
				id: idclient
			},
			beforeSuccessCommand,
			successCommand,
			function() {},
			function() {}
		);
	});

	function beforeSuccessCommand() {
		let loading = $("#loading-server");
		loading.show();
	}
	function successCommand(response) {
		let loading = $("#loading-server");
		let boxLog = $("#log-response-server");

		boxLog.prepend(response + "<br>");
		loading.hide();
	}
});
