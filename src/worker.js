const {ipcRenderer }= require('electron')

// main Script
ipcRenderer.on("printPDF", (event, content) => {
           
	console.log(content);
  
	document.body.innerHTML = content;

	ipcRenderer.send("readyToPrintPDF", content);
});