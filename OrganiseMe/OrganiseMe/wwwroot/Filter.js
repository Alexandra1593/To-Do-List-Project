//const apiUrl = "http://localhost:5299/api/task";

document.getElementById("statusFilter").addEventListener("change", function () {
    const selectedStatus = this.value.toLowerCase();

    document.querySelectorAll(".task").forEach(task => {
        const statusElement = task.querySelector("sub"); // status e subscript
        if (!statusElement) return;

        const taskStatus = statusElement.textContent.toLowerCase();

        if (selectedStatus === "" || taskStatus === selectedStatus) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
});



//search
document.getElementById("searchInput").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    document.querySelectorAll(".task").forEach(task => {
        // obține tot textul din p, apoi scoate statusul
        const fullText = task.textContent.toLowerCase();
        const statusText = task.querySelector("sub")?.textContent.toLowerCase() || "";

        // elimină statusul din textul complet pentru a rămâne doar titlul
        const titleOnly = fullText.replace(statusText, "").trim();

        task.style.display = titleOnly.includes(searchText) ? "block" : "none";
    });
});
