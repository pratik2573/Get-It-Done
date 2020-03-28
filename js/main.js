const input = document.getElementById("task-input");
const totalTasks = document.getElementById("total");
const completedTasks = document.getElementById("completed");
const model = document.getElementById("model");
const maxRecentlyDeleted = 4;



loadData("totalTasks")||saveData("totalTasks",0);
loadData("completedTasks")||saveData("completedTasks",0);
loadData("toDoTheme")||saveData("toDoTheme","light");


totalTasks.innerHTML = loadData("totalTasks");
completedTasks.innerHTML = loadData("completedTasks");


function updateTasks() {
    console.log("Tasks Updated");
    readTasks(taskStore,function (tasks) {
        // console.log(tasks);
        let list = document.getElementById("task-list");
        let innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
                innerHTML += `
                    <li data-id='${tasks[i].id}' onclick='deleteTaskOnClick(this)'>
                        ${tasks[i].title}
                    </li>
                `;
        }
        list.innerHTML = innerHTML;
    })


readTasks(completedTaskStore,function (tasks) {
    // console.log(tasks);
    let list = document.getElementById("completed-task-list");
    let innerHTML = "";
    tasks.reverse();
    for (let i = 0; i < Math.min(tasks.length,maxRecentlyDeleted); i++) {
            innerHTML += `
                <li class='invert'>
                    ${tasks[i].title}: <span>${tasks[i].completedDate}</span>
                </li>
            `;
    }
    list.innerHTML = innerHTML;
})
}
function onLoad() {
    updateTasks();
    // deleteAllTasks(taskStore);
    // saveData("totalTasks",0)
}

function deleteTaskOnClick(elem) {
    let id = Number(elem.dataset.id);

    let task = readOneTask(taskStore,id, function (task) {
        
        let completedTask = new CompletedTask(task.title);
        addTask(completedTaskStore,completedTask, function () {
            elem.classList.add("exit");

            elem.addEventListener("animationend", function () {
                deleteTask(taskStore, id, function () {
                    let amountOfTasks = Number(loadData("totalTasks")) - 1;
                    saveData("totalTasks", amountOfTasks);
                    totalTasks.innerHTML = loadData("totalTasks");

                    let amountOfCompleted = Number(loadData("completedTasks"));
                    saveData("completedTasks",amountOfCompleted);
                    completedTasks.innerHTML = loadData("completedTasks");
                    updateTasks();
                })
            })
        })
    })
}

input.addEventListener("keydown", function (e) {
    if(e.keyCode===13){
        let task = new Tasks(input.value);
        input.value= "";
        if(task.title.length === 0) { return }
        addTask(taskStore,task,function () {
            let amountOfTasks = Number(loadData("totalTasks"))+ 1;
            saveData("totalTasks", amountOfTasks);
            totalTasks.innerHTML = loadData("totalTasks");
            updateTasks();
        })
    }
})






