import {
  advFuncToggler,
  backSpace,
  clearAll,
  isDegree,
  keys,
  mathFuncs,
  numbers,
  operators,
  trigoFuncs,
} from "./utils.js";
import { print } from "./print.js";
// advanced function toggler
advFuncToggler.addEventListener("click", () => {
  let hiddenFunc: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".visually-hidden");
  let visFunc: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".visible");
  for (let i = 0; i < hiddenFunc.length; i++) {
    hiddenFunc[i]?.classList.remove("visually-hidden");
    hiddenFunc[i]?.classList.add("visible");
    visFunc[i]?.classList.add("visually-hidden");
    visFunc[i]?.classList.remove("visible");
  }
});

// degree button toggler
isDegree.addEventListener("click", degToggler);
function degToggler() {
  //   console.log(isDegree.innerHTML);
  if (isDegree.innerHTML == "DEG") {
    isDegree.innerHTML = "RAD";
  } else {
    isDegree.innerHTML = "DEG";
  }
}
print(mathFuncs);
print(trigoFuncs);
print(operators)
print(keys)
print(numbers)
clearAll()
backSpace()