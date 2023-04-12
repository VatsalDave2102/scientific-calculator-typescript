// targeting buttons
let output: HTMLInputElement = document.querySelector(".output")!;
let memDisplay: HTMLSpanElement = document.querySelector(".mem-value")!;
let isDegree: HTMLButtonElement = document.querySelector(".deg")!;
let feBtn: HTMLButtonElement = document.querySelector(".f-e")!;
let memoryBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".mem");
let trigoFuncs: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".trigo-function");
let mathFuncs: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".math-function");
let advFuncToggler: HTMLButtonElement =
  document.querySelector(".adv-func-toggler")!;
let operators: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".operator");
let numbers: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".number");
let keys: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".key");
let clearAllBtn: HTMLButtonElement = document.querySelector(".clear")!;
let backSpaceBtn: HTMLButtonElement = document.querySelector(".backspace")!;
let dataValue: string[] = [];
let dataFormula: string[] = [];
let decimalBtn: HTMLButtonElement = document.querySelector(".decimal")!;
let calculateBtn: HTMLButtonElement = document.querySelector(".calculate")!;

// some constants
const OPERATORS = ["*", "-", "/", "+", "%"];
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL";
const PI = "Math.PI";
const E = "Math.E";
const MATHLOG10 = "Math.log10(";
const MATHLOG = "Math.log(";
const MATHSQRT = "Math.sqrt(";
const MATHCBRT = "Math.cbrt(";
const OPENPARANTHESE = "(";
const CLOSEPARANTHESE = ")";

// utility functions
// clear function
function clearAll() {
  clearAllBtn.addEventListener("click", () => {
    output.value = "";
    emptyInput();
    disableDecimal();
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
  let value: string[] = getValue();
  console.log(value);
  if (value[value.length - 1] == ")") {
    decimalBtn.disabled = false;
  } else if (value.includes(".")) {
    decimalBtn.disabled = true;
  } else {
    decimalBtn.disabled = false;
  }
}

function getValue(): string[] {
  let index = dataFormula.length - 1;
  let value: string[] = [];
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

// search function to get indexes for given keyword
function search(array: string[], keyword: string) {
  let resultArray: number[] = [];
  // this searches  keyword in array and puts it's index in result_array
  array.forEach((element, index) => {
    if (element == keyword) {
      resultArray.push(index);
    }
  });
  //console.log(result_array)
  return resultArray;
}

// clears the input from input strings
function emptyInput(): void {
  dataFormula = [];
  dataValue = [];
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
  calculateBtn,
  search,
  emptyInput,
  OPENPARANTHESE,
  CLOSEPARANTHESE,
  OPERATORS,
  memDisplay,
  memoryBtns,
  feBtn,
};
