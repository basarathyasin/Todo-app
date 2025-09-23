// Select input, button, and the task list
let input = document.querySelector("#task-input");
let addtask = document.querySelector("#add-task-btn");
let tasks = document.querySelector("#task-list");




// Load tasks from localStorage on page load
window.addEventListener("load", function(){
    let savedTask = JSON.parse(localStorage.getItem("tasks")) || []; // get tasks or empty array
    savedTask.forEach(element => {
        createTask(element, false); // call createTask for each saved task
    });
});

// listening for enter key to submit the form ;
input.addEventListener("keydown", function (e){
    if(e.key === "Enter" && input.value !== ""){
        createTask(input.value);
        input.value = "";
        
    }

})
// Listening for Add button click
addtask.addEventListener("click", function(){
    if(input.value.trim() !== ""){ 
        createTask(`${input.value}`); // create the new task in DOM
        input.value = ""; 
    } else return; // 
});

// Create Task in DOM
function createTask(task, save = true){
    let createTaskEle = document.createElement("li"); // create li element
    createTaskEle.textContent = task; // add text to li
    // Create a delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "500px";

    // Correctly call deleteTasks and pass the li element
    delBtn.addEventListener("click", () => deleteTasks(task, createTaskEle));

    createTaskEle.appendChild(delBtn); // add button to li
    tasks.appendChild(createTaskEle);   // append li to task list

    if(save) savetasks(task); // only save if it's a new task
}
// Save tasks in localStorage
function savetasks(task){
    let saveTask = JSON.parse(localStorage.getItem("tasks")) || []; // get saved tasks or empty array
    saveTask.push(task); // add new task to array
    localStorage.setItem("tasks", JSON.stringify(saveTask)); // save updated array back to localStorage
}

function deleteTasks(taskText, liElement){
    // Remove from DOM
    liElement.remove();
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    allTasks = allTasks.filter(t => t !== taskText); // remove matching task
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function updateClock(){
    let clock = document.querySelector("#clock");
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: true }); 
    clock.textContent = timeString;
    


}
updateClock();

setInterval(updateClock,1000);