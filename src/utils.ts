// targeting buttons
let numbers: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".number");
let operators: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".operator");
let trigoFuncs: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".trigo-function");
let mathFuncs: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".math-function");
let keys: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".key");
let output:HTMLInputElement = document.querySelector(".output")!
let dataValue: (string)[] = [];
let dataFormula: (string)[] = [];
let advFuncToggler: HTMLButtonElement = document.querySelector('.adv-func-toggler')!
let isDegree:HTMLButtonElement = document.querySelector(".deg")! 
let clearAllBtn:HTMLButtonElement = document.querySelector(".clear")! 
let backSpaceBtn:HTMLButtonElement = document.querySelector(".backspace")!
let decimalBtn:HTMLButtonElement = document.querySelector(".decimal")!

// some constants
let OPERATORS = ["*", "-", "/", "+", "%"];
let POWER = "POWER(";
let FACTORIAL = "FACTORIAL";
let PI = "Math.PI";
let E = "Math.E";
let MATHLOG10 = "Math.log10(";
let MATHLOG = "Math.log(";
let MATHSQRT = "Math.sqrt(";
let MATHCBRT = "Math.cbrt(";
let OPENPARANTHESE = "(";
// utility functions
// clear function
function clearAll() {
  clearAllBtn.addEventListener("click", () => {
    dataValue = [];
    output.value = "";
    dataFormula = [];
    disableDecimal()
  });
}

// backspace function
function backSpace() {
  backSpaceBtn.addEventListener("click", () => {
    dataValue.pop();
    output.value = dataValue.join("");
    dataFormula.pop();
    disableDecimal();
  });
}

// function to disable decimal at appropriate places
function disableDecimal() {
  let value:string[] = getValue();
  console.log(value)
  if (value[value.length - 1] == ")") {
    decimalBtn.disabled = false;
  } else if (value.includes(".")) {
    decimalBtn.disabled = true;
  } else {
    decimalBtn.disabled = false;
  }
}

function getValue():string[] {
  let index = dataFormula.length - 1;
  let value:string[] = [];
  while (index >= 0) {
    if (
      dataFormula[index] == OPERATORS[1] ||
      dataFormula[index] == OPERATORS[2] ||
      dataFormula[index] == OPERATORS[0] ||
      dataFormula[index] == OPERATORS[3] ||
      dataFormula[index] == OPERATORS[4]
    ) {
      return value;
    } else if (dataFormula[index]?.includes(OPENPARANTHESE)) {
      return value;
    } else {
      value.unshift(dataFormula[index]!);
    }
    index--;
  }
  
  return value;
}
export {
  numbers,
  operators,
  trigoFuncs,
  mathFuncs,
  keys,
  output,
  dataFormula,
  dataValue,
  advFuncToggler,
  isDegree,
  clearAllBtn,
  backSpaceBtn,
  clearAll,
  backSpace,
  POWER,
  disableDecimal,
  FACTORIAL,
  PI,
  E,
  MATHCBRT,
  MATHLOG,
  MATHLOG10,
  MATHSQRT,
};
