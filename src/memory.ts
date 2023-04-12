import { updateInput } from "./print.js";
import {
  dataFormula,
  dataValue,
  emptyInput,
  feBtn,
  memDisplay,
  memoryBtns,
  output,
} from "./utils.js";

let memory = 0;
let mcBtn: HTMLButtonElement = memoryBtns[0]!;
let mrBtn: HTMLButtonElement = memoryBtns[1]!;
let mPlusBtn: HTMLButtonElement = memoryBtns[2]!;
let mMinusBtn: HTMLButtonElement = memoryBtns[3]!;
let mSBtn: HTMLButtonElement = memoryBtns[4]!;

// storing in memory function
function msEval() {
  mSBtn.addEventListener("click", () => {
    let formulaStr: string = dataFormula.join("");
    let result: number;
    try {
      result = eval(formulaStr);
       if (
        result >= Number.MAX_SAFE_INTEGER ||
        result <= Number.MIN_SAFE_INTEGER
      ) {
        alert("Value to large to stored");
      } else if (result % 1 != 0) {
       
        memory += Number(result.toFixed(4));
        memDisplay.innerHTML = String(memory);
      mcBtn.disabled = false;
      mrBtn.disabled = false;
      } else {
        memory += result;
        memDisplay.innerHTML = String(memory);
      mcBtn.disabled = false;
      mrBtn.disabled = false;
      }
      
    } catch (error) {
      alert("Invalid expression, cant add in memory");
    }
  });
}

// adding value in memory function
function mPlusEval() {
  mPlusBtn.addEventListener("click", () => {
    let formulaStr = dataFormula.join("");
    let result: number;
    try {
      result = eval(formulaStr);
      if (
        result >= Number.MAX_SAFE_INTEGER ||
        result <= Number.MIN_SAFE_INTEGER
      ) {
        alert("Value to large to stored");
      } else if (result % 1 != 0) {
        memory += Number(result.toFixed(4));
      } else {
        memory += result;
      }
      memDisplay.innerHTML = String(memory);
      if (mcBtn.disabled) {
        mcBtn.disabled = false;
        mrBtn.disabled = false;
      }
    } catch (error) {
      alert("Invalid expression, cant add in memory");
    }
  });
}

// subtracting value in memory function
function mMinusEval() {
  mMinusBtn.addEventListener("click", () => {
    let formulaStr = dataFormula.join("");
    let result: number;
    try {
      result = eval(formulaStr);
      if (
        result >= Number.MAX_SAFE_INTEGER ||
        result <= Number.MIN_SAFE_INTEGER
      ) {
        alert("Value to large to stored");
      } else if (result % 1 != 0) {
        memory -= Number(result.toFixed(4));
      } else {
        memory -= result;
      }
      memDisplay.innerHTML = String(memory);
      if (mcBtn.disabled) {
        mcBtn.disabled = false;
        mrBtn.disabled = false;
      }
    } catch (error) {
      alert("Invalid expression, cant add in memory");
    }
  });
}

// recalling memory in input 
function mrEval() {
  mrBtn.addEventListener("click", () => {
    let result: number = memory;
    dataFormula.push(String(result));
    dataValue.push(String(result));
    output.value = dataValue.join("");
  });
}

// clear memory function 
function mcEval() {
  mcBtn.addEventListener("click", () => {
    memory = 0;
    memDisplay.innerHTML = String(memory);
    mrBtn.disabled = true;
    mcBtn.disabled = true;
  });
}

// converting value to exponential
function fE() {
  feBtn.addEventListener("click", () => {
    let formulaStr: string = dataFormula.join("");
    let result: number;
    try {
      result = eval(formulaStr);
      if (
        result >= Number.MAX_SAFE_INTEGER ||
        result <= Number.MIN_SAFE_INTEGER
      ) {
        alert("Cannot convert this");
      } else {
        let value: string = result.toExponential(4);
        emptyInput();
        updateInput(value, value);
        output.value = dataValue.join("");
      }
    } catch (error) {
      alert("Wrong expression");
    }
  });
}
export { msEval, mMinusEval, mPlusEval, mcEval, mrEval, fE };