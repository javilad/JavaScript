/*
	===================================================
	Funcion JavaScript: Convertir numeros a palabras
	Descripcion: La funcion es valida para valores entre
	1 y 9999999999
	Version: 1.0
	Curso: Lenguaje de Marcado
	===================================================
*/

//Variables globales

//Unidades
var numbers = ['', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 
'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciseis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];

//Decenas
var tens = ['', 'Diez', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];

//Centenas
var houndres = ['', 'Ciento', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seicientos', 'Setecientos', 
'Ochocientos', 'Novecientos'];

function numberToWords(number){
	//Variables locales
	var result = '';
	var number = Math.floor(number);
	var numberSplit = number.toString().split('');
	
	if (number <= 9999999999 && number >= 1){
		//Evalua la cantidad de digitos del numero
		switch(numberSplit.length)
		{
			case 1: case 2: {
				return getTens(number);
			}break;
			case 3: {
				return getHoundres(number);
			}break;
			case 4: case 5: case 6: {
				return getThounsands(number);
			}break;
			case 7: case 8: case 9: case 10: {
				return getMillions(number);
			}break;
			default:
			return '';
		}
		return result;
	}
	else{
		window.alert('No es un valor válido');
	}
}

/*
	===================================================
	Funcion JavaScript: Traer unidades
	Descripcion: Permite traer el nombre en palabras de 
	los numeros hasta 19.
	Version: 1.0
	Curso: Lenguaje de Marcado
	===================================================
*/
function getUnits(number){
	return numbers[number];
}

/*
	===================================================
	Funcion JavaScript: Traer decenas
	Descripcion: Permite traer el nombre en palabras de 
	los numeros que representan decenas (10, 20, 30,...)
	hasta 99.
	Version: 1.0
	Curso: Lenguaje de Marcado
	===================================================
*/
function getTens(number){
	if (number > 19){
		//Variables locales
		var residue = number%10;
		var numberSplit = number.toString().split('');

		//Para numeros donde el modulo (residuo) es cero
		if (residue === 0){
			return tens[numberSplit[0]];
		}
		else{
			return tens[numberSplit[0]] + " y " + getUnits(residue);
		}
	}
	else{
		return getUnits(number);
	}
}

/*
	===================================================
	Funcion JavaScript: Traer centenas
	Descripcion: Permite traer el nombre en palabras de 
	los numeros que representan centenas (100, 200, 300
	400,...) hasta 999.
	Version: 1.0
	Curso: Lenguaje de Marcado
	===================================================
*/
function getHoundres(number){
	//Variables locales
	var residue = number%100;
	var residueSplit = residue.toString().split('');
	var numberSplit = number.toString().split('');

	//Para numeros donde el modulo (residuo) es cero
	if (residue === 0){
		return houndres[numberSplit[0]];
	}
	else{
		return houndres[numberSplit[0]] + " " + getTens(residue, residueSplit);
	}
}

/*
	===================================================
	Funcion JavaScript: Traer miles
	Descripcion: Permite traer el nombre en palabras de 
	los numeros que representan miles (1000, 2000, 3000
	4000,...). Se hace uso del resto de funciones para
	formar las centenas, decenas y unidades del numero.
	Version: 1.0
	Curso: Lenguaje de Marcado
	===================================================
*/
function getThounsands(number){
	//Variables locales
	var residue = number%1000;
	var numberSplit = number.toString().split('');
	var result = "";

	//Para numeros donde el modulo (residuo) es cero
	switch (numberSplit.length)
	{
		case 4:{
			result = getUnits(sliceLeftToRight(1, numberSplit));
		}break;
		case 5:{
			result = getTens(sliceLeftToRight(2, numberSplit));
		}break;
		case 6:{
			result = getHoundres(sliceLeftToRight(3, numberSplit));
		}break;
		default:
			result = '';
	}

	result += " mil ";

	//Para numeros donde el modulo (residuo) es mayor a cero
	var residueSplit = residue.toString().split('');

	if (residueSplit.length > 0){
		switch(residueSplit.length)
		{
			case 1:{
				result += getUnits(residue);
			}break;
			case 2: {
				result += getTens(residue);
			}break;
			case 3: {
				result += getHoundres(residue);
			}break;
			default:
				result += '';
		}	
	}

	return result;
}

/*
	======================================================
	Funcion JavaScript: Traer millones
	Descripcion: Permite traer el nombre en palabras de los 
	numeros que representan millones haciendo uso del resto 
	de funciones para formar los miles, centenas, decenas y 
	unidades del numero.
	Version: 1.0
	Curso: Lenguaje de Marcado
	======================================================
*/
function getMillions(number){
	//Variables locales
	var residue = number%1000000;
	var numberSplit = number.toString().split('');
	var result = "";

	//Para numeros donde el modulo (residuo) es cero
	switch (numberSplit.length)
	{
		case 7:{
			result = getUnits(sliceLeftToRight(1, numberSplit));
		}break;
		case 8:{
			result = getTens(sliceLeftToRight(2, numberSplit));
		}break;
		case 9:{
			result = getHoundres(sliceLeftToRight(3, numberSplit));
		}break;
		case 10:{
			result = getThounsands(sliceLeftToRight(4, numberSplit));
		}break;
		default:
			result += '';
	}

	result += " millones ";

	//Para numeros donde el modulo (residuo) es mayor a cero
	var residueSplit = residue.toString().split('');

	if (residueSplit.length > 0){
		switch(residueSplit.length)
		{
			case 1:{
				result += getUnits(residue);
			}break;
			case 2: {
				result += getTens(residue);
			}break;
			case 3: {
				result += getHoundres(residue);
			}break;
			case 4: case 5: case 6:{
				result += getThounsands(residue);
			}break;
			default:
				result += '';
		}	
	}

	return result;
}

/*
	====================================================
	Funcion JavaScript: 
	Descripcion: Selecciona una porción de un numero en 
	la dirección izquierda derecha y según una cantidad 
	de posiciones. Es decir,con el array ["1", "3", "5"], 
	se pueden obtener el numero "13", si traemos las dos
	primeras posiciones.
	Version: 1.0
	Curso: Lenguaje de Marcado
	====================================================
*/
function sliceLeftToRight(numberLength, numberSplit){
	var result = '';
	for (var i = 0; i <= numberSplit.length; i++) {
		if (i < numberLength){
			result += numberSplit[i];
		}
	}

	return parseInt(result);
}