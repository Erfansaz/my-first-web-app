const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    list.innerHTML = "";

    tasks.forEach(function (task, index) {
        const taskElement = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = task.text;

        if (task.completed) {
            text.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = "Done";

        completeButton.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            showTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);

            saveTasks();
            showTasks();
        });

        taskElement.appendChild(text);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);

        list.appendChild(taskElement);
    });
}

button.addEventListener("click", function () {
    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    showTasks();

    input.value = "";
});

showTasks();