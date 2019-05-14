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

	/**
	 * Limpar log do servidor
	 */
	$("#clear-log").on("click", function() {
		clearLog();
	});

	function clearLog() {
		let boxLog = $("#log-response-server");
		boxLog.html("");
	}

	/**
	 * Envia comando para o servidor
	 */
	$(".send-command-server").on("click", function() {
		sendCommandServer(this);
	});

	function sendCommandServer(self) {
		let command = $(self).data("command");
		let idclient = $("#idcliente").val();

		if (command == "pull" || command == "reset" || command == "stash") {
			Swal.fire({
				title: "Você tem certeza dessa ação?",
				text: "Executar essa ação poderá afetar a plataforma.",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Do It!",
				cancelButtonText: "Cancelar"
			}).then(result => {
				if (result.value) {
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
				}
			});
		} else {
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
		}
	}

	function beforeSuccessCommand() {
		let loading = $("#loading-server");
		loading.show();
	}

	function successCommand(response) {
		let loading = $("#loading-server");
		let boxLog = $("#log-response-server");

		boxLog.find("code").append(response.replace(/'/g, ""));

		hljs.initHighlighting();

		boxLog.scrollTop(boxLog.find("pre").height());

		loading.hide();
	}
});
