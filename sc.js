document.addEventListener("DOMContentLoaded", function() {
    let input = document.querySelector("#Add_task");
    let low = document.querySelector("#list-works");
    let input1 = document.querySelector("#Start_Doing_Work");
    let losd = document.querySelector("#ongoing-works");
    let input2 = document.querySelector("#Complete_Doing_Work");
    let lcd = document.querySelector("#completed-works");

    const load_task = () => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            let nw = document.createElement("div");
            nw.className = "task";
            nw.textContent = task;
            low.appendChild(nw);
        });
        let sdw = JSON.parse(localStorage.getItem("sdw")) || [];
        sdw.forEach(task => {
            let nw = document.createElement("div");
            nw.className = "task";
            nw.textContent = task;
            losd.appendChild(nw);
        });
        let cdw = JSON.parse(localStorage.getItem("cdw")) || [];
        cdw.forEach(task => {
            let nw = document.createElement("div");
            nw.className = "task";
            nw.textContent = task;
            lcd.appendChild(nw);
        });
    };
    const addtask = () => {
        let here = input.value.trim();
        if (!here) {
            return;
        }
        let nw = document.createElement("div");
        nw.className = "task";
        nw.textContent = here;
        low.appendChild(nw);
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(here);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        input.value = "";
    };
    const SDO = () => {
        let here = input1.value.trim();
        if (!here) {
            return;
        }
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let sdw = JSON.parse(localStorage.getItem("sdw")) || [];
        let index = tasks.indexOf(here);
        if (index != -1) {
            tasks.splice(index, 1);
        }
        document.querySelectorAll("#list-works .task").forEach(task => {
            if (task.textContent === here) {
                task.remove();
            }
        });
        let nw = document.createElement("div");
        nw.className = "task";
        nw.textContent = here;
        losd.appendChild(nw);
        sdw.push(here);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("sdw", JSON.stringify(sdw));
        input1.value = "";
    };
    const CDW = () => {
        let here = input2.value.trim();
        if (!here) {
            return;
        }
        let sdw = JSON.parse(localStorage.getItem("sdw")) || [];
        let cdw = JSON.parse(localStorage.getItem("cdw")) || [];
        let index = sdw.indexOf(here);
        if (index != -1) {
            sdw.splice(index, 1);
        }
        document.querySelectorAll("#ongoing-works .task").forEach(task => {
            if (task.textContent === here) {
                task.remove();
            }
        });
        let nw = document.createElement("div");
        nw.className = "task";
        nw.textContent = here;
        lcd.appendChild(nw);
        cdw.push(here);
        localStorage.setItem("sdw", JSON.stringify(sdw));
        localStorage.setItem("cdw", JSON.stringify(cdw));
        input2.value = "";
    };
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addtask();
        }
    });
    input1.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            SDO();
        }
    });
    input2.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            CDW();
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
        input1.value = "";
        input2.value = "";
    });
});