import "./index.css";

import SingleTask from "./components/SingleTask";
import { titleCase, randomID } from "./utils";

// === MARK: DOM
const formEl = document.querySelector("[data-form]");
const inputEl = document.querySelector("[data-user-input]");
const taskContainerEl = document.querySelector("[data-task-container]");

// Variables
let state = [];

function toggleCompleted(id) {
  state = state.map((task) => {
    if (id === task.id) {
      return { ...task, isCompleted: !task.isCompleted };
    }

    return task;
  });
}

// MARK: Render
function renderTasks() {
  taskContainerEl.innerHTML = "";

  const frag = document.createDocumentFragment();
  state.forEach((task) => {
    frag.appendChild(SingleTask(task.text, task.isCompleted, task.id));
  });

  taskContainerEl.appendChild(frag);
}

// MARK: Listener
formEl.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent refresh
  if (!inputEl.value) return; // Gaurd Clause

  //  Creating new task
  const newTask = {
    text: titleCase(inputEl.value),
    isCompleted: false,
    id: randomID(),
  };

  //  Adding
  state.unshift(newTask);

  renderTasks();

  //  Clearing input value
  inputEl.value = "";
});

taskContainerEl.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    toggleCompleted(e.target.id);

    // To show uncompleted first
    state.sort((a, b) => a.isCompleted - b.isCompleted);

    renderTasks();
  }
});

// Render the current year
const showYearEl = document.querySelector(".show-year");
showYearEl.textContent = new Date().getFullYear();
