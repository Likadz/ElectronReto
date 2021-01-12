const { BrowserWindow, ipcMain, remote } = require("electron");
const Ruta = require("./models/Ruta");
const Usuario = require("./models/Usuario");


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

//window registro
ipcMain.on("registro", (e, arg)=>{
  BrowserWindow.getFocusedWindow().loadFile('app/html/registro.html')//cambiamos el html de la ventana.
})

//cuando registra un usuario volvemos al login
ipcMain.on("volver-login", (e, arg)=>{
  BrowserWindow.getFocusedWindow().loadFile('app/html/index.html')//cambiamos el html de la ventana.
})

//crear un usuario usuarioistrador
ipcMain.on("create-usuario", async (e, arg) => {
  //const todosusuarios = usuario.find();
  console.log(arg);
  const newusuario = new Usuario(arg);
  const usuarioSaved = await newusuario.save();
  console.log(usuarioSaved);
  e.reply("new-usuario-created", JSON.stringify(usuarioSaved));
});

//LOGIN
ipcMain.on("login", async (e, arg) => {
  const usuario = new Usuario (arg);//usuario recibido por el form
  //Get data conexion con la bbdd
  const todosusuarios = await Usuario.find();//find todos los usuarios
  console.log("los usuarios DB:\n" + todosusuarios + " args " + arg);
  login = false;
  
  for (let index = 0; index < todosusuarios.length; index++) {
    const a=new Usuario (todosusuarios[index])
    if(a.nombre==usuario.nombre && a.contraseña ==usuario.contraseña && a.rol == usuario.rol && !a.conectado && a.conectado==usuario.conectado){
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
});

ipcMain.on("get-rutas", async (e, arg) => {
  const rutas = await Ruta.find();
  e.reply("get-rutas", JSON.stringify(rutas));
});

ipcMain.on("delete-ruta", async (e, args) => {
  const rutaDeleted = await Ruta.findByIdAndDelete(args);
  e.reply("delete-ruta-success", JSON.stringify(rutaDeleted));
});

ipcMain.on("buscar", async (e, arg) => {
  console.log("la ciudad " + arg);
  const todosruta = await Ruta.find({ciudad:arg});//buscamos los que coincidan con el filtro de la ciudad.
  console.log(todosruta);
  //mostramos solo los filtrados
  e.reply("busqueda-realizada", JSON.stringify(todosruta));
});

ipcMain.on("exit", async (e, arg) => {
  console.log("LOGOUT");

  BrowserWindow.getFocusedWindow().loadFile('app/html/index.html')//cambiamos el html de la ventana.
});

module.exports = { createWindow };
