import "./index.css";
import { titleCase } from "./utils";

// === MARK: DOM Selection
const formEl = document.querySelector("[data-form]");
const inputEl = document.querySelector("[data-user-input]");

// Variables
const tasks = [];

formEl.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent refresh
  if (!inputEl.value) return; // Gaurd Clause

  //  Creating new task
  const newTask = {
    text: titleCase(inputEl.value),
    isCompleted: false,
    id: tasks.length,
  };

  //  Adding
  tasks.unshift(newTask);

  console.log(tasks);

  //  Clearing input value
  inputEl.value = "";
});

// Render the current year
const showYearEl = document.querySelector(".show-year");
showYearEl.textContent = new Date().getFullYear();
