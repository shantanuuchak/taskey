import "./index.css";
import localforage from "localforage";
import SingleTask from "./components/SingleTask";
import { titleCase, randomID } from "./utils";
import { formEl, inputEl, taskContainerEl } from "./domSelection";

localforage.setDriver(localforage.LOCALSTORAGE);

// MARK: State
let state = [];

function updateLocal() {
  localforage.setItem("tasks", state);
}

localforage.getItem("tasks").then((data) => {
  state = data || [];
  renderTasks();
});

function clearTasks() {
  state.length = 0;
  updateLocal();
  renderTasks();
  inputEl.value = "";
}

function toggleCompleted(id) {
  state = state.map((task) => {
    if (id === task.id) {
      return { ...task, isCompleted: !task.isCompleted };
    }

    return task;
  });

  updateLocal();
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

// MARK: Listeners
// On new task add
formEl.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent refresh
  if (!inputEl.value) return; // Gaurd Clause

  if (inputEl.value === ":clearall") return clearTasks();

  //  Creating new task
  const newTask = {
    text: titleCase(inputEl.value),
    isCompleted: false,
    id: randomID(),
  };

  //  Adding
  state.unshift(newTask);

  // localforage.setItem("tasks", state);
  updateLocal();

  renderTasks();

  //  Clearing input value
  inputEl.value = "";
});

// On task toggle
taskContainerEl.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    toggleCompleted(e.target.id);

    // To show uncompleted first
    state.sort((a, b) => a.isCompleted - b.isCompleted);

    // localforage.setItem("tasks", state);
    updateLocal();

    renderTasks();
  }
});

// Render the current year
const showYearEl = document.querySelector(".show-year");
showYearEl.textContent = new Date().getFullYear();
