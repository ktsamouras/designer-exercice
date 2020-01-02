"use strict";

/*
    Collapse the coloured tasks
*/
const primaryButton = document.getElementById("primary");

const calendar = document.getElementsByClassName("calendar")[0];
const calendarColors = document.getElementsByClassName("calendar__colors");

primaryButton.addEventListener("click", collapseColoured, false);

function collapseColoured() {
    calendar.classList.toggle("bg-lighter");
    for (let row of calendarColors) {
        row.classList.toggle("invisible");
        row.previousElementSibling.classList.toggle("invisible");
    }
}



/*
    User actions when hovering/clicking the coloured tasks
*/
const tasks = document.querySelectorAll(".calendar__colors .progress");
const tasksAction = document.getElementsByClassName("progress__actions");

// Add the listeners with their respective function for every task
tasks.forEach(item => {
    item.addEventListener("mouseover", event => {
        addPopover(item);
    });
});

// Add a click listener on the body to remove the popover when a user clicks outside of it (or any of the buttons)
document.body.addEventListener("click", event => {
    if (Boolean(tasksAction[0]) === false) return;
    else if (event.target.parentElement.classList.contains("progress")) return;
    else if (event.target == tasksAction[0]) return;
    else return removePopover();
});


function addPopover(i) {
    // check first if a popover already exists and remove it.
    if (Boolean(tasksAction[0]) === true) removePopover();

    // we define the content inside the function, allowing us to adjust it based on where it was called.
    let tasksActionContent = `
        <button class="btn btn-secondary">Plan existing</button>
        <button class="btn btn-outline-secondary">Create</button>
    `;

    // add the container "progress__actions" and it's content
    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("progress__actions");
    i.parentElement.insertBefore(actionsContainer, i);
    // Insert the content
    tasksAction[0].innerHTML = tasksActionContent;

    // initialize the mouseleave listener to remove the popover inside of the function since it doesn't exist yet.
    tasksAction[0].addEventListener("mouseleave", removePopover, false);
}

function removePopover() {
    tasksAction[0].parentElement.removeChild(tasksAction[0]);
}

