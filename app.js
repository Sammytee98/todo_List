const inputField = document.querySelector("#inputField");
const taskList = document.querySelector("#taskList");
const taskCounter = document.querySelector("#taskCounter");

let completedTasks = 0;
let totalTasks = 0;

function updateTaskCounter() {
    if(taskList.children.length === 0) {
        completedTasks = 0;
        totalTasks = 0;
        taskCounter.innerText = "0/0";
    }
    else if(completedTasks === totalTasks && totalTasks !== 0) {
        const audio = new Audio("audio/good-job.ogg")
                blastConfetti();
                audio.play();
                setTimeout(() => {
                    completedTasks = 0;
                    totalTasks = 0;
                    taskCounter.innerText = `${completedTasks}/${totalTasks}`;
                }, 500);
        }
        taskCounter.innerText = `${completedTasks}/${totalTasks}`;
    saveCounter();
}

function addTask() {
    if(inputField.value === "") {
        alert("You must input a task before you can add!");
    } else {
        let list = document.createElement("li");
        list.innerHTML = inputField.value;
        taskList.appendChild(list);
        let renameTask = document.createElement("i");
        renameTask.className = "renameIcon";
        list.appendChild(renameTask);
        let deleteTask = document.createElement("span");
        list.appendChild(deleteTask);
        totalTasks++;
        updateTaskCounter();
        saveCounter();
    }
    inputField.value = "";
    saveCounter();
    saveTasks();
}

document.querySelector("button").addEventListener("click", addTask);
inputField.addEventListener("keypress", (e)  => {
    if(e.key === "Enter") {
        addTask();
    }
});

taskList.addEventListener("click", (e) => {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if(e.target.classList.contains("checked")) {
            completedTasks++;
            saveCounter();
        }    
        else {
            completedTasks--;
            saveCounter();
        }
        updateTaskCounter();
        saveTasks();
        if(e.target.classList.contains("checked")) {
                setTimeout(() => {
                    e.target.remove();
                    saveTasks();
                }, 500);
        }
    } 
    else if(e.target.className === "renameIcon") {
        inputField.value = e.target.parentElement.textContent;
        e.target.parentElement.remove();
        totalTasks--;
        updateTaskCounter();
        saveCounter();
        saveTasks();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        totalTasks--;
        updateTaskCounter();
        saveCounter();
        saveTasks();
    }
    });

function blastConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

function saveTasks() {
    localStorage.setItem("data", taskList.innerHTML);
}
function showSavedTask() {
    taskList.innerHTML = localStorage.getItem("data");
}


function saveCounter() {
    localStorage.setItem("count", taskCounter.innerText);
}
function showSavedCounter() {
    const savedCounter = localStorage.getItem("count");
    if(savedCounter) {
        const [completed, total] = savedCounter.split("/");
        completedTasks = parseInt(completed) || 0;
        totalTasks = parseInt(total) || 0;
        taskCounter.innerText = savedCounter;
    }
}

showSavedCounter();
showSavedTask();