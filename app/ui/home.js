const {ipcRenderer } = require("electron");

const seleccionado =  document.querySelector("#ciudad");
//home
document.querySelector("#formFiltros").addEventListener('submit', e => {
    const sel = seleccionado.value;
    ipcRenderer.send('filtrar', sel);
});

ipcRenderer.on('busqueda', (e,args)=>{
    console.log(args);
})