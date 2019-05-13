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
});
