/*
    Students Tasks:
    [1] Use Sweet Alert If Input Is Empty.
    [2] Check If Task Is Exists.
    [3] Create Delete All Tasks Button.
    [4] Create Finish All Tasks Button.
    todo: [5] Add To Tasks To The Local Storage.
    todo: styling ui and custom colors and background
*/


// get the current time 
const gatCurrentTime = () => {
    const currentTime = new Date();
    // للحصول على الساعة والدقيقة والثانية
    let hours = currentTime.getHours();
    let mintus = currentTime.getMinutes();
    let secound = currentTime.getSeconds();
    return ` الوقت : ${hours}:${mintus}:${secound}`;
}

document.getElementById("time").innerHTML = gatCurrentTime()

// get the current data 
const getCurrentData = () => {
    const currentData = new Date();
    //  للحصول على التاريخ بتنسيق السنة  واليوم والشهر
    let yaer = ` التاريخ:  ${currentData.getDate()}/ ${(currentData.getMonth() + 1)} / ${currentData.getFullYear()}`;
    return yaer;
}

document.getElementById("data").innerHTML = getCurrentData()

// Setting Up Variables 
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let taskCount = document.querySelector(".task-count span");
let taskCompletes = document.querySelector(".task-completed span");
let deleteAllTask = document.getElementById("delete");
let finished = document.getElementById("finsh");

// Focus On Input Filed 
window.onload = function () {
    saveUser = localStorage.getItem("user");

    if (!saveUser) {
        let userName = prompt("يرجى ادخال الاسم");
        document.getElementById("userName").innerHTML = `مرحبا , ${userName}`;
        saveUser = localStorage.setItem("user", userName)
    } else {
        document.getElementById("userName").innerHTML = `مرحبا , ${saveUser}`
    }

    theInput.focus();
};

// Adding The Task
theAddButton.onclick = function () {

    // IF Input is Empty
    if (theInput.value === '') {
        Swal.fire("الحقل فارغ! قم باضافة مهمة");
    } else {
        let noTasksMsg = document.querySelector(".no-task-message");
        // Check IF Span With No Tasks Message Is Exist
        if (document.body.contains(document.querySelector(".no-task-message"))) {
            // Remove No Tasks Message 
            noTasksMsg.remove();
        }
        // Create Main Span Elements
        let mainSpan = document.createElement("span");

        // Create Delete Button 
        let deleteElements = document.createElement("span");

        // Create The Main Span Text
        let text = document.createTextNode(theInput.value);

        // Create The Button Delete Text
        let deleteText = document.createTextNode("حذف");

        // Add  Text To Main Span
        mainSpan.appendChild(text);

        // Add class To Main Span
        mainSpan.className = 'task-box';

        // Add  Text To Delete Button
        deleteElements.appendChild(deleteText);

        // Add class To Delete Button
        deleteElements.className = 'حذف';

        // Add Delete Button To Main Span
        mainSpan.appendChild(deleteElements);

        // Add The Task To The Container 
        tasksContainer.appendChild(mainSpan);
        // 

        // Empty The Input
        theInput.value = '';

        // Focus On Filed
        theInput.focus();

        // Calculate Tasks
        CalculateTasks();
        // delete all tasks
        deleteAllTask.addEventListener("click", () => {
            const tasklist = tasksContainer.innerHTML = "";
        })
    }

};




document.addEventListener('click', function (e) {

    // Delete Task
    if (e.target.className == 'حذف') {

        // Remove Current Task
        e.target.parentNode.remove();

        // Check Number Of Tasks Inside The Container
        if (tasksContainer.childElementCount == 0) {
            createNoTasks();
        }

    }

    // Finish Task
    if (e.target.classList.contains('task-box')) {

        // Toggle Class  'finished'
        e.target.classList.toggle("finished");

    }

    // Calculate Tasks
    CalculateTasks();
});

//
let finshed = document.getElementById("finsh");
finished.onclick = () => {
    let arr = Array.from(document.querySelectorAll(".task-box"));
    for (i = 0; i <= arr.length; i++) {
        if (arr[i].classList.contains("task-box")) {
            arr[i].classList.add("finished")
        }
    }
}

// Function To Create No Tasks Message 
function createNoTasks() {

    // Create Message Span Elements
    let msgSpan = document.createElement("span");

    // Create The Text Message 
    let msgText = document.createTextNode("لاتوجد مهمات حاليا");

    // Add Text To Message Span Element
    msgSpan.appendChild(msgText);

    // Add Class To Message Span 
    msgSpan.className = 'no-task-message';

    // Append The Message Span ElEment To The Task Container 
    tasksContainer.appendChild(msgSpan);
};

// Function To Calculate Tasks 
function CalculateTasks() {

    // Calculate All Tasks
    taskCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;

    // Calculate Completed Tasks
    taskCompletes.innerHTML = document.querySelectorAll('.tasks-content .finished').length;

};

