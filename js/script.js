// window.onload = function() {
//     displayTask();
// }
//
// // Create some variables
// const main = document.querySelector("main");
//
// const input = document.querySelector('[data-name="todo-input"]');
// const btn = document.querySelector("[data-name='add-btn']");
// const todoList = document.querySelector('[data-name="todos-list"]');
// const clear = document.querySelector('[data-name="remove-btn"]');
// //Add an EventListener to the BTN
// btn.addEventListener("click", addTask);
//
// //CREATE FUNCTION FOR ADDING TASK
// function addTask() {
//     if (input.value !== "") {
//         addTaskToLS();
//         todoList.innerHTML = "";
//         displayTask();
//     } else {
//         alert("Please enter a task")
//     }
// }
//
// //SAVE TASK TO LOCAL STORAGE
// function addTaskToLS() {
//     let tasks;
//     if (localStorage.getItem("tasks") === null) {
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem("tasks"))
//     }
//     tasks.push(input.value);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     console.log(input.value);
//     input.value = "";
// }
//
// // DISPLAY TASK
// function displayTask() {
//     let tasks;
//     if (localStorage.getItem("tasks") === null) {
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem("tasks"))
//     }
//
//     tasks.forEach(function(task, index) {
//         const todo = main.querySelector(
//             `[data-id="${event.dataTransfer.getData("text/plain")}"]`
//         );
//
//
//     })
//
// }
//
// // DELETE A TASK
// function deleteTask(index) {
//     let tasks;
//     const del = confirm("You are about to delete this task");
//
//     if (del === true) {
//         if (localStorage.getItem("tasks") === null) {
//             tasks = [];
//         } else {
//             tasks = JSON.parse(localStorage.getItem("tasks"))
//         }
//     }
//     tasks.splice(index, 1);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     todoList.innerHTML = "";
//     displayTask();
// }
//
// // Clear Tasks
// clear.addEventListener("click", clearTask);
//
// function clearTask() {
//     const delTasks = confirm("Delete all tasks");
//     if (delTasks === true) {
//         localStorage.clear();
//         todoList.innerHTML = "";
//         displayTask();
//     }
// }
//
// for (let i = 0; i <= localStorage.length; i++) {
//     let key = localStorage.key(i);
//     console.log(localStorage.getItem(key));
// }
