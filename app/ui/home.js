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

//add ruta (ir al form)
document.querySelector("#btnAdd").addEventListener('click', e => {
    ipcRenderer.send('addRuta');
});

//edit ruta
document.querySelector(".edit").addEventListener('click', e => {
    const id = this.attr('id');
    console.log(id);
    ipcRenderer.send('editRuta',id);
});