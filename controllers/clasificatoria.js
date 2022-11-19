fechaInicioMundial = new Date("2022-11-20 17:00");

$.ajax({
	method: "POST",
	url: "../models/obtenerPaises.php",
	success: function(paises){
		for(pais of paises){
			$(".selectPaises").append(
				$("<option>").val(pais.id).text(pais.nombre)
			);
		}
		if(fechaInicioMundial < new Date().getTime()){
			$(".selectPaises").attr('disabled','disabled');
		}
	},
	error(xhr,status,error){
		console.log(error)
	},
	dataType: "json",
	async: false
});

$.ajax({
	method: "POST",
	url: "../models/clasificatoria.php",
	success: function(result){
		console.log(result);
		if(result.length != 0){
			$("#puesto_1").val(result[0].puesto_1);
			$("#puesto_2").val(result[0].puesto_2);
			$("#puesto_3").val(result[0].puesto_3);
			$("#puesto_4").val(result[0].puesto_4);
		}
	},
	error(xhr,status,error){
		console.log(error)
	},
	dataType: "json"
});

if(fechaInicioMundial < new Date().getTime()){
	$("#guardarPorraClasificacion").hide();
}

$("#guardarPorraClasificacion").click(() => {
	if(fechaInicioMundial > new Date().getTime()){
		if(!hayRepetidos($("#puesto_1").val(),$("#puesto_2").val(),$("#puesto_3").val(),$("#puesto_4").val())){
			alert("No puedes poner un mismo pais en 2 puestos");
		}else{
			$.ajax({
				method: "POST",
				url: "../models/porraClasificatoria.php",
				data: {
					puesto_1 : $("#puesto_1").val(),
					puesto_2 : $("#puesto_2").val(),
					puesto_3 : $("#puesto_3").val(),
					puesto_4 : $("#puesto_4").val()
				},
				success: function(result){
					if(result.error){
						alert("Se ha producido un error al guardar la apuesta");
					}else{
						alert("Porra guardada");
					}
				},
				error(xhr,status,error){
					console.log(error)
				},
				dataType: "json"
			});
		}
	}else{
		alert("Ya no se aceptan más cambios en esta porra");
	}
});

function hayRepetidos(val1,val2,val3,val4){
	if(val1 != val2){
		if(val1 != val3){
			if(val1 != val4){
				if(val2 != val3){
					if(val2 != val4){
						if(val3 != val4){
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}

var intervalCountDownFechaPartido = setInterval(() => {
	var now = new Date().getTime();

	var distance = fechaInicioMundial - now;
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	$("#countdown-timer").text(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

	if (distance < 0) {
		clearInterval(intervalCountDownFechaPartido);
		$("#countdown-timer").text("Ya no puedes editar tu porra, el partido ha comenzado");
	}
}, 1000);