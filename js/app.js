const main = document.querySelector("main");

main.addEventListener("click", (event) => {
    //only click on button
    if (event.target.tagName === "BUTTON") {
        //get button name  from attribute "data-name"
        const { name } = event.target.dataset;
        //if we have add button we should define text task
        if (name === "add-btn") {                       //[data-name='odo-input'] for changing  styles
            const todoInput = main.querySelector('[data-name="todo-input"]');

           //if its not empty we get text

            if (todoInput.value.trim() !== "") {
                const value = todoInput.value;
                //creating task shablon .....
                const template = `
                            <li class="list-group-item" draggable="true" data-id="${Date.now()}">
                              <p>${value}</p>
                              <button class="btn btn-outline-danger btn-sm" data-name="remove-btn">X</button>
                            </li>
                `;
                //find list of tasks  add shablon and clear
                const todosList = main.querySelector('[data-name="todos-list"]');
                        //insertAdjacentHTML   parses specific text as html result parse into dom ( special position )
                        //beforeend : Just inside the element, after its last child.
                todosList.insertAdjacentHTML("beforeend", template);
                todoInput.value = "";
            }
        } else if (name === "remove-btn") {
            //delete task
            event.target.parentElement.remove();
        }
    }
});

//get draggable item
main.addEventListener("dragenter", (event) => {
    if (event.target.classList.contains("list-group")) {
        event.target.classList.add("drop");
    }
});

//put draggable item
main.addEventListener("dragleave", (event) => {
    if (event.target.classList.contains("drop")) {
        event.target.classList.remove("drop");
    }
});

//start dragging
main.addEventListener("dragstart", (event) => {
    if (event.target.classList.contains("list-group-item")) {
        //dataTransfer use for save data that is dragged during dNd operation
        event.dataTransfer.setData("text/plain", event.target.dataset.id);
    }
});

//creat
let elemBelow = "";

main.addEventListener("dragover", (event) => {
    event.preventDefault();
    elemBelow = event.target;
});

main.addEventListener("drop", (event) => {
    const todo = main.querySelector(
        `[data-id="${event.dataTransfer.getData("text/plain")}"]`
    );

    if (elemBelow.tagName === "P" || elemBelow.tagName === "BUTTON") {
        elemBelow = elemBelow.parentElement;
    }

    if (elemBelow.classList.contains("list-group-item")) {
        const center =
            elemBelow.getBoundingClientRect().y +
            elemBelow.getBoundingClientRect().height / 2;

        if (event.clientY > center) {
            if (elemBelow.nextElementSibling !== null) {
                elemBelow = elemBelow.nextElementSibling;
            } else {
                return;
            }
        }

        elemBelow.parentElement.insertBefore(todo, elemBelow);
        todo.className = elemBelow.className;
    }

    if (event.target.classList.contains("list-group")) {
        event.target.append(todo);

        if (event.target.classList.contains("drop")) {
            event.target.classList.remove("drop");
        }

        const { name } = event.target.dataset;

        if (name === "completed-list") {
            if (todo.classList.contains("in-progress")) {
                todo.classList.remove("in-progress");
            }
            todo.classList.add("completed");
        } else if (name === "in-progress-list") {
            if (todo.classList.contains("completed")) {
                todo.classList.remove("completed");
            }
            todo.classList.add("in-progress");
        } else {
            todo.className = "list-group-item";
        }
    }
});


function addToLocalStorage(todos) {
    localStorage.setItem('todos',JSON.stringify(todos))
}
