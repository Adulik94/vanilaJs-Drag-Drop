// window.onload = load;
const titleText = document.getElementById('titleText');
const lists = document.getElementById('lists');

let board_section = []
let categories = [];


//

function dragNDrop() {
    //get lise and list-item
    const list_items = document.querySelectorAll('.list-item');
    const lists = document.querySelectorAll('.list');
    //circle fot list item and getting them
    let draggedItem = null;
    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i];

        //start draggable items
        item.addEventListener('dragstart', function () {
            // console.log("dragstart")
            draggedItem = item;
            setTimeout(function () {
                item.style.display = 'none';

            }, 0);
        });

        //finish draggable item
        item.addEventListener('dragend', function () {
            // console.log("dragend")
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        //list of items
        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];

            // console.log('list ', list);
            //take item and drag over (new element inside block )
            list.addEventListener('dragover', function (event) {
                event.preventDefault();
            });

            //enter the zone of draggable item
            list.addEventListener('dragenter', function () {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            });
            //leave the zone and "delete" color
            list.addEventListener('dragleave', function (event) {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                event.preventDefault()

            });
            //drop in the zone
            list.addEventListener('drop', function () {
                //set  background color in drop zone
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                if (draggedItem === null) {
                    return
                }
                this.append(draggedItem);

            });
        }
    }
}

//creating the list
function createList(event) {
    event.preventDefault();
    //get title text
    // if input is empty alert .... if not
    if (titleText.value.length === 0) {
        alert('Section cannot be empty, please add a title of section ');
        return
    }
    //creating and append the element
    const list = createElement('div', '', 'list');
    const title = createElement('h3', titleText.value, 'list-title');


    list.id = `task-${titleText.value}-list`;
    list.append(title);
    lists.append(list);
    const taskInput = createTaskInput(titleText.value);
    list.append(taskInput);
    titleText.value = '';
    dragNDrop();
}


function showItem() {
    let taskList
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    if (localItems === null) {
        taskList = []

    } else {
        taskList = localItems;
    }

    let html = '';
    let itemShow = document.querySelector('.lists');
    taskList.forEach((data,index) => {
        html += `
        <div class="list" id="task-${data.id}-list">
        <h3 class="list-title">${data.name}</h3>
        <form class="task-form">
        <input name="task" id="task-${data.tasks}">
        <button>Add</button>
        <div class="list-item" ${index} draggable="true">${data.tasks}</div>
        </form>
        </div>
    `
    })
    itemShow.innerHTML = html;
    dragNDrop()
    createElement()

}

showItem()


//create Element
function createElement(tag, text, className = null) {
    const element = document.createElement(tag);
    // console.log('element', element)

    //if we have name then we add classList and return element
    if (className) {
        // console.log('className', className);
        element.classList.add(className);
    }
    if (text && text.length > 0) {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
    return element;
}

//create new board
function createTaskInput(listName) {
    console.log("listName", listName);
    const form = createElement('form', '', 'task-form');
    const input = createElement('input', '');
    const button = createElement('button', '');
    let boardList
    if (listName !== 0) {
        let localItems = JSON.parse(localStorage.getItem("localItem"))
        if (localItems === null) {
            boardList = []
        } else {
            boardList = localItems;
        }

        const id = `task-${listName}`;
        boardList.push({"name": listName, "id": id})
        localStorage.setItem('localItem', JSON.stringify(boardList))
        input.name = 'task';
        input.id = id;
        button.innerText = 'Add';
        button.addEventListener('click', function (event) {
            event.preventDefault();
            // showItem()
            addTaskListItem(id);
        });
        form.append(input);
        form.append(button);

    }

    return form;
}


//add task item in board
function addTaskListItem(id) {
    //get element by id
    const task = document.getElementById(id);

    //creating new task in block
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    const item = localItems.find(el => el.id === id);

    if (item.tasks) {
        item.tasks.push(task.value)
    } else {
        item.tasks = [task.value]
    }
    localItems = localItems.filter(el => el.id !== id);
    localItems.push(item);
    localStorage.setItem("localItem", JSON.stringify(localItems))

    if (task.value.length === 0) {
        alert('add new task');
        return []

    }

    const list = document.getElementById(`${id}-list`);
    const listItem = createElement('div', task.value, 'list-item');

    listItem.setAttribute('draggable', true);
    task.value = '';
    list.append(listItem);
    dragNDrop();
}
