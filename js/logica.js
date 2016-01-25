/*
* Lògica joc Tres en Ratlla
* Desenvolupat per Hugo Moragues
* 26/09/2015
*/

//inicialització variables
//funció constructora
function Partida(tornActual, tenimGuanyador, contadorCasellesBuides, posicioActual, graella, fiPartida, nomJugador1, nomJugador2) {
	this.tornActual				=	tornActual;
	this.tenimGuanyador			=	tenimGuanyador;
	this.contadorCasellesBuides	=	contadorCasellesBuides;
	this.posicioActual			=	posicioActual;
	this.graella				=	graella;
	this.fiPartida				=	fiPartida;
	this.nomJugador1			=	nomJugador1;
	this.nomJugador2			=	nomJugador2
}
//objecte partida
var partida = new Partida(
	null,
	false,
	0,
	"",
	[[0,0,0],[0,0,0],[0,0,0]],
	"<span class='fi'>Fi de la partida!</span>",
	"",
	"");

var tornActual=null;
var tenimGuanyador = false;
var contadorCasellesBuides = 0;
var posicioActual="";
//tres files amb tres caselles, fàcil fins ara, no?
var graella = [[0,0,0],[0,0,0],[0,0,0]];
var fiPartida = "<span class='fi'>Fi de la partida!</span>";
var nomJugador1;
var nomJugador2;
//$('.casella').css('backgroundColor','black');

function tornSeguent() {
	/*	actualitza el jugador actual
	*	t: torn actual, j1: jugador 1, j2: jugador 2
	*/
	var tornJugador1 = "<p class='missatgeInfo'>És el torn de <b>"+ nomJugador1 +"</b></p>";
	var tornJugador2 = "<p class='missatgeInfo'>És el torn de <b>"+ nomJugador2 +"</b></p>";
	if(tornActual==nomJugador1) {
		tornActual=nomJugador2;
		mostrarMissatge(tornJugador2)
	}
	else {
		tornActual=nomJugador1;
		mostrarMissatge(tornJugador1)
	}
}

function casellesRemanents(cm) {
	/* true si encara romanen caselles sense ocupar
	*/
	return cm < 9;
}

function mostrarMissatge(m) {
	// Funció per mostrar missatges
	$('#missatge').html(m);
}

function inicialitzar() {
	/*	Aquesta funció ens permet assignar el torn inicial
	*	j1: jugador 1, j2: jugdor 2, t: torn actual
	*/
	
	// Inicialització 
	tornActual=null;
	tenimGuanyador = false;
	graella=[[0,0,0],[0,0,0],[0,0,0]]
	contadorCasellesBuides = 0;
	mostrarMissatge("");
	posicioActual="";
	$('.casella').css('backgroundColor','black');
	// Assignació 'random' del torn
	var r = Math.floor((Math.random() * 2) + 1);
	if(r===1) {
		tornActual = nomJugador1;
		mostrarMissatge("<p class='missatgeInfo'>És el torn de <b>"+ tornActual +"</b></p>");
	}
	else 
	{
		tornActual = nomJugador2;
		mostrarMissatge("<p class='missatgeInfo'>És el torn de <b>"+ tornActual +"</b></p>");
	}
	$('.graella').show();
}

function checkClick(c, g, t, j1, j2, cm) {
	/*	Aquesta funció comprova si la casella pitjada ja ha estat assignada a un jugador,
	*	en cas que no estigui ocupada, es marca amb el color del jugador.
	*	c: casella pitjada, g: graella, t: torn actual,
	*	j1: jugador 1, j2: jugador 2, ct: contador de torns
	*/
	var error = "<p class='error'>La casella pitjada ja la tenim ocupada.</p>";
	var a = "#"+c;
	if(graella[c.substring(0,1)][c.substring(2,3)]==j1 || graella[c.substring(0,1)][c.substring(2,3)]==j2)
	{
		mostrarMissatge(error);
		return false;
	}
	switch(t) {
		case j1:
		//var selector = '#'
		$(a).css('backgroundColor','green');
		$(a).addClass('seleccionat');
		break;
		case j2:
		$(a).css('backgroundColor','red');
		$(a).addClass('seleccionat');
		break;
	}	
	return true;
}

function pintarCasella() {
	if(tornActual==nomJugador1)
	{
		document.getElementById(posicioActual).style.backgroundColor = "red";
	}
	else
	{
		document.getElementById(posicioActual).style.backgroundColor = "green";
	}
}

