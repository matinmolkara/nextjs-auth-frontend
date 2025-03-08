let counter = 0;

const counterValue = document.getElementById("counter-value");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");

// To increment the value of counter
incrementBtn.addEventListener("click", () => {
  counter++;
  counterValue.innerHTML = counter;
});

// To decrement the value of counter
decrementBtn.addEventListener("click", () => {
  while (counter > 0) {
    counter--;
    counterValue.innerHTML = counter;
  }
});
