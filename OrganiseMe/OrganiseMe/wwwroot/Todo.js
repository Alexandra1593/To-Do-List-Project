const taskBarButton = document.getElementById("Add-TaskBar");
const lanesContainer = document.querySelector(".lanes");

taskBarButton.addEventListener("click", (e) => {
    e.preventDefault();

    const newLane = document.createElement("div");
    newLane.classList.add("swim-lane");

    const laneTitle = document.createElement("h3");
    laneTitle.classList.add("heading");
    laneTitle.innerText = "New Lane";

    newLane.appendChild(laneTitle);

    const initialTask = document.createElement("p");
    initialTask.classList.add("task");
    initialTask.setAttribute("draggable", "true");
    initialTask.innerText = "New task in this lane";

    // Add drag events
    initialTask.addEventListener("dragstart", () => {
        initialTask.classList.add("is-dragging");
    });

    initialTask.addEventListener("dragend", () => {
        initialTask.classList.remove("is-dragging");
    });

    newLane.appendChild(initialTask);
    lanesContainer.appendChild(newLane);
});



/* drag*/

const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".tasks-board");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");

        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }
    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};






// CRUD buttons for tasks


let currentTask = null;

document.querySelectorAll('.task').forEach(div => {
    div.addEventListener('contextmenu', function (e) {
        e.preventDefault();

        currentTask = e.currentTask; // save reference to clicked div

        const menu = document.getElementById('contextMenu');
        menu.style.display = 'flex';
        menu.style.left = `${e.pageX}px`;
        menu.style.top = `${e.pageY}px`;
        
    });
});



function deleteItem() {
    alert('Delete clicked for ' + currentTask.dataset.id);
}

//--------------------------
//let selectedTask = null;

//// 🔹 Afișează butonul Delete când dai click pe un task
//function enableTaskSelection() {
//    document.querySelectorAll('.task').forEach(task => {
//        task.addEventListener('click', (e) => {
//            selectedTask = task;

//            // Afișează butonul delete (poziționat după nevoi)
//            const deleteBtn = document.getElementById("deleteTaskBtn");
//            deleteBtn.style.display = "inline-block";

//            // Poziționează butonul lângă task-ul selectat (opțional)
//            const rect = task.getBoundingClientRect();
//            deleteBtn.style.position = "absolute";
//            deleteBtn.style.top = `${rect.top + window.scrollY}px`;
//            deleteBtn.style.left = `${rect.right + 10}px`;
//        });
//    });
//}

//// 🔹 Creează și atașează un task în DOM (folosit și la adăugare)
//function createTaskElement(task) {
//    const newTask = document.createElement("p");
//    newTask.classList.add("task");
//    newTask.setAttribute("draggable", "true");
//    newTask.innerText = task.Title;

//    newTask.addEventListener("dragstart", () => newTask.classList.add("is-dragging"));
//    newTask.addEventListener("dragend", () => newTask.classList.remove("is-dragging"));

//    newTask.addEventListener("click", () => {
//        selectedTask = newTask;
//        const deleteBtn = document.getElementById("deleteTaskBtn");
//        deleteBtn.style.display = "inline-block";
//        const rect = newTask.getBoundingClientRect();
//        deleteBtn.style.top = `${rect.top + window.scrollY}px`;
//        deleteBtn.style.left = `${rect.right + 10}px`;
//    });

//    return newTask;
//}

//// 🔹 Butonul DELETE
//document.getElementById("deleteTaskBtn").addEventListener("click", async () => {
//    if (!selectedTask) {
//        alert("Niciun task selectat.");
//        return;
//    }

//    const title = selectedTask.innerText;

//    try {
//        const response = await fetch(`http://localhost:5299/api/tasks/by-title/${encodeURIComponent(title)}`, {
//            method: "DELETE"
//        });

//        if (!response.ok) {
//            const errorText = await response.text();
//            console.error("❌ Server error:", errorText);
//            alert("Eroare la ștergerea taskului.");
//            return;
//        }

//        selectedTask.remove();
//        selectedTask = null;
//        document.getElementById("deleteTaskBtn").style.display = "none";

//    } catch (err) {
//        console.error("Eroare la DELETE:", err);
//        alert("Eroare la ștergerea taskului.");
//    }
//});

//// 🔹 Apel inițial pentru taskurile deja în DOM
//enableTaskSelection();














////Modal for input tasks

