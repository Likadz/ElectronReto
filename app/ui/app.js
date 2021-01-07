const {ipcRenderer } = require("electron");

const formLogin = document.querySelector("#form");
const nick = document.querySelector("#nick");
const password = document.querySelector("#pwd");
/*
const rutaRegistro = document.querySelector("#rutaRegistro");
const formRegistro = document.querySelector("#formRegistro");
const nickRegistro = document.querySelector("#nickRegistro");
const passwordRegistro = document.querySelector("#pwdRegistro");
*/

//cuando envia los datos del form 
formLogin.addEventListener('submit', e => {
  e.preventDefault(); 
  const admin ={
    nombre:nick.value,
    pwd: password.value
  }
  //ipcRenderer.send('create-admin', admin)
  console.log("login pulsado");
  ipcRenderer.send('login', admin)//enviamos el admin con los datos al main
  //console.log(taskName.value , taskDescription.value);
  form.reset();
});
/*
rutaRegistro.addEventListener('click', function(){
  console.log("registro");
  ipcRenderer.send('registro','registro');
});
formRegistro.addEventListener('submit', e => {
  console.log("registrar");
  e.preventDefault(); 
  const admin ={
    nombre:nickRegistro.value,
    pwd: passwordRegistro.value
  }
  ipcRenderer.send('create-admin', admin)
  form.reset();
});
*/
//get todos los adimins
ipcRenderer.on('new-admin-created', (e, args)=>{
  alert(args);
})

//login error
ipcRenderer.on("login-error", (e,args)=>{
  document.getElementById("msg").innerHTML=args;
})

/*const taskList = document.querySelector("#taskList");

let updateStatus = false;
let idTaskToUpdate = "";

function deleteTask(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-task", id);
  }
  return;
}

function editTask(id) {
  updateStatus = true;
  idTaskToUpdate = id;
  const task = tasks.find(task => task._id === id);
  taskName.value = task.name;
  taskDescription.value = task.description;
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  console.log(tasks);
  tasks.map(t => {
    taskList.innerHTML += `
          <li class="card">
            <h4>
              Task id: ${t._id}
            </h4>
            <p>
              Task Name: ${t.name}
            </p>
            <p>
              Task Description: ${t.description}
            </p>
            <button class="btn btn-danger" onclick="deleteTask('${t._id}')">
              🗑 Delete
            </button>
            <button class="btn btn-secondary" onclick="editTask('${t._id}')">
              ✎ Edit
            </button>
          </li>
        `;
  });
}

let tasks = [];

ipcRenderer.send("get-tasks");

taskForm.addEventListener("submit", async e => {
  e.preventDefault();

  const task = {
    name: taskName.value,
    description: taskDescription.value
  };

  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-task", task);
  } else {
    ipcRenderer.send("update-task", { ...task, idTaskToUpdate });
  }

  taskForm.reset();
});

ipcRenderer.on("new-task-created", (e, arg) => {
  console.log(arg);
  const taskSaved = JSON.parse(arg);
  tasks.push(taskSaved);
  console.log(tasks);
  renderTasks(tasks);
  alert("Task Created Successfully");
  taskName.focus();
});

ipcRenderer.on("get-tasks", (e, args) => {
  const receivedTasks = JSON.parse(args);
  tasks = receivedTasks;
  renderTasks(tasks);
});
ipcRenderer.on("delete-task-success", (e, args) => {
  const deletedTask = JSON.parse(args);
  const newTasks = tasks.filter(t => {
    return t._id !== deletedTask._id;
  });
  tasks = newTasks;
  renderTasks(tasks);
});

ipcRenderer.on("update-task-success", (e, args) => {
  updateStatus = false;
  const updatedTask = JSON.parse(args);
  tasks = tasks.map((t, i) => {
    if (t._id === updatedTask._id) {
      t.name = updatedTask.name;
      t.description = updatedTask.description
    }
    return t;
  });
  renderTasks(tasks);
});*/
