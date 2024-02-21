"use strict";

// Array til at gemme opgaver
let taskArray = [];

// Funktion til at hente opgaver fra local storage ved siden af indlæsning
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("taskArray");
    if (storedTasks) {
        // Konverterer den gemte JSON-streng til et array og tildel det til taskArray
        taskArray = JSON.parse(storedTasks);
    }
}

// Funktion til at gemme opgaver i local storage
function saveTasksToLocalStorage() {
    // Konverterer taskArray til en JSON-streng og gem den i local storage
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

// Funktion til at filtrere og sortere opgaver og vise dem i specifikke beholdere
function filterAndSortList() {
    // Opdeler opgaver i to arrays: todoList (ikke færdige) og finishedList (færdige)
    const todoList = taskArray.filter(task => !task.done);
    const finishedList = taskArray.filter(task => task.done);

    // Viser de filtrerede lister i deres respektive beholdere
    showList(todoList, "listContainer");
    showList(finishedList, "finishedList");

    // Gemmer opgaverne i local storage efter hver ændring
    saveTasksToLocalStorage();
}

// Funktion til at vise en liste af opgaver i en specificeret beholder
function showList(listToShow, containerId) {
    // Vælger beholderelementet ved hjælp af dets ID
    const listContainer = document.querySelector(`#${containerId}`);
    // Ryder beholderens nuværende indhold
    listContainer.innerHTML = "";

    // Gennemgår hver opgave i den givne liste
    listToShow.forEach((task) => {
        // Opretter et nyt listeelement
        const li = document.createElement("li");
        // Sætter tekstindholdet af listen til opgavens navn
        li.textContent = task.name;

        // Tilføjer klassen "checked" til listen, hvis opgaven er færdig
        if (task.done) {
            li.classList.add("checked");
        }

        // Tilføjer en klikhændelseslytter til listen for at skifte "færdig" status
        li.addEventListener("click", () => {
            task.done = !task.done;
            // Efter skift, filtrer og sorter listen igen
            filterAndSortList();
        });

        // Opretter en sletknap for hver opgave
        const spanDelete = document.createElement("span");
        // Tilføjer en klasse til sletknappen
        spanDelete.classList.add("delete-btn");
        // Sætter tekstindholdet af sletknappen til "×"
        spanDelete.textContent = "×";
        // Tilføjer en klikhændelseslytter til sletknappen for at fjerne opgaven
        spanDelete.addEventListener("click", () => {
            const index = taskArray.findIndex(currentTask => currentTask.id === task.id);
            if (index !== -1) {
                // Fjerner opgaven fra arrayet
                taskArray.splice(index, 1);
                // Efter fjernelse, filtrer og sorter listen igen
                filterAndSortList();
            }
        });

        // Vedhæfter sletknappen til listen
        li.appendChild(spanDelete);

        // Vedhæfter listen til beholderen
        listContainer.appendChild(li);
    });
}

// Tilføjer en klikhændelseslytter til knappen "Tilføj opgave"
document.querySelector("#addTaskBtn").addEventListener("click", () => {
    // Vælger inputboksens element
    const inputBox = document.querySelector("#inputBox");
    // Tjekker om inputboksen er tom
    if (inputBox.value === "") {
        // Viser en advarsel, hvis inputtet er tomt
        alert("Du mangler at tilføje en opgave");
    } else {
        // Opretter et nyt opgaveobjekt med en unik ID, navn fra input og initial "færdig" status
        const task = { id: crypto.randomUUID(), name: inputBox.value, done: false };
        console.log("Opgavens unikke id:",task.id);
        // Tilføjer opgaven til opgavearrayet
        taskArray.push(task);
        // Efter tilføjelse af opgaven, filtrer og sorter listen igen
        filterAndSortList();
        // Ryder inputboksen efter tilføjelse af opgaven
        inputBox.value = "";
    }
});

// Indlæser opgaver fra local storage ved siden af indlæsning af siden
loadTasksFromLocalStorage();

// Starter applikationen ved at indlæse, filtrere og sortere opgavelisten, når siden indlæses
filterAndSortList();
// Dette sikrer, at brugerens opgaver præsenteres korrekt ved første indlæsning, med opgaver adskilt mellem 'To-Do Liste' og 'Færdig Liste'.

