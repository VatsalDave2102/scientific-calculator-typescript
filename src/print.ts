import {
  output,
  dataFormula,
  dataValue,
  disableDecimal,
  FACTORIAL,
  POWER,
} from "./utils.js";

// update input function
function updateInput(value: string, formula: string): void {
  dataValue.push(value);
  dataFormula.push(formula);
}

// function that will print user inputs
function print(dataType: NodeListOf<HTMLButtonElement>) {
  for (let i = 0; i < dataType.length; i++) {
    let formula: string = dataType[i]?.getAttribute("data-formula")!;
    dataType[i]?.addEventListener("click", (event) => {
      // checks if input size is max or not
      if (output.value.length <= 18) {
        if (dataType[i]?.classList[2] == "math-function") {
          handleMathFunc(formula, event);
        } else if (dataType[i]?.classList[2] == "trigo-function") {
          handleTrigoFunc(formula, event);
        } else if (dataType[i]?.classList[2] == "operator") {
          handleOperator(formula, event);
        } else if (dataType[i]?.classList[2] == "key") {
          if (formula == "negate") {
            handleNegate();
          } else {
            updateInput((event.target as HTMLButtonElement).value, formula);
            output.value = dataValue.join("");
          }
        } else {
          updateInput((event.target as HTMLButtonElement).value, formula);
          output.value = dataValue.join("");
        }
        disableDecimal();
      } else {
        alert("Input limit reached");
      }
    });
  }
}

// handles all math functions
function handleMathFunc(formula: string, e: MouseEvent) {
  let symbol: string;
  if (formula == FACTORIAL) {
    symbol = "!";
    updateInput(symbol, formula);
    output.value = dataValue.join("");
  } else if (formula == "POWER") {
    symbol = "^(";
    updateInput(symbol, POWER);
    output.value = dataValue.join("");
  } else if (formula == "square") {
    symbol = "^(";
    updateInput(symbol, POWER);
    updateInput("2)", "2)");
    output.value = dataValue.join("");
  } else if (formula == "cube") {
    symbol = "^(";
    updateInput(symbol, POWER);
    updateInput("3)", "3)");
    output.value = dataValue.join("");
  } else if (formula == "tenx") {
    symbol = "^(";
    updateInput("10", "10");
    updateInput(symbol, POWER);
    output.value = dataValue.join("");
  } else if (formula == "twox") {
    symbol = "^(";
    updateInput("2", "2");
    updateInput(symbol, POWER);
    output.value = dataValue.join("");
  } else if (formula == "onebyx") {
    symbol = "^(";
    updateInput(symbol, POWER);
    updateInput("-1)", "-1)");
    output.value = dataValue.join("");
  } else if (formula == "ex") {
    symbol = "^(";
    updateInput("e", "Math.E");
    updateInput(symbol, POWER);
    output.value = dataValue.join("");
  } else if (formula == "nroot") {
    symbol = "^(";
    updateInput(symbol, POWER);
    updateInput("1", "1");
    updateInput("/", "/");
    output.value = dataValue.join("");
  } else {
    symbol = (e.target as HTMLButtonElement).value + "(";
    let newFormula = formula + "(";
    updateInput(symbol, newFormula);
    output.value = dataValue.join("");
  }
}

// handles all trigonometry functions
function handleTrigoFunc(formula: string, e: MouseEvent) {
  let symbol = (e.target as HTMLButtonElement).value + "(";
  updateInput(symbol, formula);
  output.value = dataValue.join("");
}

// // handles all operators
function handleOperator(formula: string, e: MouseEvent) {
  //checking for operators
  if (formula == "-") {
    //minus cannot be appended if last element is minus
    if (dataFormula[dataFormula.length - 1] != "-") {
      //if they are +, /, * ,% it will append
      updateInput((e.target as HTMLButtonElement).value, formula);
      output.value = dataValue.join("");
    }
  } else {
    //replacing the value of operator if it is +,/,*
    if (dataFormula[dataFormula.length - 1] != "-") {
      if (
        dataFormula[dataFormula.length - 1] == "+" ||
        dataFormula[dataFormula.length - 1] == "*" ||
        dataFormula[dataFormula.length - 1] == "/" ||
        dataFormula[dataFormula.length - 1] == "%"
      ) {
        dataFormula.pop();
        dataValue.pop();
        updateInput((e.target as HTMLButtonElement).value, formula);
        output.value = dataValue.join("");
      } else {
        updateInput((e.target as HTMLButtonElement).value, formula);
        output.value = dataValue.join("");
      }
    }
  }
}

// handles negate button
function handleNegate() {
  if (dataFormula[0] != "-") {
    dataValue.unshift("-");
    dataFormula.unshift("-");
    output.value = dataValue.join("");
  } else {
    dataValue.shift();
    dataFormula.shift();
    output.value = dataValue.join("");
  }
}

export { print, updateInput };