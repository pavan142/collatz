let gridContainer = document.querySelector(".grid-container");
let stats = document.querySelector(".stats");
const totalNumbers = 500;
const maxEntryLimit = 10000000;
const statsInterval = 100;

if (totalNumbers > 500) {
  gridContainer.classList.add("grid500")
}

let elementArray = new Array<HTMLElement>(totalNumbers).fill(null);
for (let i = 0; i < totalNumbers; i++) {
  let element = document.createElement("p")
  element.innerHTML = String(i + 1);
  element.classList.add("grid-item");
  elementArray[i] = element;
  gridContainer.appendChild(element);
}

export type displayFn = (add: boolean, entries: Array<number>) => {};
class Collatz {
  current: Array<number>;
  step: number;

  constructor() {
    this.current = []
    this.step = 0;
  }

  forward(cb: displayFn) {
    let prev = this.current.slice();
    this.step++;
    let collection = new Set<number>();

    if (this.step == 1) {
      this.current = [1]
      return cb(true, this.current);
    }

    this.current = [];
    var push = (entry) => {
      if (entry > maxEntryLimit) return;
      collection.add(entry);
    }

    for (let num of prev) {
      push(num * 2);

      if (num > 4 && num % 6 == 4) {
        push((num - 1) / 3)
      }
    }

    this.current = [];
    
    for (let item of collection.values())
      this.current.push(item)

    cb(true, this.current);
  }

  backward(cb: displayFn) {
    let prev = this.current.slice();
    let collection = new Set<number>();

    if (this.step == 0) {
      this.current = []
      reset();
      return;
      // return cb(false, [1])
    }

    this.step--;
    for (let num of prev) {
      if (num % 2 == 0) {
        collection.add(num / 2)
      } else {
        collection.add(num * 3 + 1)
      }
    }

    this.current = [];
    for (let item of collection.values())
      this.current.push(item)
    cb(false, prev);
  }
}

let collatz = new Collatz();
var _pause = true;

var pause = () => _pause = true;
var play = () => _pause = false;
var toggleplay = () => _pause = !_pause;
var backward = () => collatz.backward(display);
var forward = () => collatz.forward(display);

(<any>window).pause = pause;
(<any>window).play = play;
(<any>window).toggleplay = toggleplay;
(<any>window).backward = backward;
(<any>window).forward = forward;

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 34) {
    forward();
    return false;
  }

  if (event.keyCode == 33) {
    backward();
    return false;
  }

  if (event.keyCode == 32) {
    toggleplay();
    return false;
  }
})

const display: displayFn = (add: boolean, entries: Array<number>) => {
  for (let num of entries) {
    if (num <= elementArray.length) {
      if (add) {
        elementArray[num - 1].classList.add("marked")
      } else {
        elementArray[num - 1].classList.remove("marked")
      }
    }
  }

  let statsArray = [];
  let count = 0;
  for (let i = 0; i < elementArray.length; i++) {
    if (i > 0 && i % (statsInterval) == 0) {
      statsArray.push(count)
      count = 0;
    }
    if (elementArray[i].classList.contains("marked")) {
      count++;
    }
  }
  statsArray.push(count);
  console.log(collatz.step, collatz.current.length, Math.min(...  collatz.current));
  // console.log(collatz.step, collatz.current.length, statsArray);
  return {}
}

function reset() {
 for (let elem of elementArray)
  elem.classList.remove("marked");
}
// collatz.forward(display);
setInterval(() => {
  if (_pause)
    return;
  collatz.forward(display);
  let current = collatz.current;
  if (collatz.step % 10 == 0) {
    console.log(collatz.step, current.length);
  }
}, 100)
