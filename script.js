document.addEventListener("DOMContentLoaded", () => {
  const addForm = document.querySelector(".addForm");
  const taskInput = document.querySelector("#todoName");
  const tasksToDoContainer = document.getElementById("tasks-to-do-container");
  const doneContainer = document.getElementById("done-container");
  const clearCompletedButton = document.getElementById("clear-completed");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    tasksToDoContainer.innerHTML = "";
    doneContainer.innerHTML = "";

    tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.className = "task";
      if (task.completed) taskElement.classList.add("completed");

      taskElement.innerHTML = `
          <div class="left">
            <h4>${task.text}</h4>
          </div>
          <div class="actions">
            <button class="complete"><i class="fa-regular fa-check"></i></button>
            <button class="delete"><i class="fa-regular fa-trash"></i></button>
          </div>
        `;

      const completeButton = taskElement.querySelector(".complete");
      const deleteButton = taskElement.querySelector(".delete");

      completeButton.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      if (task.completed) {
        doneContainer.appendChild(taskElement);
      } else {
        tasksToDoContainer.appendChild(taskElement);
      }
    });
  };

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  });

  clearCompletedButton.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
  });

  renderTasks();
});
