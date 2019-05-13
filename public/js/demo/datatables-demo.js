$(document).ready(function() {
	$("#dataTableInstances").DataTable({
		language: {
			lengthMenu: "Mostrar _MENU_ registros por página",
			zeroRecords: "Nenhum registro encontrado.",
			info: "Mostrando _PAGE_ de _PAGES_",
			infoEmpty: "Nenhum registro encontrado.",
			infoFiltered: "(filtrado de _MAX_ registros)",
			loadingRecords: "Carregando...",
			processing: "Processando...",
			search: "Procurar:",
			paginate: {
				first: "Primeiro",
				last: "Último",
				next: "Próximo",
				previous: "Anterior"
			}
		}
	});

	/**
	 * TODO:
	 * Criar função para fazer requisição HTTP
	 */

	$(".send-command-server").on("click", function() {
		let boxLog = $("#log-response-server");
		let command = $(this).data("command");

		if (command == "pull" || command == "reset") {
			// Perguntar se tem certeza
		}

		$.ajax({
			type: "POST",
			url: "http://homologacao.lms.eadskill.com.br/api/deployment",
			data: {
				command: command,
				token: ""
			},
			success: function(response) {
				boxLog.append(response + "<br>");
			}
		});
	});
});
