let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
for (let i = 0; i < tasks.length; i++) {
  let li = document.createElement("li");
  li.textContent = tasks[i];

  li.onclick = function () {
    const isDone = li.dataset.done === "1";

    if (isDone) {
      li.dataset.done = "0";
      li.style.removeProperty("text-decoration");
    } else {
      li.dataset.done = "1";
      li.style.setProperty("text-decoration", "line-through", "important");
    }

    console.log("clicked:", li.textContent, "| done?", li.dataset.done);
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";

  deleteBtn.onclick = function (event) {
    event.stopPropagation();
    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

}

addBtn.onclick = function () {
  let task = taskInput.value.trim();

  if (task === "") {
    alert("Enter a task");
    return;
  }

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
};

renderTasks();
