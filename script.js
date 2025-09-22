// Select input, button, and the task list
let input = document.querySelector("#task-input");
let addtask = document.querySelector("#add-task-btn");
let tasks = document.querySelector("#task-list");

// Load tasks from localStorage on page load
window.addEventListener("load", function(){
    let savedTask = JSON.parse(localStorage.getItem("tasks")) || []; // get tasks or empty array
    console.dir(savedTask); 
    savedTask.forEach(element => {
        createTask(element, false); // call createTask for each saved task
    });
});

// Listening for new task and calling createTask to add them to DOM
addtask.addEventListener("click", function(){
    if(input.value.trim() !== ""){ // check input is not empty
        createTask(input.value); // create the new task in DOM
        input.value = ""; 
    } else return; // 
});

// Create Task in DOM
function createTask(task, save = true){
    let createTaskEle = document.createElement("li"); // create li element
    createTaskEle.textContent = task; // add text to li
    tasks.appendChild(createTaskEle); // append li to task list
    if(save) savetasks(task); // only save if it's a new task
}

// Save tasks in localStorage
function savetasks(task){
    let saveTask = JSON.parse(localStorage.getItem("tasks")) || []; // get saved tasks or empty array
    saveTask.push(task); // add new task to array
    localStorage.setItem("tasks", JSON.stringify(saveTask)); // save updated array back to localStorage
}
