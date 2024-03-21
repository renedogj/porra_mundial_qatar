var archivo = window.location.pathname.split("/");
if(archivo[5] == undefined || archivo[5] == ""){
	var index = "";
	var controllers = "controllers/";
}else if(archivo[4] == "controllers"){
	var index = "../";
	var controllers = "";
}

$("#menu").append(
	$("<div>").addClass("div-menu-item").append(
		$("<a>")
			.attr("href",index).text("Inicio")
		),
	$("<div>").addClass("div-menu-item").append(
		$("<a>")
			.attr("href",controllers+"partidos.php")
			.text("Vota por partidos")
		),
	$("<div>").addClass("div-menu-item").append(
		$("<a>")
			.attr("href",controllers+"clasificatoria.php")
			.text("Vota el ganador")
		),
	$("<div>").addClass("div-menu-item").append(
		$("<a>")
			.attr("href",controllers+"clasificaciones.php")
			.text("Clasificacion de participantes")
		)
	);

$(document).ready(() => {
	$("div a img").hide();
})