function setClick(c, g, j, j1, j2, cm) {
	/*	Aquesta funció ens permet assignar una casella al jugador 1 o 2
	*	c: casella pitjada, g: graella, j: jugador actual,
	*	j1: jugador1, j2: jugador 2, cm: contador de moviments
	*/
	var fiPartida = "<p clas='fi'>Fi de la partida!</p>";
	if(!casellesRemanents(cm))
	{
		mostrarMissatge(fiPartida);
		return;
	}
	if(checkClick(c, g, j, j1, j2, cm))
	{
		switch (c)
		{
			case "0,0":
			graella[0][0]=j;
			break;
			case "0,1":
			graella[0][1]=j;
			break;
			case "0,2":
			graella[0][2]=j;
			break;
			case "1,0":
			graella[1][0]=j;
			break;
			case "1,1":
			graella[1][1]=j;
			break;
			case "1,2":
			graella[1][2]=j;
			break;
			case "2,0":
			graella[2][0]=j;
			break;
			case "2,1":
			graella[2][1]=j;
			break;
			case "2,2":
			graella[2][2]=j;
			break;
		}
		pintarCasella();
		contadorCasellesBuides++;
		
		if(!comprovarGuanyador(g,j))
			tornSeguent();
		else
			return;
	}
	return;
}

function comprovarFiles(g,j) {
	var ok=0;
	for(var i=0;i<g.length;i++)
	{
		for(var k=0;k<graella.length;k++)
		{
			if(graella[i][k]==j)
			{
				ok++;
			}
		}
		if(ok==3)
		{
			//ja tenim guanyador
			//alert("files");
			return true;	
		}
		ok = 0;
	}
	return false;
}


function comprovarColumnes(g,j) {
	var ok=0;
	for(var k=0;k<g.length;k++)
	{
		for (var i=0;i<g.length;i++)
		{
			if(graella[i][k]==j) ok++;	
		}
		if (ok==3)
		{
			//alert("columnes");
			return true;
		}
		ok=0;
	}
	return false;
}

function comprovarDiagonals(g,j) {
	var ok=0;
	for(var i=0;i<g.length;i++)
	{
		if(graella[i][i]==j)
		{
			ok++;
		}
	}
	if(ok==3) {
		//alert("diagona1");

		return true;
	}
	else
	{
		ok=0;
		var k=2;
		for(var i=0;i<g.length;i++)
		{
			if(graella[i][k]==j)
			{
				ok++;
			}
			k--;
		}
		if(ok==3){
			//alert("diagona2");
			return true;
		}
		else return false;
	}
}

function comprovarGuanyador(g,j) {
	/* aquesta altre ens permet comprovar si el jugador actual ha guanyat
	*g: graella, j: jugador actual
	*/
	var guanyador = "<p class='exit'>El jugador <b>"+j+"</b> ha guanyat!</p>";
	if(comprovarFiles(g,j) || comprovarColumnes(g,j) || comprovarDiagonals(g,j))
	{
		mostrarMissatge(guanyador);
		return true;
	}
	else
	{
		if(!casellesRemanents(contadorCasellesBuides))
		{
			mostrarMissatge(fiPartida);
			return true;
		}
	}
}

function validarInput(inp) {
	return inp != "";
}
$(document).ready(function(){
	// $('.caselles').click(function(event) {
 //  event.preventDefault();
 //$('.casella').click(false);
 $('#iniciarJoc').click(function() {
 	nomJugador1 = $('#inputJugador1').val();
 	nomJugador2 = $('#inputJugador2').val();
 	inicialitzar();

 	if(!validarInput(nomJugador1))
 	{
		//mostrem errors (jugadors no validats)
		mostrarMissatge("<span class='error'>Jugador 1, escriu el teu nom!</span>");
		$('.graella').effect('drop','slow');
		return;
	}
	else
	{
		if(!validarInput(nomJugador2))
		{
			mostrarMissatge("<span class='error'>Jugador 2, escriu el teu nom!</span>");
			$('.graella').effect('drop','slow');
			return;
		}
	}
	if(nomJugador1==nomJugador2) {
		mostrarMissatge("Els jugadors han de tenir noms distints!");
		$('.graella').effect('drop','slow');
		return
	}
	// if(tenimGuanyador || contadorCasellesBuides==0)
	// {
	// 	//si partim d'una partida anterior, inicialitzar tot
	// 	alert("començem!");
	// 	inicialitzar();
	// }
	// else
	// {
	// 	tornSeguent();	
	// }
	
});
 $('.casella').click(function(){
 	/*if(!validarInput(nomJugador1))
 	{
		//mostrem errors (jugadors no validats)
		mostrarMissatge("Jugador 1, escriu el teu nom!");
		$('.graella').effect('drop','slow');
		return;
	}
	else
	{
		if(!validarInput(nomJugador2))
		{
			mostrarMissatge("Jugador 2, escriu el teu nom!");
			$('.graella').effect('drop','slow');
			return;
		}
	}*/
	/*if(nomJugador1==nomJugador2)
	{
		mostrarMissatge("Els jugadors han de tenir noms distints!");
		$('.graella').effect('drop','slow');
		return
	}*/
	if(tornActual==null)
	{
		mostrarMissatge("Pitja el botó de Començar!");
		$('.graella').effect('drop','slow');
		return;
	}
	else
	{

		posicioActual = $(this).attr('id');
		setClick(posicioActual,graella,tornActual,nomJugador1, nomJugador2, contadorCasellesBuides);
	}
	/*if(!comprovarGuanyador(graella,tornActual))
	{
		tornSeguent(tornActual,nomJugador1,nomJugador2);
	}*/
});
});