////const modal = document.getElementById('taskModal');
////const openModalInput = document.getElementById('openModalInput');
////const closeModalBtn = document.getElementById('closeModalBtn');
////const saveTaskBtn = document.getElementById('saveTaskBtn');

////openModalInput.addEventListener('click', () => {
////    modal.style.display = 'flex';
////});

////closeModalBtn.addEventListener('click', () => {
////    modal.style.display = 'none';
////});



const modal = document.getElementById('taskModal');
const openModalInput = document.getElementById('openModalInput');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveTaskBtn = document.getElementById('saveTaskBtn');

openModalInput.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});





//saveTaskBtn.addEventListener("click", async () => {
//    const title = document.getElementById("taskTitle").value.trim();
//    const column = document.getElementById("taskColumn").value;

//    if (!title) return alert("Please enter a task title");

//    try {
//        const response = await fetch("http://localhost:5299/api/tasks", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json"
//            },
//            body: JSON.stringify({
//                Title: title,
//                Column: column
//            })
//        });


//        if (!response.ok) {
//            const errorText = await response.text();
//            console.error("❌ Server error:", errorText);
//            alert("Eroare la adăugarea taskului.\n" + errorText); // 💡 vezi motivul exact
//            return;
//        }




//        if (!response.ok) {
//            const errorText = await response.text();
//            console.error("Eroare server:", errorText);
//            throw new Error("Failed to create task");
//        }

//        const createdTask = await response.json();

//        const newTask = document.createElement("p");
//        newTask.classList.add("task");
//        newTask.setAttribute("draggable", "true");
//        newTask.innerText = createdTask.Title;

//        newTask.addEventListener("dragstart", () => {
//            newTask.classList.add("is-dragging");
//        });

//        newTask.addEventListener("dragend", () => {
//            newTask.classList.remove("is-dragging");
//        });


       
//        const columnName = createdTask.Column.trim().toLowerCase();
//        const targetColumn = [...document.querySelectorAll("[data-column]")].find(el =>
//            el.getAttribute("data-column").trim().toLowerCase() === columnName
//        );

//        if (!targetColumn) {
//            console.error("Coloana nu există:", createdTask.Column);
//            alert("Coloana nu există în pagină.");
//            return;
//        }

//        targetColumn.appendChild(newTask);

//        document.getElementById("taskTitle").value = "";




//        modal.style.display = 'none';

//    } catch (error) {
//        console.error(error);
//        alert("Eroare la adăugarea taskului.");
//    }
//});




function createTaskElement(task) {
    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = task.Title;
    newTask.dataset.id = task.Id; // 🔑 Salvăm ID-ul

    newTask.addEventListener("click", () => {
        selectedTask = newTask;
        document.getElementById("deleteTaskBtn").style.display = "inline-block";
    });

    return newTask;
}


document.getElementById("saveTaskBtn").addEventListener("click", async () => {
    const title = document.getElementById("taskTitle").value.trim();
    const column = document.getElementById("taskColumn").value;

    if (!title) return alert("Please enter a task title");

    try {
        const response = await fetch("http://localhost:5299/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Title: title, Column: column })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error:", errorText);
            alert("Eroare la salvare: " + errorText);
            return;
        }

        const createdTask = await response.json();
        const taskElement = createTaskElement(createdTask);

        const columnEl = [...document.querySelectorAll("[data-column]")].find(el =>
            el.getAttribute("data-column").trim().toLowerCase() === createdTask.Column.trim().toLowerCase()
        );

        if (columnEl) {
            columnEl.appendChild(taskElement);
        } else {
            alert("Coloana nu există.");
        }

        document.getElementById("taskTitle").value = "";
        modal.style.display = "none";
    } catch (err) {
        console.error(err);
        alert("Eroare la adăugare.");
    }
});



let selectedTask = null;

document.getElementById("deleteTaskBtn").addEventListener("click", async () => {
    if (!selectedTask) return alert("Niciun task selectat.");
    const taskId = selectedTask.dataset.id;

    try {
        const response = await fetch(`http://localhost:5299/api/tasks/${taskId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Delete error:", errorText);
            alert("Eroare la ștergere: " + errorText);
            return;
        }

        selectedTask.remove();
        selectedTask = null;
        document.getElementById("deleteTaskBtn").style.display = "none";

    } catch (err) {
        console.error("Eroare la DELETE:", err);
        alert("Eroare la ștergerea taskului.");
    }
});

console.log("🧨 Task selectat:", selectedTask);
console.log("🔑 ID pentru ștergere:", taskId);
