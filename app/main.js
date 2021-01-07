const { BrowserWindow, ipcMain, remote } = require("electron");
//const Task = require("./models/Task");
const Admin = require("./models/Admin");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  //pantalla completa
  //win.setFullScreen(true)

  win.loadFile("app/html/index.html");
}
/*
function createWindow2() {
  const win = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  win.loadFile("app/registro.html");
}

//window registro
ipcMain.on("registro", (e, arg)=>{
  BrowserWindow.getFocusedWindow().loadFile('app/registro.html')//cambiamos el html de la ventana.
})
*/


//crear un usuario administrador
ipcMain.on("create-admin", async (e, arg) => {
  //const todosAdmins = Admin.find();
  console.log(arg);
  const newAdmin = new Admin(arg);
  const adminSaved = await newAdmin.save();
  console.log(adminSaved);
  e.reply("new-admin-created", JSON.stringify(adminSaved));
});

//LOGIN
ipcMain.on("login", async (e, arg) => {
  const todosAdmins = await Admin.find();//find todos los admins
  console.log(todosAdmins);
  login = false;
  const admin = new Admin (arg);

  for (let index = 0; index < todosAdmins.length; index++) {
    const a=new Admin (todosAdmins[index])
    if(a.nombre==admin.nombre && a.pwd ==admin.pwd){
      login=true;
    }
 }
  
  if(login){
    console.log("al home");
    BrowserWindow.getFocusedWindow().loadFile('app/html/home.html')//cambiamos el html de la ventana.
    
    //createWindow2();
    //e.reply("login-home","home");
  }else{
    e.reply("login-error","EL USUARIO O CONTRASEÑA SON INCORRECTOS");
    console.log("EL USUARIO O CONTRASEÑA SON INCORRECTOS");
  }
  //e.reply("login", JSON.stringify(todosAdmins));
});

ipcMain.on('filtrar', (e,arg)=>{
  console.log(arg);
  e.reply("busqueda",arg);
})

/*
ipcMain.on("new-task", async (e, arg) => {
  const newTask = new Task(arg);
  const taskSaved = await newTask.save();
  console.log(taskSaved);
  e.reply("new-task-created", JSON.stringify(taskSaved));
});

ipcMain.on("get-tasks", async (e, arg) => {
  const tasks = await Task.find();
  e.reply("get-tasks", JSON.stringify(tasks));
});

ipcMain.on("delete-task", async (e, args) => {
  const taskDeleted = await Task.findByIdAndDelete(args);
  e.reply("delete-task-success", JSON.stringify(taskDeleted));
});

ipcMain.on("update-task", async (e, args) => {
  console.log(args);
  const updatedTask = await Task.findByIdAndUpdate(
    args.idTaskToUpdate,
    { name: args.name, description: args.description },
    { new: true }
  );
  e.reply("update-task-success", JSON.stringify(updatedTask));
});
*/
module.exports = { createWindow };
