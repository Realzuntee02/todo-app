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

  // ✅ wrap text in a span
  let textSpan = document.createElement("span");
  textSpan.textContent = tasks[i];
  textSpan.className = "taskText";

  // ✅ toggle strike on the span (reliable)
  textSpan.onclick = function () {
  textSpan.classList.toggle("done");
  console.log("class:", textSpan.className);
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

  li.appendChild(textSpan);
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
