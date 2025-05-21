const apiUrl = 'http://localhost:5299/api/task/'; 

    // Creează task pe API și inserează în coloana potrivită
    async function createTask() {
    const title = document.getElementById("taskTitle").value;
        const column = document.getElementById("taskColumn").value;
        const status = document.getElementById("taskStatus").value;

    const task = {
        title: title,
    column: column,
    description: "",
    status: status
        };
      

    try {
        const res = await fetch(apiUrl, {
        method: "POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(task)
        });

    if (!res.ok) throw new Error("Failed to create task");

    const createdTask = await res.json();
    insertTaskInBoard(createdTask);

    // curăță și închide modalul
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskColumn").value = "TO DO";
    document.getElementById("taskStatus").value = "normal";
    document.getElementById("taskModal").style.display = "none";

    } catch (err) {
        console.error("Error creating task:", err);
        }
       
}

    // Inserează task în div-ul corect
    function insertTaskInBoard(task) {
    const columnSelector = `.swim-lane[data-column="${task.column}"] .tasks-board`;
    const taskBoard = document.querySelector(columnSelector);
    

    const p = document.createElement("p");
    p.classList.add("task");
    p.setAttribute("draggable", "true");
    p.textContent = task.title;
        //const status = task.status ? ` (${task.status})` : "";
        //p.textContent = task.title + status;

        const sub = document.createElement("sub");
        sub.className = `status-index '(${task.status})`;
        sub.textContent = task.status;
       
         p.appendChild(sub);

        taskBoard.appendChild(p);
     
        applyDragEventsToTask(p);
}

// Deschidere modal
document.getElementById("openModalInput").addEventListener("click", () => {
        document.getElementById("taskModal").style.display = "block";
});

// Închidere modal
document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("taskModal").style.display = "none";
    if (document.getElementById("taskModal").style.display === "block" && !isClickInside) {
        document.getElementById("taskModal").style.display = "none";
    }
});



function applyDragEventsToTask(taskElement) {
    taskElement.addEventListener("dragstart", () => {
        taskElement.classList.add("is-dragging");
    });
    taskElement.addEventListener("dragend", () => {
        taskElement.classList.remove("is-dragging");
    });
}






//async function loadTasks() {
//    try {
//        const res = await fetch(apiUrl); // apiUrl = 'http://localhost:5299/api/task/'
//        if (!res.ok) throw new Error("Failed to load tasks");

//        const tasks = await res.json();
//        tasks.forEach(task => insertTaskInBoard(task));
//    } catch (err) {
//        console.error("Error loading tasks:", err);
//    }
//}

//window.addEventListener("DOMContentLoaded", () => {
//    loadTasks();
//});
