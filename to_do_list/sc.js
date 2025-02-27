document.addEventListener("DOMContentLoaded", function() {
    let input = document.querySelector("#Add_task");
    let input1=document.querySelector("#search");
    let low = document.querySelector("#list-works");
    let losd = document.querySelector("#ongoing-works");
    let lcd = document.querySelector("#completed-works");

    const load_task = () => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let s = new Set();
        tasks.forEach(task => {
            if (!s.has(task)) {
                createTaskElement(task, low, "Move to Ongoing", moveToOngoing, "tasks");
                s.add(task);
            }
        });
        let sdw = JSON.parse(localStorage.getItem("sdw")) || [];
        s = new Set();
        sdw.forEach(task => {
            if (!s.has(task)) {
                createTaskElement(task, losd, "Move to Completed", moveToCompleted, "sdw");
                s.add(task);
            }
        });
        let cdw = JSON.parse(localStorage.getItem("cdw")) || [];
        s = new Set();
        cdw.forEach(task => {
            if (!s.has(task)) {
                createTaskElement(task, lcd, "Completed", () => {}, "cdw");
                s.add(task);
            }
        });
    };
    const addtask = () => {
        let here = input.value.trim();
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        if (!here || tasks.includes(here)) {
            input.value = "";
            return;
        }
        tasks.push(here);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        createTaskElement(here, low, "Move to Ongoing", moveToOngoing, "tasks");
        input.value = "";
    };
    const sb = () => {
        let here = input1.value.trim();
        let tasks=document.querySelectorAll("#list-works .task");
        tasks.forEach(task => {
            let temp=task.querySelector("span").textContent;
            if (temp.includes(here)) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        });
        input1.value="";
    };
    const createTaskElement = (task, parent, btnText, action, storageKey) => {
        let nw = document.createElement("div");
        nw.className = "task";

        let taskText = document.createElement("span");
        taskText.textContent = task;

        let actionBtn = document.createElement("button");
        actionBtn.textContent = btnText;
        actionBtn.addEventListener("click", function() {
            action(nw, task, storageKey);
        });

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", function() {
            deleteTask(nw, task, storageKey);
        });

        nw.appendChild(taskText);
        nw.appendChild(actionBtn);
        nw.appendChild(delBtn);
        parent.appendChild(nw);
    };

    const moveToOngoing = (taskElement, task, storageKey) => {
        let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];
        let sdw = JSON.parse(localStorage.getItem("sdw")) || [];

        let index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(tasks));
        }
        taskElement.remove();

        sdw.push(task);
        localStorage.setItem("sdw", JSON.stringify(sdw));

        createTaskElement(task, losd, "Move to Completed", moveToCompleted, "sdw");
    };

    const moveToCompleted = (taskElement, task, storageKey) => {
        let sdw = JSON.parse(localStorage.getItem(storageKey)) || [];
        let cdw = JSON.parse(localStorage.getItem("cdw")) || [];

        let index = sdw.indexOf(task);
        if (index !== -1) {
            sdw.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(sdw));
        }
        taskElement.remove();

        cdw.push(task);
        localStorage.setItem("cdw", JSON.stringify(cdw));

        createTaskElement(task, lcd, "Completed", () => {}, "cdw");
    };

    const deleteTask = (taskElement, task, storageKey) => {
        let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];
        let index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(tasks));
        }
        taskElement.remove();
    };

    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addtask();
        }
    });
    input1.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sb();
        }
    });
    load_task();
    let cb = document.querySelector("#clear");
    cb.addEventListener("click", function() {
        localStorage.removeItem("tasks");
        localStorage.removeItem("sdw");
        localStorage.removeItem("cdw");
        document.querySelectorAll(".task").forEach(task => task.remove());
        input.value = "";
    });
});
