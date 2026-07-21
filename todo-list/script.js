const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");
const remainingCount = document.getElementById("remainingCount");
const clearCompletedButton = document.getElementById("clearCompletedButton");

let tasks = [];
let nextId = 1;


taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();

  if (taskName === "") {
    errorMessage.textContent = "Please enter a task.";
    return;
  }

  const newTask = {
    id: nextId,
    name: taskName,
    completed: false
  };

  tasks.push(newTask);
  nextId = nextId + 1;

  taskInput.value = "";
  errorMessage.textContent = "";

  showTasks();
});


function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    if (task.completed === true) {
      taskItem.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;

    const taskName = document.createElement("span");
    taskName.className = "task-name";
    taskName.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task-button";
    deleteButton.textContent = "Delete";

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      showTasks();
    });

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });

      showTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });

  updateTaskCount();
}


function updateTaskCount() {
  const unfinishedTasks = tasks.filter(function (task) {
    return task.completed === false;
  });

  remainingCount.textContent = unfinishedTasks.length;

  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}


clearCompletedButton.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return task.completed === false;
  });

  showTasks();
});


showTasks();