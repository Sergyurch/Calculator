"use strict";
const calculator = document.getElementById('calculator');
const screen = document.getElementById('screen');
let memory = '0';
let backspaceIsAllowed = true;
let result = '0';
let a = '0';
let b = null;
let b2 = null;
let action = null;
let cleanScreen = true;
let firstPress = true;
screen.textContent = result;
document.onkeydown = (e) => console.log(e.key);


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
	    	backspaceIsAllowed = true;
	    	//b2 = null;

	    	if (cleanScreen == true || screen.textContent == '0') {
	    		screen.textContent = result = e.target.id;
	    		cleanScreen = false;
	    		console.log(result);
	    	} else if (screen.textContent.length < 12) {
	    		screen.textContent = result += e.target.id;
	    		console.log(result);
	    	} else if (screen.textContent.length == 12 && 
			    	  (screen.textContent[0] == '-' || screen.textContent.indexOf('.') != -1) ) {
	    		screen.textContent = result += e.target.id;
	    		console.log(result);
	    	} else if (screen.textContent.length == 13 && 
	    		       screen.textContent[0] == '-' && screen.textContent.indexOf('.') != -1) {
                screen.textContent = result += e.target.id;
                console.log(result);
	    	}

	    	/*if ( (action == null) || (b2 != null) ) {
	    		a = result;
	    	} else {
	    		b = result;
	    	}*/
	    	console.log(a);
	    	console.log(b);

	    	break;
	    case 'dot':
		    backspaceIsAllowed = true;
		    //b2 = null;

		    if (cleanScreen == true) {
		    	screen.textContent = result = '0.'
    			cleanScreen = false;
    		} else if (screen.textContent.indexOf('.') == -1) {
		    	screen.textContent = result += '.';
		    }

		    /*if ( (action == null) || (b2 != null) ) {
	    		a = result;
	    	} else {
	    		b = result;
	    	}*/

		    console.log(result);
		    break;
	    case 'sign':
		    backspaceIsAllowed = true;

		    if (screen.textContent != '0' && screen.textContent[0] != '-') {
		    	//if (mainScreen.textContent.length >= 12) mainScreen.style.fontSize = '56px';
		    	screen.textContent = result = '-' + result;
		    } else if (screen.textContent != '0' && screen.textContent[0] == '-') {
		    	//if (mainScreen.textContent.length > 12) mainScreen.style.fontSize = '58px';
				screen.textContent = result = (result + '').slice(1);
			}

			/*if ( (action == null) || (b2 != null) ) {
	    		a = result;
	    	} else {
	    		b = result;
	    	}*/

		    console.log(result);
		    break;
	    case 'backspace':
		    if (backspaceIsAllowed == true) {
			    if (screen.textContent.length == 1 || (screen.textContent.length == 2 && screen.textContent[0] == '-') ) {
			    	screen.textContent = result = 0;
			    } else {
				    screen.textContent = result = (result + '').slice(0, result.length - 1);
			    }
			    //if (screen.textContent.length > 12) screen.style.fontSize = '58px';
			    /*if (action == null) {
		    		a = result;
		    	} else {
		    		b = result;
		    	}*/
		    }
		    console.log(result);
		    break;
	    case 'c':
		    backspaceIsAllowed = true;
		    screen.textContent = result = '0';
		    a = '0';
		    b = null;
		    b2 = null;
		    action = null;
		    cleanScreen = true;
		    //actionsScreen.textContent = '';
		    break;
	    case 'm_plus':
		    backspaceIsAllowed = false;
		    memory = +screen.textContent;
		    cleanScreen = true;
		    break;
	    case 'mr':
		    backspaceIsAllowed = false;
		    screen.textContent = result = memory;
		    cleanScreen = true;

		    /*if ( (action == null) || (b2 != null) ) {
		    		a = result;
		    	} else {
		    		b = result;
		    	}*/

		    console.log(result);
		    break;
	    case 'root':
		    backspaceIsAllowed = false;
		    cleanScreen = true;
		    /*if (actionsScreen.textContent == '') {
			    actionsScreen.textContent = `sqrt(${mainScreen.textContent})`;
		    } else {
		    	actionsScreen.textContent = `sqrt(${mainScreen.textContent})`;
		    }*/
		    result = '' + root(screen.textContent);
		    if (result >= 0.99999999999 && result <= 1.00000000001) {
		    	screen.textContent = result = 1;
		    	break;
	    	}
		    /*if (result.length > 13) {
		    	//console.log(result.substr(0, 13));
		    	screen.textContent = (result + '').substr(0, 13);
		    }*/ else {
		    	screen.textContent = result;
		    }

		    /*if ( (action == null) || (b2 != null) ) {
	    		a = result;
	    	} else {
	    		b = result;
	    	}*/

		    //if (result >= 0.99999999999 && result <= 1.00000000001) screen.textContent = result = 1;
		    console.log(result);
		    break;
	    case 'fraction':
		    backspaceIsAllowed = false;
		    cleanScreen = true;
		    //actionsScreen.textContent = `fraction(${mainScreen.textContent})`;
		    screen.textContent = result = '' + fraction(result);
		    /*if (result.length > 13) {
		    	//console.log(result.substr(0, 13));
		    	screen.textContent = (result + '').substr(0, 13);
		    } else {
		    	screen.textContent = result;
		    }*/
		    /*if ( (action == null) || (b2 != null) ) {
	    		a = result;
	    	} else {
	    		b = result;
	    	}*/

		    console.log(result);
		    break;
	    case 'sum':
	    case 'subtract':
	    case 'multiply':
	    case 'divide':
		    /*if (action == null || firstPress == false) {
		    	a = result;
		    	firstPress = true;
		    } else {
		    	b = result;
		    	screen.textContent = a = result = action(+a, +b);
		    }*/
		    if (b != null) {
		    	screen.textContent = /*a =*/ result = action(+a, +b);
		    	b = null;
		    }
		    action = (e.target.id == 'sum') ? sum: 
					 (e.target.id == 'subtract') ? subtract: 
					 (e.target.id == 'multiply') ? multiply: divide;
		    b2 = null;
		    backspaceIsAllowed = false;
	    	cleanScreen = true;
	    	console.log(action);
	    	break;
	    case 'percent':
		    backspaceIsAllowed = false;
		    cleanScreen = true;
		    if (action == null) {
		    	screen.textContent = /*a =*/ result = '0';
		    	break;
		    } 
		    screen.textContent = result = '' + ( +a * +screen.textContent/100 );
		    /*if ( (action == null) || (b2 != null) ) {
	    		a = result;
	    	} else {
	    		b = result;
	    	}*/
		    break;
    	case 'result':
	    	/*console.log(a);
	    	if (firstPress == true) {
	    		b = result;
	    		firstPress = false;
	    	}
	    	if (action != null && b != null) screen.textContent = a = result = action(+a, +b);
	    	backspaceIsAllowed = false;
	    	cleanScreen = true;*/
	    	//action = null;
	    	if (action != null) {
	    		//console.log('kyky');
	    		if (b2 == null) {
	    			b2 = screen.textContent;
	    			b = null;
	    			//console.log(typeof b2);
	    		}
	    		
	    		screen.textContent = /*a =*/ result = action(+a, +b2);
	    		backspaceIsAllowed = false;
		    	cleanScreen = true;
	    	}
	    	break;

	}

	if ( (action == null) || (b2 != null) ) {
		a = result;
	} else {
		b = result;
	}

    if (screen.textContent.length > 12 && screen.textContent[0] == '-' && screen.textContent.indexOf('.') != -1) {
    	screen.textContent = (result + '').substr(0, 14);
    	screen.style.fontSize = '54px';
    } else if (screen.textContent.length > 12 && (screen.textContent[0] == '-' || screen.textContent.indexOf('.') != -1) ) {
    	screen.textContent = (result + '').substr(0, 13);
    	screen.style.fontSize = '58px';
    } else if (screen.textContent.length > 12) {
    	screen.textContent = (result + '').substr(0, 13);
    	screen.style.fontSize = '58px';
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