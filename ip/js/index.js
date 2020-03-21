$(document).ready(function () {
	function number_format(amount, decimals) {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
    	return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split(','),
    regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
    	amount_parts[0] = amount_parts[0].replace(regexp, '$1' + '.' + '$2');

    return amount_parts.join(',');
}


function verificacionBinario(bin) {
	while (bin.length < 8){
		bin = "0" + bin;
	}
	return bin;
}

function completarIp(red) {
	while(red.length < 32){
		red += "0";
	}
	return red;
}
function completarIpBroadcast(red) {
	while(red.length < 32){
		red += "1";
	}
	return red;
}

$( "#form-ip" ).submit(function( event ) {
	event.preventDefault();
	var ip1 = $("#ip1").val();
	var ip2 = $("#ip2").val();
	var mascara = $("#mascara").val();
	if (ip1 != "" && ip2 != "" && mascara != "") {
		try{
			var arrayIp1 = ip1.split(".");
			var arrayIp2 = ip2.split(".");
			var arrayMascara = mascara.split(".");
			var c = "";
			arrayMascara.forEach( x => {
				c +=  verificacionBinario(parseInt(x).toString(2));
			});
			var mask = 0;
			for (var i = 0; i < c.length; i++) {
				if(c[i] == "1"){
					mask += 1;
				}
			}
			var binIp1 = "";
			arrayIp1.forEach( x => {
				binIp1 +=  verificacionBinario(parseInt(x).toString(2));
			});
			var binIp2 = "";
			arrayIp2.forEach( x => {
				binIp2 +=  verificacionBinario(parseInt(x).toString(2));
			});
			var red1 = binIp1.substring(0, mask);
			var red2 = binIp2.substring(0, mask);
			if(red1 == red2){
				var red = completarIp(red1);
				var redCompleta = parseInt(red.substring(0,8),2).toString()+
				"." + parseInt(red.substring(8,16),2).toString() +
				"." + parseInt(red.substring(16,24),2).toString() +
				"." + parseInt(red.substring(24,32),2).toString() +
				"/" + mask.toString();


				var ipBroadcast = completarIpBroadcast(red1);
				var broadcast = parseInt(ipBroadcast.substring(0,8),2).toString()+
				"." + parseInt(ipBroadcast.substring(8,16),2).toString() +
				"." + parseInt(ipBroadcast.substring(16,24),2).toString() +
				"." + parseInt(ipBroadcast.substring(24,32),2).toString();

				var numeroDeUsuarios = number_format(Math.pow(2, (32 - mask)) - 2);

				Swal.fire({
					icon: 'success',
					title: 'Respuesta',
					html: `<h4>redes pertenecen a la misma red:</h4><ul><li>DIRECCION DE RED: ${redCompleta}</li><li>BROADCAST: ${broadcast}</li><li>USUARIOS: ${numeroDeUsuarios}</li></ul>`
				})

					/*
					datos a imprimir:
					redCompleta
					broadcast
					numeroDeUsuarios
					*/

				}else{
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Las redes no pertenecen a la misma red'
					})
				}



			}catch(error){
				console.error(error);
			}
		}else if((ip1 != "" && mascara != "")){
			try{
				var arrayIp1 = ip1.split(".");
				var arrayMascara = mascara.split(".");
				var c = "";
				arrayMascara.forEach( x => {
					c +=  verificacionBinario(parseInt(x).toString(2));
				});
				var mask = 0;
				for (var i = 0; i < c.length; i++) {
					if(c[i] == "1"){
						mask += 1;
					}
				}
				var binIp1 = "";
				arrayIp1.forEach( x => {
					binIp1 +=  verificacionBinario(parseInt(x).toString(2));
				});
				var red1 = binIp1.substring(0, mask);
				var red = completarIp(red1);
				var redCompleta = parseInt(red.substring(0,8),2).toString()+
				"." + parseInt(red.substring(8,16),2).toString() +
				"." + parseInt(red.substring(16,24),2).toString() +
				"." + parseInt(red.substring(24,32),2).toString() +
				"/" + mask.toString();


				var ipBroadcast = completarIpBroadcast(red1);
				var broadcast = parseInt(ipBroadcast.substring(0,8),2).toString()+
				"." + parseInt(ipBroadcast.substring(8,16),2).toString() +
				"." + parseInt(ipBroadcast.substring(16,24),2).toString() +
				"." + parseInt(ipBroadcast.substring(24,32),2).toString();

				var numeroDeUsuarios = number_format(Math.pow(2, (32 - mask)) - 2);

				Swal.fire({
					icon: 'success',
					title: 'Respuesta',
					html: `<ul><li>DIRECCION DE RED: ${redCompleta}</li><li>BROADCAST: ${broadcast}</li><li>USUARIOS: ${numeroDeUsuarios}</li></ul>`
				})

					/*
					datos a imprimir:
					redCompleta
					broadcast
					numeroDeUsuarios
					*/



				}catch(error){
					console.error(error);
				}
			}

		});
});