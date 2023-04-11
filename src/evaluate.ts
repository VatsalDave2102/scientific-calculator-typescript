import {
  calculateBtn,
  CLOSEPARANTHESE,
  dataFormula,
  dataValue,
  E,
  emptyInput,
  FACTORIAL,
  isDegree,
  MATHCBRT,
  MATHLOG,
  MATHLOG10,
  MATHSQRT,
  numbers,
  OPENPARANTHESE,
  OPERATORS,
  output,
  PI,
  POWER,
  search,
} from "./utils.js";

const buttons = [MATHLOG10, MATHLOG, MATHSQRT, MATHCBRT, PI, E, OPENPARANTHESE];
const numValue: string[] = [];
numbers.forEach((item) => {
  numValue.push(item.innerHTML);
});
// function to calculate factorial
function factorial(num: number) {
  if (num % 1 != 0) {
    num = Math.round(num);
  }
  if (num === 0 || num === 1) return 1;
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result = result * i;
    if (result === Infinity) return Infinity;
  }
  return result;
}

//radian or degree
function trigo(callback: (angle: string) => {}, angle: string) {
  if (isDegree.innerHTML == "DEG") {
    angle = String((Number(angle) * Math.PI) / 180);
  }
  return callback(angle);
}

// function for calculation
function calculate() {
  calculateBtn.addEventListener("click", () => {
    if (dataFormula.length != 0) {
      let formulaStr = dataFormula.join("");

      // loop to put multiply before functions and constants
      buttons.forEach((button) => {
        let position = putMultiply(dataFormula, button);
        position.forEach((index) => {
          dataFormula[index] = "*" + button;
        });
      });

      // loop to put multiply digit that are after constants and functions
      numValue.forEach((num) => {
        let position = putMultiplyNum(dataFormula, num);
        position.forEach((index) => {
          dataFormula[index] = "*" + num;
        });
      });
      formulaStr = dataFormula.join("");
      formulaStr = correctPowerPosition(formulaStr);
      formulaStr = correctFactPosition(formulaStr);

      let result: number;
      // usring try and catch for evaluation
      try {
        result = eval(formulaStr);
        if (result % 1 != 0) {
          result = Number(result.toFixed(4));
        }
        if (result >= Number.MAX_SAFE_INTEGER) {
          result = Infinity;
        }
        if (result <= Number.MIN_SAFE_INTEGER) {
          result = -Infinity;
        }
        emptyInput();
        dataFormula.push(String(result));
        dataValue.push(String(result));
        output.value = dataValue.join("");
      } catch (error) {
        output.value = "Syntax Error!";
        emptyInput();
      }
    }
  });
}

// function to correct power bases in input string
function correctPowerPosition(input: string): string {
  let powerSearchResult = search(dataFormula, POWER);
  const BASES = getPowerBase(dataFormula, powerSearchResult);
  BASES.forEach((base: string) => {
    let toReplace = base + POWER;
    let replacement = "Math.pow(" + base + ",";
    input = input.replace(toReplace, replacement);
  });
  return input;
}

// function to correct factorial sign in input string
function correctFactPosition(input: string): string {
  let factorialSearchResult = search(dataFormula, FACTORIAL);
  const NUMBERS = getFactorialNumber(dataFormula, factorialSearchResult);
  NUMBERS.forEach((factorial) => {
    input = input.replace(factorial.toReplace, factorial.replacement);
  });
  return input;
}

// getting all power bases from input
function getPowerBase(formulas: string[], searchResult: number[]) {
  let powerBases: string[] = []; //saves all bases

  searchResult.forEach((powerIndex: number) => {
    let currBase: string[] = []; //saves current base
    let paranthesesCount = 0;
    let previousIndex = powerIndex - 1;

    while (previousIndex >= 0) {
      if (formulas[previousIndex] == OPENPARANTHESE) paranthesesCount--;
      if (formulas[previousIndex] == CLOSEPARANTHESE) paranthesesCount++;

      let isOperator = false;
      OPERATORS.forEach((Operator) => {
        if (formulas[previousIndex] == Operator) {
          isOperator = true;
        }
      });

      let isPower = formulas[previousIndex] == POWER;

      if ((isOperator && paranthesesCount == 0) || isPower) break;
      currBase.unshift(formulas[previousIndex]!);

      previousIndex--;
    }
    powerBases.push(currBase.join(""));
  });
  return powerBases;
}

// getting factorial numbers
function getFactorialNumber(formulas: string[], searchResult: number[]) {
  let numbers: { toReplace: string; replacement: string }[] = [];
  let factorialSequence = 0;

  searchResult.forEach((factorialIndex: number) => {
    let number = []; //stores current factorial
    let nextIndex = factorialIndex + 1;
    let nextInput = formulas[nextIndex];

    if (nextInput == FACTORIAL) {
      factorialSequence += 1;
      return;
    }

    // if there was a factorial sequence, we need to get index of the first factorial
    let firstFactorialIndex = factorialIndex - factorialSequence;

    // then to get the number right before it
    let previousIndex = firstFactorialIndex - 1;
    let paranthesesCount = 0;
    while (previousIndex >= 0) {
      if (formulas[previousIndex] == OPENPARANTHESE) paranthesesCount--;
      if (formulas[previousIndex] == CLOSEPARANTHESE) paranthesesCount++;

      let isOperator = false;
      OPERATORS.forEach((Operator) => {
        if (formulas[previousIndex] == Operator) isOperator = true;
      });

      if (isOperator && paranthesesCount == 0) break;

      number.unshift(formulas[previousIndex]);

      previousIndex--;
    }

    let numberStr = number.join("");
    const factorial = "factorial(";
    let times = factorialSequence + 1;

    let toReplace = numberStr + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + numberStr + CLOSEPARANTHESE.repeat(times);

    numbers.push({ toReplace: toReplace, replacement: replacement });

    factorialSequence = 0;
  });
  return numbers;
}

function putMultiply(formulas: string[], val: string): number[] {
  let searchResult = search(formulas, val);
  let indexes: number[] = [];
  searchResult.forEach((index) => {
    if (index != 0) {
      let previousIndex = index - 1;
      if (
        formulas[previousIndex] == CLOSEPARANTHESE ||
        isFinite(Number(formulas[previousIndex])) ||
        formulas[previousIndex] == PI ||
        formulas[previousIndex] == E
      ) {
        indexes.push(index);
      }
    }
  });
  return indexes;
}

function putMultiplyNum(formulas: string[], val: string): number[] {
  let searchResult = search(formulas, val);
  let indexes: number[] = [];
  searchResult.forEach((index) => {
    if (index != 0) {
      let previousIndex = index - 1;
      if (
        formulas[previousIndex] == CLOSEPARANTHESE ||
        formulas[previousIndex] == PI ||
        formulas[previousIndex] == E
      ) {
        indexes.push(index);
      }
    }
  });
  return indexes;
}
export { calculate };
