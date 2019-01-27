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
	    	if (cleanScreen == true || screen.textContent == '0') {
	    		screen.textContent = result = e.target.id;
	    		cleanScreen = false;
	    	} else if (screen.textContent.length < 12) {
	    		screen.textContent = result += e.target.id;
	    	} else if (screen.textContent.length == 12 && 
			    	  (screen.textContent[0] == '-' || screen.textContent.indexOf('.') != -1) ) {
	    		screen.textContent = result += e.target.id;
	    	} else if (screen.textContent.length == 13 && 
	    		       screen.textContent[0] == '-' && screen.textContent.indexOf('.') != -1) {
                screen.textContent = result += e.target.id;
            }
            assignAorB();
	    	break;
	    case 'dot':
		    backspaceIsAllowed = true;
		    if (cleanScreen == true) {
		    	screen.textContent = result = '0.'
    			cleanScreen = false;
    		} else if (screen.textContent.indexOf('.') == -1) {
		    	screen.textContent = result += '.';
		    }
			assignAorB();
		    break;
	    case 'sign':
		    backspaceIsAllowed = true;
		    if (screen.textContent != '0' && screen.textContent[0] != '-') {
		    	screen.textContent = result = '-' + result;
		    } else if (screen.textContent != '0' && screen.textContent[0] == '-') {
		    	screen.textContent = result = (result + '').slice(1);
			}
			assignAorB();
		    break;
	    case 'backspace':
		    if (backspaceIsAllowed == true) {
			    if (screen.textContent.length == 1 || (screen.textContent.length == 2 && screen.textContent[0] == '-') ) {
			    	screen.textContent = result = 0;
			    } else {
				    screen.textContent = result = (result + '').slice(0, result.length - 1);
			    }
			}
		    break;
	    case 'c':
		    backspaceIsAllowed = true;
		    screen.textContent = result = '0';
		    a = '0';
		    b = null;
		    b2 = null;
		    action = null;
		    cleanScreen = true;
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
			assignAorB();
		    break;
	    case 'root':
		    backspaceIsAllowed = false;
		    cleanScreen = true;
		    result = root(+screen.textContent);
		    if ( result >= 0.99999999999 && result <= 1.00000000001) {
		    	screen.textContent = result = 1;
		    	break;
	    	} else {
		    	screen.textContent = result;
		    }
			assignAorB();
		    break;
	    case 'fraction':
		    backspaceIsAllowed = false;
		    cleanScreen = true;
		    screen.textContent = result = '' + fraction(result);
		    assignAorB();
		    break;
	    case 'sum':
	    case 'subtract':
	    case 'multiply':
	    case 'divide':
		    if (b != null) {
		    	screen.textContent = a = result = action(+a, +b);
		    	b = null;
		    }
		    action = (e.target.id == 'sum') ? sum: 
					 (e.target.id == 'subtract') ? subtract: 
					 (e.target.id == 'multiply') ? multiply: divide;
		    b2 = null;
		    backspaceIsAllowed = false;
	    	cleanScreen = true;
	    	break;
	    case 'percent':
		    backspaceIsAllowed = false;
		    cleanScreen = true;
		    if (action == null) {
		    	screen.textContent = a = result = '0';
		    	break;
		    } 
		    screen.textContent = result = '' + ( +a * +screen.textContent/100 );
		    assignAorB();
		    break;
    	case 'result':
	    	if (action != null) {
	    		if (b2 == null) {
	    			b2 = screen.textContent;
	    			b = null;
	    		}
	    		screen.textContent = a = result = action(+a, +b2);
	    		backspaceIsAllowed = false;
		    	cleanScreen = true;
	    	}
	    	break;
	}
	makeResultLength();
});

document.onkeypress = (e) => {
	switch(e.key) {
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
	    	if (cleanScreen == true || screen.textContent == '0') {
	    		screen.textContent = result = e.key;
	    		cleanScreen = false;
	    	} else if (screen.textContent.length < 12) {
	    		screen.textContent = result += e.key;
	    	} else if (screen.textContent.length == 12 && 
			    	  (screen.textContent[0] == '-' || screen.textContent.indexOf('.') != -1) ) {
	    		screen.textContent = result += e.key;
	    	} else if (screen.textContent.length == 13 && 
	    		       screen.textContent[0] == '-' && screen.textContent.indexOf('.') != -1) {
                screen.textContent = result += e.key;
            }
            assignAorB();
	    	break;
	    case '.':
		    backspaceIsAllowed = true;
		    if (cleanScreen == true) {
		    	screen.textContent = result = '0.'
    			cleanScreen = false;
    		} else if (screen.textContent.indexOf('.') == -1) {
		    	screen.textContent = result += '.';
		    }
			assignAorB();
		    break;
        case '+':
	    case '-':
	    case '*':
	    case '/':
		    if (b != null) {
		    	screen.textContent = a = result = action(+a, +b);
		    	b = null;
		    }
		    action = (e.key == '+') ? sum: 
					 (e.key == '-') ? subtract: 
					 (e.key == '*') ? multiply: divide;
		    b2 = null;
		    backspaceIsAllowed = false;
	    	cleanScreen = true;
	    	break;
	    case 'Enter':
	    	if (action != null) {
	    		if (b2 == null) {
	    			b2 = screen.textContent;
	    			b = null;
	    		}
	    		screen.textContent = a = result = action(+a, +b2);
	    		backspaceIsAllowed = false;
		    	cleanScreen = true;
	    	}
	    	break;
	}
	makeResultLength();
};

document.onkeydown = (e) => {
	switch(e.key) {
		case 'Backspace':
		    if (backspaceIsAllowed == true) {
			    if (screen.textContent.length == 1 || (screen.textContent.length == 2 && screen.textContent[0] == '-') ) {
			    	screen.textContent = result = 0;
			    } else {
				    screen.textContent = result = (result + '').slice(0, result.length - 1);
			    }
			}
		    break;
	}
	makeResultLength();
}

function makeResultLength() {
	let i = 11;
	let j = 8;
    if (+result >= 0) {
    	screen.style.fontSize = '58px';
    	if (+result < 1 && screen.textContent.length > 13) {
    		while(screen.textContent.length > 13) {
	    		screen.textContent = (+result).toPrecision(i);
	    		i--;
	    	}
    	} else if (+result > 1 && +result < 999999999999 && screen.textContent.length > 13) {
    		screen.textContent = (+result).toPrecision(12);
    	} else if (+result > 999999999999) {
    		while(screen.textContent.length > 13) {
	    		screen.textContent = (+result).toPrecision(j);
	    		j--;
	    	}
    	}
    }
    if (+result < 0) {
    	if (+result > -1 && screen.textContent.length >= 14) {
    		screen.style.fontSize = '54px';
    		while(screen.textContent.length > 14) {
	    		screen.textContent = (+result).toPrecision(i);
	    		i--;
	    	}
    	} else if (+result < -1 && +result > -999999999999 && screen.textContent.length >= 14) {
    		screen.style.fontSize = '54px';
    		screen.textContent = (+result).toPrecision(12);
    	} else if (+result < -999999999999) {
    		console.log(result);
    		while(screen.textContent.length > 13) {
	    		screen.textContent = (+result).toPrecision(j);
	    		j--;
	    	}
    	}
    }
 }

function assignAorB() {
	if ( (action == null) || (b2 != null) ) {
		a = result;
	} else {
		b = result;
	}
}

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