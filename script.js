"use strict";
const calculator = document.getElementById('calculator');
const mainScreen = document.getElementById('main_screen');
const actionsScreen = document.getElementById('actions_screen');
let memory = null;

calculator.addEventListener('click', function(e) {
	switch(e.target.id) {
    	case '0':
    	case '1':
    	case '2':
    	case '3':
    	case '4':
    	case '5':
    	case '6':
    	case '7':
    	case '8':
    	case '9':
	    	if (mainScreen.textContent == '0') {
	    		mainScreen.textContent = e.target.id;
	    	} else if (mainScreen.textContent.length < 12) {
	    		mainScreen.textContent += e.target.id;
	    	} else if (mainScreen.textContent.length == 12 && 
			    	  (mainScreen.textContent[0] == '-' || mainScreen.textContent.indexOf('.') != -1) ) {
	    		console.log('fdsf');
                mainScreen.textContent += e.target.id;
	    	} else if (mainScreen.textContent.length == 13 && 
	    		       mainScreen.textContent[0] == '-' && mainScreen.textContent.indexOf('.') != -1) {
                mainScreen.textContent += e.target.id;
	    	}
	    	break;
	    case 'dot':
		    if (mainScreen.textContent.indexOf('.') == -1) mainScreen.textContent += '.';
		    break;
	    case 'sign':
		    if (mainScreen.textContent != '0' && mainScreen.textContent[0] != '-') {
		    	//if (mainScreen.textContent.length >= 12) mainScreen.style.fontSize = '56px';
		    	mainScreen.textContent = '-' + mainScreen.textContent;
		    } else if (mainScreen.textContent != '0' && mainScreen.textContent[0] == '-') {
		    	//if (mainScreen.textContent.length > 12) mainScreen.style.fontSize = '58px';
				mainScreen.textContent = mainScreen.textContent.slice(1);
		    }
		    break;
	    case 'backspace':
		    if (mainScreen.textContent.length == 1 || (mainScreen.textContent.length == 2 && mainScreen.textContent[0] == '-') ) {
		    	mainScreen.textContent = 0;
		    } else {
			    mainScreen.textContent = mainScreen.textContent.slice(0, mainScreen.textContent.length - 1);
		    }
		    if (mainScreen.textContent.length > 12) mainScreen.style.fontSize = '58px';
		    break;
	    case 'c':
		    mainScreen.textContent = 0;
		    break;
	    case 'm_plus':
		    memory = +mainScreen.textContent;
		    break;
	    case 'mr':
		    mainScreen.textContent = memory;
		    break;
	    case 'root':
		    mainScreen.textContent = root(mainScreen.textContent);
		    if (mainScreen.textContent >= 0.99999999999 && mainScreen.textContent <= 1.00000000001) mainScreen.textContent = 1;
		    break;

    }

    if (mainScreen.textContent.length > 12) {
		mainScreen.style.fontSize = '54px';
	} else {
		mainScreen.style.fontSize = '58px';
	}

});

function sum(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function root(a) {
	return Math.sqrt(a);
}

function fraction(a) {
	return 1 / a;
}